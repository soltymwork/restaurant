'use client';
import HomeHero from '@/components/HomeHero';
import { useCms } from '@/components/CmsProvider';
import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from '@/components/StarIcon';
import FadeIn from '@/components/FadeIn';

export default function Home() {
  const { data } = useCms();
  const { aboutData, homeHero } = data;

  return (
    <div className="flex flex-col w-full overflow-hidden bg-[#151515]">
      <HomeHero />

      {/* About & Chef Timeline */}
      <section className="relative w-full max-w-[1400px] mx-auto px-6 py-32">
        {/* Vertical line - centered */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2 hidden md:block"></div>
        
        {/* Item 1: About */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-16 w-full items-center mb-32 md:mb-48">
          {/* Left Column: Image with Discover More */}
          <FadeIn className="relative w-full md:pr-16 flex justify-end">
            <div className="relative w-full max-w-[500px] aspect-[4/5]">
              <Image src={aboutData.images.interior1} alt="Interior" fill className="object-cover" referrerPolicy="no-referrer" />
              <Link href={aboutData.discoverLink} className="absolute -bottom-8 -right-8 md:-bottom-12 md:-right-12 w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#1c1c1c] border border-white/10 flex items-center justify-center hover:bg-[#2a2a2a] transition-colors z-20 shadow-2xl">
                <span className="text-white text-[11px] md:text-xs tracking-[0.2em] font-sans text-center leading-loose font-semibold uppercase">OBJAVTE<br/>VIAC</span>
              </Link>
            </div>
          </FadeIn>
          
          {/* Star Icon in Middle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-[#151515] py-8 hidden md:block">
            <StarIcon className="w-5 h-5 text-white/80" />
          </div>

          {/* Right Column: Text */}
          <FadeIn delay={0.2} className="flex flex-col justify-center md:pl-16">
            <h2 className="font-serif text-[44px] md:text-[56px] text-white leading-tight mb-8">{aboutData.heading}</h2>
            <p className="text-white/60 text-[16px] leading-[1.8] font-sans">
              {aboutData.description}
            </p>
          </FadeIn>
        </div>

        {/* Item 2: Chef */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-16 w-full items-center mb-16">
          {/* Left Column: Text */}
          <FadeIn className="flex flex-col justify-center md:pr-16 order-2 md:order-1 text-right items-end">
            <h2 className="font-serif text-[44px] md:text-[56px] text-white leading-tight mb-8">{aboutData.chefHeading}</h2>
            <p className="text-white/60 text-[16px] leading-[1.8] font-sans mb-6 text-left">
              {aboutData.chefDesc1}
            </p>
            <p className="text-white/60 text-[16px] leading-[1.8] font-sans mb-12 text-left">
              {aboutData.chefDesc2}
            </p>
            <div className="font-serif text-4xl md:text-5xl text-white/80 signature italic pr-4">{aboutData.chefName}</div>
          </FadeIn>

          {/* Star Icon in Middle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-[#151515] py-8 hidden md:block">
            <StarIcon className="w-5 h-5 text-white/80" />
          </div>

          {/* Right Column: Images */}
          <FadeIn delay={0.2} className="relative w-full md:pl-16 flex justify-start order-1 md:order-2">
             <div className="relative w-full max-w-[500px] aspect-[4/5] rounded-t-full overflow-hidden">
              <Image src={aboutData.images.chefMain} alt="Chef" fill className="object-cover" referrerPolicy="no-referrer" />
              <div className="absolute bottom-8 -left-12 w-[200px] md:w-[280px] aspect-[4/3] z-20 hidden md:block shadow-2xl">
                <Image src={aboutData.images.chefOverlay} alt="Food prep" fill className="object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Circular Menu Section */}
      <section className="relative w-full py-40 flex items-center justify-center overflow-hidden">
        <Link href="/menu" className="relative w-[350px] h-[350px] md:w-[500px] md:h-[500px] flex items-center justify-center group">
          {/* Rotating Text Ring */}
          <div className="absolute inset-0 z-10 animate-spin pointer-events-none" style={{ animationDuration: '20s' }}>
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              <path id="menuCircleTextPath" d="M 50, 50 m -48, 0 a 48,48 0 1,1 96,0 a 48,48 0 1,1 -96,0" fill="transparent" />
              <text className="text-[7.5px] tracking-[0.3em] font-serif fill-white/80 uppercase">
                <textPath href="#menuCircleTextPath" startOffset="0%">
                  • OCHUTNAJTE NAŠE MENU • OCHUTNAJTE NAŠE MENU • OCHUTNAJTE NAŠE MENU •
                </textPath>
              </text>
            </svg>
          </div>
          {/* Inner Image */}
          <div className="absolute inset-8 rounded-full overflow-hidden z-20">
            <div className="absolute inset-0 bg-black/40 z-10 transition-colors group-hover:bg-black/20"></div>
            <Image src={homeHero.images[0]} alt="Our Menu" fill className="object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
          </div>
          {/* Center Text */}
          <div className="relative z-30 font-serif text-[44px] md:text-[56px] text-white">Naše Menu</div>
        </Link>
      </section>
      
      {/* Photo Gallery banner */}
      <section className="w-full flex h-28 sm:h-36 md:h-48 xl:h-56">
        {(homeHero.images && homeHero.images.length >= 6 ? homeHero.images.slice(0, 6) : [
          "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=600",
          "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=600",
          "https://images.unsplash.com/photo-1481070555726-e2fe8357725c?auto=format&fit=crop&q=80&w=600",
          "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600",
          "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=600",
          "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=600"
        ]).map((src, idx) => (
          <div key={idx} className="relative flex-1 h-full cursor-pointer overflow-hidden group">
            <Image src={src} alt="Gallery image" fill className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" referrerPolicy="no-referrer" />
          </div>
        ))}
      </section>
    </div>
  );
}
