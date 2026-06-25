'use client';
import Link from 'next/link';
import { navLinks } from '@/lib/cms-data';
import { useCms } from '@/components/CmsProvider';

export default function Navbar() {
  const { data } = useCms();
  const { restaurantInfo } = data;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#151515] border-b border-transparent transition-all duration-300">
      <div className="w-full px-6 lg:px-12 h-24 grid grid-cols-12 items-center">
        {/* Left Links */}
        <div className="hidden lg:flex items-center justify-end pr-8 xl:pr-16 gap-6 xl:gap-10 text-[13px] font-semibold tracking-[0.1em] text-white uppercase font-montserrat col-span-5">
          {[0, 1, 2].map((i) => (
            <Link key={i} href={navLinks[i].href} className="relative group overflow-hidden pb-1 whitespace-nowrap">
              <span>{navLinks[i].name}</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white -translate-x-[105%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
            </Link>
          ))}
        </div>
        
        {/* Logo */}
        <div className="col-span-12 lg:col-span-2 flex flex-col items-center justify-center">
          <Link href="/" className="flex flex-col items-center select-none">
            <div className="font-serif text-[38px] xl:text-[42px] font-normal text-white leading-none pb-2 border-b border-white px-3 tracking-wide">{restaurantInfo.name}</div>
            <div className="text-[9px] xl:text-[10px] tracking-[0.25em] uppercase text-white mt-2 whitespace-nowrap">Restaurant</div>
          </Link>
        </div>
        
        {/* Right Links */}
        <div className="hidden lg:flex items-center justify-start pl-8 xl:pl-16 gap-6 xl:gap-10 text-[13px] font-semibold tracking-[0.1em] text-white uppercase font-montserrat col-span-5">
          {[3, 4, 5].map((i) => (
            <Link key={i} href={navLinks[i].href} className="relative group overflow-hidden pb-1 whitespace-nowrap">
              <span>{navLinks[i].name}</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white -translate-x-[105%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
