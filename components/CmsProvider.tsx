'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialCmsData, CmsDataSchema } from '@/lib/cms-store';

interface CmsContextProps {
  data: CmsDataSchema;
  isLoading: boolean;
  updateData: (newData: Partial<CmsDataSchema>) => Promise<boolean>;
  resetToDefault: () => Promise<boolean>;
}

const CmsContext = createContext<CmsContextProps | undefined>(undefined);

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<CmsDataSchema>(initialCmsData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Load from localStorage first to prevent hydration layout flashes
    const cached = localStorage.getItem('luma_cms_data');
    if (cached) {
      try {
        setData(JSON.parse(cached));
      } catch (e) {
        console.error(e);
      }
    }

    // 2. Fetch the actual server version
    async function loadFromServer() {
      try {
        const response = await fetch('/api/cms');
        if (response.ok) {
          const serverData = await response.json();
          setData(serverData);
          localStorage.setItem('luma_cms_data', JSON.stringify(serverData));
        }
      } catch (error) {
        console.error('Failed to load CMS data from server:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadFromServer();
  }, []);

  const updateData = async (newData: Partial<CmsDataSchema>) => {
    const updated = { ...data, ...newData };
    setData(updated);
    localStorage.setItem('luma_cms_data', JSON.stringify(updated));

    try {
      const response = await fetch('/api/cms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updated),
      });
      return response.ok;
    } catch (error) {
      console.error('Failed to save CMS data to server:', error);
      return false;
    }
  };

  const resetToDefault = async () => {
    setData(initialCmsData);
    localStorage.setItem('luma_cms_data', JSON.stringify(initialCmsData));
    try {
      const response = await fetch('/api/cms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(initialCmsData),
      });
      return response.ok;
    } catch (error) {
      console.error('Failed to reset CMS data on server:', error);
      return false;
    }
  };

  return (
    <CmsContext.Provider value={{ data, isLoading, updateData, resetToDefault }}>
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() {
  const context = useContext(CmsContext);
  if (context === undefined) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
}
