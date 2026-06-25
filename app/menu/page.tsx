'use client';

import { useState } from 'react';
import { menuCategories } from '@/lib/cms-data';
import { useCms } from '@/components/CmsProvider';
import FadeIn from '@/components/FadeIn';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';

export default function MenuPage() {
  const { data } = useCms();
  const { menuItemsList } = data;
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const activeItems = menuItemsList.filter(item => item.category === activeCategory);

  return (
    <div className="bg-[#151515] min-h-screen">
      {/* Hero Section with fading image */}
      <motion.div style={{ opacity }} className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1600" 
          alt="Menu Hero" 
          fill 
          className="object-cover opacity-60" 
          referrerPolicy="no-referrer" 
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <h1 className="relative z-10 font-serif text-[60px] md:text-[100px] text-white">Naše Menu</h1>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
          <div className="lg:col-span-4 sticky top-48 self-start space-y-12">
            {menuCategories.map((cat, idx) => {
              const isActive = cat.id === activeCategory;
              return (
                <FadeIn delay={idx * 0.1} key={cat.id} className="flex items-center gap-4 group cursor-pointer" onClick={() => setActiveCategory(cat.id)}>
                  {isActive && <div className="w-12 h-[1px] bg-white hidden lg:block"></div>}
                  <h2 className={`font-serif text-[44px] md:text-[56px] transition-colors ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/80'}`}>{cat.name}</h2>
                  <span className="font-sans text-white/50 text-xl tracking-wider mb-8">{cat.num}</span>
                </FadeIn>
              );
            })}
          </div>

          <div className="lg:col-span-8 space-y-2 mt-12 lg:mt-0">
            <div className="w-full h-[1px] bg-white/20 mb-12 hidden lg:block"></div>
            {activeItems.map((item, idx) => (
              <FadeIn delay={idx * 0.05} key={item.id} className="group cursor-pointer">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-8 border-b border-white/10 gap-4">
                  <h3 className="font-serif text-[32px] text-white group-hover:opacity-80 transition-opacity">{item.name}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12 font-sans text-right">
                    <span className="text-sm text-white/50 uppercase tracking-[0.2em]">{item.description}</span>
                    <span className="text-[28px] text-white font-serif">{item.price}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
