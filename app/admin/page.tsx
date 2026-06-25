'use client';

import React, { useState } from 'react';
import { useCms } from '@/components/CmsProvider';
import { menuCategories } from '@/lib/cms-data';
import Link from 'next/link';

export default function AdminPage() {
  const { data, updateData, resetToDefault } = useCms();
  
  // Login State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // CMS Editor State
  const [activeTab, setActiveTab] = useState<'info' | 'hero' | 'about' | 'menu' | 'news'>('info');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Draft Data State
  const [restaurantInfo, setRestaurantInfo] = useState(data.restaurantInfo);
  const [homeHero, setHomeHero] = useState(data.homeHero);
  const [aboutData, setAboutData] = useState(data.aboutData);
  const [menuItemsList, setMenuItemsList] = useState(data.menuItemsList);
  const [newsData, setNewsData] = useState(data.newsData);

  // Track state sync with provider data
  React.useEffect(() => {
    if (data) {
      setRestaurantInfo(data.restaurantInfo);
      setHomeHero(data.homeHero);
      setAboutData(data.aboutData);
      setMenuItemsList(data.menuItemsList);
      setNewsData(data.newsData);
    }
  }, [data]);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.toLowerCase() === 'admin' && password === 'luma123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Nesprávne meno alebo heslo. Skúste admin / luma123');
    }
  };

  // Handle Save
  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    
    const success = await updateData({
      restaurantInfo,
      homeHero,
      aboutData,
      menuItemsList,
      newsData
    });

    setIsSaving(false);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } else {
      alert('Chyba pri ukladaní na server. Zmeny boli uložené lokálne.');
    }
  };

  // Handle Reset
  const handleReset = async () => {
    if (confirm('Naozaj chcete resetovať všetok obsah na pôvodné hodnoty?')) {
      const success = await resetToDefault();
      if (success) {
        alert('Obsah bol úspešne resetovaný.');
      }
    }
  };

  // Menu editing helpers
  const handleEditMenuItem = (id: number, field: string, value: string) => {
    setMenuItemsList(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const handleAddMenuItem = (category: string) => {
    const newId = menuItemsList.length > 0 ? Math.max(...menuItemsList.map(i => i.id)) + 1 : 1;
    const newItem = {
      id: newId,
      category,
      name: 'Nové jedlo',
      price: '15€',
      description: 'Zloženie / Detaily'
    };
    setMenuItemsList(prev => [...prev, newItem]);
  };

  const handleDeleteMenuItem = (id: number) => {
    setMenuItemsList(prev => prev.filter(item => item.id !== id));
  };

  // News editing helpers
  const handleEditNewsItem = (yearIdx: number, itemIdx: number, field: string, value: string) => {
    setNewsData(prev => {
      const updatedTimeline = [...prev.timeline];
      const updatedItems = [...updatedTimeline[yearIdx].items];
      updatedItems[itemIdx] = { ...updatedItems[itemIdx], [field]: value };
      updatedTimeline[yearIdx] = { ...updatedTimeline[yearIdx], items: updatedItems };
      return { ...prev, timeline: updatedTimeline };
    });
  };

  const handleEditNewsHeading = (field: 'heading1' | 'heading2', value: string) => {
    setNewsData(prev => ({ ...prev, [field]: value }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#151515] px-6 py-12">
        <div className="w-full max-w-md bg-[#1c1c1c] border border-white/10 p-8 md:p-10 rounded-lg shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl text-white mb-2">Luma CMS Admin</h1>
            <p className="text-white/60 text-sm">Zadajte prístupové údaje pre úpravu obsahu</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2 font-sans">Prihlasovacie meno</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Napr. admin"
                className="w-full bg-[#252525] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors text-sm font-sans"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2 font-sans">Heslo</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Napr. luma123"
                className="w-full bg-[#252525] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors text-sm font-sans"
                required
              />
            </div>

            {loginError && (
              <div className="text-red-400 text-xs font-sans mt-2 bg-red-950/30 p-3 border border-red-900/30">
                {loginError}
              </div>
            )}

            <button 
              type="submit" 
              className="w-full py-4 bg-white text-black font-sans font-semibold text-xs uppercase tracking-[0.2em] hover:bg-neutral-200 transition-colors"
            >
              Prihlásiť sa
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-white/40 font-mono">
            Demo údaje: admin / luma123
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#151515] text-white">
      {/* Top Banner Control */}
      <div className="bg-[#1c1c1c] border-b border-white/10 px-6 py-4 sticky top-24 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl text-white">Luma CMS Administrácia</h1>
            <p className="text-xs text-white/50 mt-1">Upravujte texty, obrázky, jedálny lístok a novinky v reálnom čase</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleReset}
              className="px-4 py-2 border border-white/10 text-white/60 hover:text-white hover:border-white/30 text-xs font-sans font-semibold uppercase tracking-wider transition-all"
            >
              Resetovať
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2.5 bg-white text-black font-semibold text-xs font-sans uppercase tracking-[0.15em] hover:bg-neutral-200 transition-all flex items-center gap-2"
            >
              {isSaving ? 'Ukladá sa...' : 'Uložiť Zmeny'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {saveSuccess && (
          <div className="mb-8 p-4 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 rounded text-sm font-sans flex items-center justify-between">
            <span>✓ Zmeny boli úspešne uložené na server a sú viditeľné pre všetkých návštevníkov!</span>
            <Link href="/" className="underline text-xs tracking-wider uppercase font-semibold">Zobraziť web</Link>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Navigation Sidebar Tabs */}
          <div className="lg:col-span-3 space-y-2">
            {[
              { id: 'info', label: 'Základné Info' },
              { id: 'hero', label: 'Hlavný Banner (Hero)' },
              { id: 'about', label: 'O nás & Šéfkuchár' },
              { id: 'menu', label: 'Jedálny Lístok' },
              { id: 'news', label: 'Timeline Noviniek' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left px-5 py-4 font-sans text-sm font-semibold uppercase tracking-wider transition-all border-l-2 ${
                  activeTab === tab.id 
                    ? 'bg-[#1c1c1c] border-white text-white font-bold' 
                    : 'border-transparent text-white/50 hover:text-white/80 hover:bg-[#1c1c1c]/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
            <div className="pt-6">
              <Link href="/" className="block text-center py-3 border border-white/10 text-white/60 hover:text-white text-xs font-sans font-semibold uppercase tracking-wider transition-colors">
                ← Prejsť na Webstránku
              </Link>
            </div>
          </div>

          {/* Editor Form Panel */}
          <div className="lg:col-span-9 bg-[#1c1c1c] border border-white/10 p-6 md:p-8 rounded-lg space-y-8">
            
            {/* TAB: GENERAL INFO */}
            {activeTab === 'info' && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl border-b border-white/10 pb-4">Základné Informácie o Reštaurácii</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Krátky Názov (Logo)</label>
                    <input 
                      type="text" 
                      value={restaurantInfo.name} 
                      onChange={(e) => setRestaurantInfo({ ...restaurantInfo, name: e.target.value })}
                      className="w-full bg-[#252525] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors text-sm font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Celý Názov</label>
                    <input 
                      type="text" 
                      value={restaurantInfo.fullName} 
                      onChange={(e) => setRestaurantInfo({ ...restaurantInfo, fullName: e.target.value })}
                      className="w-full bg-[#252525] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors text-sm font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Kontaktný Email</label>
                    <input 
                      type="email" 
                      value={restaurantInfo.email} 
                      onChange={(e) => setRestaurantInfo({ ...restaurantInfo, email: e.target.value })}
                      className="w-full bg-[#252525] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors text-sm font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Kontaktný Telefón</label>
                    <input 
                      type="text" 
                      value={restaurantInfo.phone} 
                      onChange={(e) => setRestaurantInfo({ ...restaurantInfo, phone: e.target.value })}
                      className="w-full bg-[#252525] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors text-sm font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Adresa</label>
                  <textarea 
                    rows={3}
                    value={restaurantInfo.address} 
                    onChange={(e) => setRestaurantInfo({ ...restaurantInfo, address: e.target.value })}
                    className="w-full bg-[#252525] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors text-sm font-sans"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white/80 mt-6 mb-4">Otváracie Hodiny</h3>
                  <div className="space-y-4">
                    {restaurantInfo.hours.map((hour, idx) => (
                      <div key={idx} className="grid grid-cols-2 gap-4">
                        <input 
                          type="text"
                          value={hour.days}
                          onChange={(e) => {
                            const newHours = [...restaurantInfo.hours];
                            newHours[idx] = { ...newHours[idx], days: e.target.value };
                            setRestaurantInfo({ ...restaurantInfo, hours: newHours });
                          }}
                          className="bg-[#252525] border border-white/10 px-4 py-2 text-white focus:outline-none focus:border-white/40 transition-colors text-sm font-sans"
                          placeholder="Dni"
                        />
                        <input 
                          type="text"
                          value={hour.time}
                          onChange={(e) => {
                            const newHours = [...restaurantInfo.hours];
                            newHours[idx] = { ...newHours[idx], time: e.target.value };
                            setRestaurantInfo({ ...restaurantInfo, hours: newHours });
                          }}
                          className="bg-[#252525] border border-white/10 px-4 py-2 text-white focus:outline-none focus:border-white/40 transition-colors text-sm font-sans"
                          placeholder="Čas"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: HERO SECTION */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl border-b border-white/10 pb-4">Hlavný Banner (Home Hero)</h2>
                
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Úvodný Riadok Nadpisu</label>
                  <input 
                    type="text" 
                    value={homeHero.title1} 
                    onChange={(e) => setHomeHero({ ...homeHero, title1: e.target.value })}
                    className="w-full bg-[#252525] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors text-sm font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Hlavné Slovo (Zvýraznené kurzívou)</label>
                    <input 
                      type="text" 
                      value={homeHero.title2} 
                      onChange={(e) => setHomeHero({ ...homeHero, title2: e.target.value })}
                      className="w-full bg-[#252525] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors text-sm font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Zvyšok Nadpisu</label>
                    <input 
                      type="text" 
                      value={homeHero.title3} 
                      onChange={(e) => setHomeHero({ ...homeHero, title3: e.target.value })}
                      className="w-full bg-[#252525] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors text-sm font-sans"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white/80 mt-6 mb-4">Galéria a Parallax Obrázky na Pozadí (Adresy fotiek)</h3>
                  <div className="space-y-4">
                    {homeHero.images.map((img, idx) => (
                      <div key={idx} className="flex gap-4 items-center">
                        <span className="text-xs font-mono text-white/40 w-6">#{idx+1}</span>
                        <input 
                          type="text"
                          value={img}
                          onChange={(e) => {
                            const newImgs = [...homeHero.images];
                            newImgs[idx] = e.target.value;
                            setHomeHero({ ...homeHero, images: newImgs });
                          }}
                          className="flex-1 bg-[#252525] border border-white/10 px-4 py-2.5 text-white focus:outline-none focus:border-white/40 transition-colors text-sm font-sans"
                          placeholder="Unsplash URL adresa fotky"
                        />
                        <div className="relative w-10 h-10 border border-white/10 overflow-hidden bg-neutral-900 flex-shrink-0">
                          {img && <img src={img} alt="" className="object-cover w-full h-full" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: ABOUT US */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl border-b border-white/10 pb-4">Sekcia O Nás & Šéfkuchár</h2>
                
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Hlavný Nadpis O Nás</label>
                  <input 
                    type="text" 
                    value={aboutData.heading} 
                    onChange={(e) => setAboutData({ ...aboutData, heading: e.target.value })}
                    className="w-full bg-[#252525] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors text-sm font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Podrobný Popis O Nás</label>
                  <textarea 
                    rows={5}
                    value={aboutData.description} 
                    onChange={(e) => setAboutData({ ...aboutData, description: e.target.value })}
                    className="w-full bg-[#252525] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors text-sm font-sans text-left"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Nadpis Šéfkuchára</label>
                    <input 
                      type="text" 
                      value={aboutData.chefHeading} 
                      onChange={(e) => setAboutData({ ...aboutData, chefHeading: e.target.value })}
                      className="w-full bg-[#252525] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors text-sm font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Meno Šéfkuchára (Podpis)</label>
                    <input 
                      type="text" 
                      value={aboutData.chefName} 
                      onChange={(e) => setAboutData({ ...aboutData, chefName: e.target.value })}
                      className="w-full bg-[#252525] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors text-sm font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Popis Šéfkuchára - Riadok 1</label>
                  <textarea 
                    rows={3}
                    value={aboutData.chefDesc1} 
                    onChange={(e) => setAboutData({ ...aboutData, chefDesc1: e.target.value })}
                    className="w-full bg-[#252525] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors text-sm font-sans text-left"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Popis Šéfkuchára - Riadok 2</label>
                  <textarea 
                    rows={3}
                    value={aboutData.chefDesc2} 
                    onChange={(e) => setAboutData({ ...aboutData, chefDesc2: e.target.value })}
                    className="w-full bg-[#252525] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors text-sm font-sans text-left"
                  />
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white/80">Obrázky Sekcie O nás</h3>
                  
                  <div>
                    <label className="block text-xs text-white/40 mb-1">Foto Interiéru</label>
                    <input 
                      type="text"
                      value={aboutData.images.interior1}
                      onChange={(e) => setAboutData({ 
                        ...aboutData, 
                        images: { ...aboutData.images, interior1: e.target.value } 
                      })}
                      className="w-full bg-[#252525] border border-white/10 px-4 py-2.5 text-white text-sm font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/40 mb-1">Foto Šéfkuchára (Hlavná)</label>
                    <input 
                      type="text"
                      value={aboutData.images.chefMain}
                      onChange={(e) => setAboutData({ 
                        ...aboutData, 
                        images: { ...aboutData.images, chefMain: e.target.value } 
                      })}
                      className="w-full bg-[#252525] border border-white/10 px-4 py-2.5 text-white text-sm font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/40 mb-1">Doplnková Prekrývacia Foto</label>
                    <input 
                      type="text"
                      value={aboutData.images.chefOverlay}
                      onChange={(e) => setAboutData({ 
                        ...aboutData, 
                        images: { ...aboutData.images, chefOverlay: e.target.value } 
                      })}
                      className="w-full bg-[#252525] border border-white/10 px-4 py-2.5 text-white text-sm font-sans"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: MENU EDITING */}
            {activeTab === 'menu' && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl border-b border-white/10 pb-4">Úprava Ponuky Jedál</h2>
                
                {menuCategories.map((category) => {
                  const items = menuItemsList.filter(item => item.category === category.id);
                  return (
                    <div key={category.id} className="border border-white/5 bg-[#202020]/40 p-4 md:p-6 rounded space-y-4">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <h3 className="font-serif text-xl">{category.name}</h3>
                        <button
                          onClick={() => handleAddMenuItem(category.id)}
                          className="px-3 py-1.5 border border-white/20 hover:border-white text-[10px] font-semibold uppercase tracking-wider font-sans transition-colors"
                        >
                          + Pridať jedlo
                        </button>
                      </div>

                      <div className="space-y-4">
                        {items.length === 0 ? (
                          <div className="text-white/40 text-xs py-4 text-center">V tejto kategórii zatiaľ nie sú žiadne jedlá.</div>
                        ) : (
                          items.map((item) => (
                            <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-[#282828] p-4 rounded relative border border-transparent hover:border-white/10 transition-all">
                              <div className="md:col-span-6">
                                <input 
                                  type="text"
                                  value={item.name}
                                  onChange={(e) => handleEditMenuItem(item.id, 'name', e.target.value)}
                                  className="w-full bg-[#1c1c1c] border border-white/10 px-3 py-2 text-white text-sm font-sans rounded"
                                  placeholder="Názov jedla"
                                />
                              </div>
                              <div className="md:col-span-2">
                                <input 
                                  type="text"
                                  value={item.price}
                                  onChange={(e) => handleEditMenuItem(item.id, 'price', e.target.value)}
                                  className="w-full bg-[#1c1c1c] border border-white/10 px-3 py-2 text-white text-sm font-sans text-center rounded font-semibold"
                                  placeholder="Cena"
                                />
                              </div>
                              <div className="md:col-span-3">
                                <input 
                                  type="text"
                                  value={item.description}
                                  onChange={(e) => handleEditMenuItem(item.id, 'description', e.target.value)}
                                  className="w-full bg-[#1c1c1c] border border-white/10 px-3 py-2 text-white text-xs font-sans rounded"
                                  placeholder="Zloženie"
                                />
                              </div>
                              <div className="md:col-span-1 flex justify-center">
                                <button
                                  onClick={() => handleDeleteMenuItem(item.id)}
                                  className="text-red-400 hover:text-red-300 hover:bg-red-950/20 p-2 rounded transition-colors text-xs font-semibold"
                                  title="Vymazať jedlo"
                                >
                                  Odstrániť
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* TAB: NEWS */}
            {activeTab === 'news' && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl border-b border-white/10 pb-4"> Timeline Noviniek a Aktualít</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Úvod Nadpisu</label>
                    <input 
                      type="text" 
                      value={newsData.heading1} 
                      onChange={(e) => handleEditNewsHeading('heading1', e.target.value)}
                      className="w-full bg-[#252525] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors text-sm font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Záver Nadpisu (Zvýraznené kurzívou)</label>
                    <input 
                      type="text" 
                      value={newsData.heading2} 
                      onChange={(e) => handleEditNewsHeading('heading2', e.target.value)}
                      className="w-full bg-[#252525] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors text-sm font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-8 pt-6 border-t border-white/10">
                  {newsData.timeline.map((group, yearIdx) => (
                    <div key={yearIdx} className="space-y-6">
                      <div className="flex items-center gap-4">
                        <span className="font-serif text-3xl">{group.year}</span>
                        <div className="h-[1px] bg-white/10 flex-1"></div>
                      </div>

                      <div className="space-y-6">
                        {group.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="bg-[#202020] border border-white/5 p-6 rounded-lg space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs text-white/40 mb-1">Dátum</label>
                                <input 
                                  type="text"
                                  value={item.date}
                                  onChange={(e) => handleEditNewsItem(yearIdx, itemIdx, 'date', e.target.value)}
                                  className="w-full bg-[#1c1c1c] border border-white/10 px-3 py-2 text-white text-sm font-sans"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-white/40 mb-1">Adresa obrázku (Foto novinky)</label>
                                <input 
                                  type="text"
                                  value={item.image}
                                  onChange={(e) => handleEditNewsItem(yearIdx, itemIdx, 'image', e.target.value)}
                                  className="w-full bg-[#1c1c1c] border border-white/10 px-3 py-2 text-white text-sm font-sans"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs text-white/40 mb-1">Názov novinky</label>
                              <input 
                                type="text"
                                value={item.title}
                                onChange={(e) => handleEditNewsItem(yearIdx, itemIdx, 'title', e.target.value)}
                                className="w-full bg-[#1c1c1c] border border-white/10 px-3 py-2 text-white text-sm font-sans"
                              />
                            </div>

                            <div>
                              <label className="block text-xs text-white/40 mb-1">Krátky popis</label>
                              <textarea 
                                rows={2}
                                value={item.excerpt}
                                onChange={(e) => handleEditNewsItem(yearIdx, itemIdx, 'excerpt', e.target.value)}
                                className="w-full bg-[#1c1c1c] border border-white/10 px-3 py-2 text-white text-sm font-sans text-left"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
