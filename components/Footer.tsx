'use client';
import Link from 'next/link';
import { StarIcon } from './StarIcon';
import { useCms } from '@/components/CmsProvider';

export default function Footer() {
  const { data } = useCms();
  const { restaurantInfo } = data;

  return (
    <footer id="footer" className="mt-auto bg-[#151515] border-t border-border pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <Link href="/" className="flex flex-col items-center mb-16">
            <div className="font-serif text-[42px] font-normal text-white border-b border-white px-2 pb-2 leading-none">{restaurantInfo.name}</div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-white mt-2">Reštaurácia</div>
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-48 text-sm text-[#dcdcdc] font-sans">
            <div className="text-left space-y-6">
              <div>{restaurantInfo.email}</div>
              <div>{restaurantInfo.phone}</div>
              <div className="whitespace-pre-line">{restaurantInfo.address}</div>
            </div>
            
            <div className="text-left space-y-6">
              {restaurantInfo.hours.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <StarIcon className="w-4 h-4 text-white" />
                  <span>{item.days} {item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-xs tracking-wider uppercase text-white mb-16 font-sans font-semibold">
          <Link href="/styleguide" className="hover:text-gray-300">Styleguide</Link>
          <Link href="/license" className="hover:text-gray-300">Licencia</Link>
          <Link href="/changelog" className="hover:text-gray-300">Changelog</Link>
          <Link href="/404" className="hover:text-gray-300">404 Stránka</Link>
          <Link href="/protected" className="hover:text-gray-300">Chránená Stránka</Link>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/70 font-sans">
          <div>
            © 2023 Eclipse by Maria Marin. Powered by Webflow.
          </div>
          <div className="flex gap-6 mt-4 md:mt-0 font-semibold text-white tracking-wider">
            <Link href={restaurantInfo.socials.instagram} className="hover:text-white transition-colors">Instagram</Link>
            <Link href={restaurantInfo.socials.facebook} className="hover:text-white transition-colors">Facebook</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
