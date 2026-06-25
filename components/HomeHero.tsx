'use client';
import { motion, useScroll, useTransform } from 'motion/react';
import { useCms } from '@/components/CmsProvider';
import Image from 'next/image';
import FadeIn from './FadeIn';

export default function HomeHero() {
  const { data } = useCms();
  const { homeHero } = data;
  const { scrollY } = useScroll();

  // Distinct parallax speeds for each scattered image to create a rich 3D layout feel
  const yTopLeft = useTransform(scrollY, [0, 1000], [0, -120]);
  const yMidLeft = useTransform(scrollY, [0, 1000], [0, 40]);
  const yBotLeft = useTransform(scrollY, [0, 1000], [0, -90]);

  const yTopRight = useTransform(scrollY, [0, 1000], [0, -70]);
  const yMidRight = useTransform(scrollY, [0, 1000], [0, 110]);
  const yBotRight = useTransform(scrollY, [0, 1000], [0, -130]);

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col items-center pt-4 md:pt-6 pb-24 bg-[#151515]">
      {/* ================= LEFT SIDE SCATTERED IMAGES ================= */}
      {/* 1. Top-Left (Plate with food and sauce) */}
      <motion.div 
        style={{ y: yTopLeft }} 
        className="absolute left-[3%] xl:left-[5%] top-[12%] xl:top-[15%] hidden lg:block z-20 w-36 xl:w-48 aspect-square border border-white/10 p-2 bg-[#1c1c1c] shadow-2xl transition-all duration-300 hover:border-white/30"
      >
        <div className="relative w-full h-full">
          <Image 
            src={homeHero.images[0]} 
            alt="Gourmet Dish" 
            fill 
            className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" 
            referrerPolicy="no-referrer" 
          />
        </div>
      </motion.div>

      {/* 2. Middle-Left (Tuna with chopsticks - Closer to center) */}
      <motion.div 
        style={{ y: yMidLeft }} 
        className="absolute left-[13%] xl:left-[15%] top-[30%] xl:top-[33%] hidden lg:block z-20 w-36 xl:w-48 aspect-square border border-white/10 p-2 bg-[#1c1c1c] shadow-2xl transition-all duration-300 hover:border-white/30"
      >
        <div className="relative w-full h-full">
          <Image 
            src={homeHero.images[1]} 
            alt="Tuna Dish" 
            fill 
            className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" 
            referrerPolicy="no-referrer" 
          />
        </div>
      </motion.div>

      {/* 3. Bottom-Left (Purple ice popsicles) */}
      <motion.div 
        style={{ y: yBotLeft }} 
        className="absolute left-[4%] xl:left-[6%] top-[55%] xl:top-[58%] hidden lg:block z-20 w-36 xl:w-48 aspect-square border border-white/10 p-2 bg-[#1c1c1c] shadow-2xl transition-all duration-300 hover:border-white/30"
      >
        <div className="relative w-full h-full">
          <Image 
            src={homeHero.images[2]} 
            alt="Dessert" 
            fill 
            className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" 
            referrerPolicy="no-referrer" 
          />
        </div>
      </motion.div>


      {/* ================= RIGHT SIDE SCATTERED IMAGES ================= */}
      {/* 4. Top-Right (Cocktail glass in wooden box) */}
      <motion.div 
        style={{ y: yTopRight }} 
        className="absolute right-[3%] xl:right-[5%] top-[12%] xl:top-[15%] hidden lg:block z-20 w-36 xl:w-48 aspect-square border border-white/10 p-2 bg-[#1c1c1c] shadow-2xl transition-all duration-300 hover:border-white/30"
      >
        <div className="relative w-full h-full">
          <Image 
            src={homeHero.images[3]} 
            alt="Signature Drink" 
            fill 
            className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" 
            referrerPolicy="no-referrer" 
          />
        </div>
      </motion.div>

      {/* 5. Middle-Right (Pancakes with syrup pouring - Closer to center) */}
      <motion.div 
        style={{ y: yMidRight }} 
        className="absolute right-[13%] xl:right-[15%] top-[30%] xl:top-[33%] hidden lg:block z-20 w-36 xl:w-48 aspect-square border border-white/10 p-2 bg-[#1c1c1c] shadow-2xl transition-all duration-300 hover:border-white/30"
      >
        <div className="relative w-full h-full">
          <Image 
            src={homeHero.images[4]} 
            alt="Sweet Dish" 
            fill 
            className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" 
            referrerPolicy="no-referrer" 
          />
        </div>
      </motion.div>

      {/* 6. Bottom-Right (Sandwich on plate) */}
      <motion.div 
        style={{ y: yBotRight }} 
        className="absolute right-[4%] xl:right-[6%] top-[55%] xl:top-[58%] hidden lg:block z-20 w-36 xl:w-48 aspect-square border border-white/10 p-2 bg-[#1c1c1c] shadow-2xl transition-all duration-300 hover:border-white/30"
      >
        <div className="relative w-full h-full">
          <Image 
            src={homeHero.images[5]} 
            alt="Savory Dish" 
            fill 
            className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" 
            referrerPolicy="no-referrer" 
          />
        </div>
      </motion.div>


      {/* Center Text & Arch */}
      <FadeIn className="relative z-30 text-center flex flex-col items-center w-full max-w-4xl px-4 mt-8 md:mt-12">
        <h1 className="font-serif text-[32px] md:text-[48px] lg:text-[60px] text-white leading-[1.1] mb-2 z-10 select-none">
          {homeHero.title1}
        </h1>
        <h1 className="font-serif text-[32px] md:text-[48px] lg:text-[60px] text-white leading-[1.1] mb-6 md:mb-8 z-10 select-none">
          <span className="italic">{homeHero.title2}</span> {homeHero.title3}
        </h1>
        
        {/* Sleek vertical spacer line like original template */}
        <div className="w-[1px] h-[40px] md:h-[60px] bg-white/20 my-2 md:my-4"></div>
        
        {/* Sharp arch photo of interior (no gradient or fade overlay) */}
        <div className="relative w-[240px] h-[280px] md:w-[300px] md:h-[360px] lg:w-[360px] lg:h-[430px] rounded-t-full overflow-hidden shadow-2xl border border-white/10">
          <Image 
            src="/luma-restaurant.jpg" 
            alt="Luma Restaurant Interior" 
            fill 
            className="object-cover" 
            referrerPolicy="no-referrer" 
          />
        </div>
      </FadeIn>
    </section>
  );
}
