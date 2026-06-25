'use client';

import { aboutData } from '@/lib/cms-data';
import Image from 'next/image';
import { StarIcon } from '@/components/StarIcon';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import FadeIn from '@/components/FadeIn';

export default function AboutPage() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div className="flex flex-col w-full overflow-hidden min-h-screen bg-[#151515]">
      {/* Hero Section with fading image */}
      <motion.div style={{ opacity }} className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <Image 
          src={aboutData.images.interior1} 
          alt="About Hero" 
          fill 
          className="object-cover opacity-60" 
          referrerPolicy="no-referrer" 
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <h1 className="relative z-10 font-serif text-[60px] md:text-[100px] text-white">O Nás</h1>
      </motion.div>

      <section className="relative w-full max-w-7xl mx-auto px-6 py-32 flex flex-col items-center">
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-border -translate-x-1/2 hidden md:block"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-[#151515] p-2 hidden md:block">
          <StarIcon className="w-6 h-6 text-white" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 w-full relative z-10">
          <div className="relative h-[400px] md:h-[600px] w-full">
            <Image src={aboutData.images.interior1} alt="Interior" fill className="object-cover" referrerPolicy="no-referrer" />
          </div>
          
          <div className="flex flex-col justify-center pl-0 md:pl-12">
            <h2 className="font-serif text-5xl md:text-6xl text-white mb-8">{aboutData.heading}</h2>
            <p className="text-[#a3a3a3] text-lg leading-relaxed font-sans">
              {aboutData.description}
            </p>
          </div>
        </div>
      </section>

      <section className="relative w-full max-w-7xl mx-auto px-6 py-32 flex flex-col items-center">
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-border -translate-x-1/2 hidden md:block"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-[#151515] p-2 hidden md:block">
          <StarIcon className="w-6 h-6 text-white" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 w-full relative z-10">
          <div className="flex flex-col justify-center pr-0 md:pr-12 order-2 md:order-1">
            <h2 className="font-serif text-5xl md:text-6xl text-white mb-8">{aboutData.chefHeading}</h2>
            <p className="text-[#a3a3a3] text-lg leading-relaxed font-sans mb-6">
              {aboutData.chefDesc1}
            </p>
            <p className="text-[#a3a3a3] text-lg leading-relaxed font-sans mb-12">
              {aboutData.chefDesc2}
            </p>
            <div className="font-serif italic text-4xl text-white/80 signature">{aboutData.chefName}</div>
          </div>

          <div className="relative h-[500px] md:h-[700px] w-full rounded-t-full overflow-hidden mt-12 md:mt-0 order-1 md:order-2">
            <Image src={aboutData.images.chefMain} alt="Chef" fill className="object-cover" referrerPolicy="no-referrer" />
            <div className="absolute -bottom-10 -left-10 w-48 h-32 md:w-64 md:h-48 z-20 hidden md:block">
              <Image src={aboutData.images.chefOverlay} alt="Food prep" fill className="object-cover border-[8px] border-[#151515]" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
