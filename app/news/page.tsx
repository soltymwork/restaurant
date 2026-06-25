'use client';
import { useCms } from '@/components/CmsProvider';
import Image from 'next/image';
import { StarIcon } from '@/components/StarIcon';
import FadeIn from '@/components/FadeIn';

export default function NewsPage() {
  const { data } = useCms();
  const { newsData } = data;

  return (
    <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col items-center min-h-screen">
      <FadeIn className="text-center mb-24">
        <h1 className="font-serif text-5xl md:text-6xl text-white">
          {newsData.heading1} <span className="italic">{newsData.heading2}</span>
        </h1>
      </FadeIn>

      <div className="relative w-full max-w-[1400px] flex">
        <div className="absolute left-1/4 md:left-[30%] top-0 bottom-0 w-[1px] bg-white/20 hidden md:block"></div>
        
        <div className="w-full flex flex-col gap-32">
          {newsData.timeline.map((yearGroup, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full relative">
              {/* Year Column */}
              <FadeIn className="md:col-span-4 lg:col-span-4 flex md:justify-end items-start md:pr-16 relative">
                <div className={`font-serif text-6xl md:text-[80px] text-white/60 sticky top-32 ${idx > 0 ? 'opacity-50' : ''}`}>{yearGroup.year}</div>
                <div className="absolute right-[-14px] top-6 z-10 bg-[#151515] py-4 hidden md:block">
                  <StarIcon className={`w-6 h-6 text-white/60 ${idx > 0 ? 'opacity-50' : ''}`} />
                </div>
              </FadeIn>

              {/* News List Column */}
              <div className="md:col-span-8 lg:col-span-8 flex flex-col gap-24 md:pl-16 mt-12 md:mt-0">
                {yearGroup.items.map((item, itemIdx) => (
                  <FadeIn delay={itemIdx * 0.15} key={itemIdx} className="flex flex-col xl:flex-row w-full group cursor-pointer gap-8 xl:gap-12">
                    <div className="w-full xl:w-1/2 relative aspect-square overflow-hidden bg-[#1c1c1c]">
                      <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                    </div>
                    <div className="w-full xl:w-1/2 flex flex-col justify-center">
                      <div className="text-white/70 text-sm font-sans mb-4">{item.date}</div>
                      <h3 className="font-serif text-[32px] leading-tight text-white mb-6">{item.title}</h3>
                      <p className="text-white/60 text-[15px] leading-relaxed font-sans">{item.excerpt}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
