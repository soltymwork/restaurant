import Image from 'next/image';

export default function ReservationPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center pt-48 pb-24 px-4 overflow-hidden bg-[#151515]">
      {/* Background repeating text */}
      <div className="absolute inset-0 z-0 flex flex-col justify-center overflow-hidden opacity-[0.02] select-none pointer-events-none text-center">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="font-serif text-[100px] md:text-[150px] whitespace-nowrap font-bold uppercase mb-8">
            REZERVUJTE SI STÔL REZERVUJTE SI STÔL
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-[800px] mb-12 text-center">
        <h1 className="font-serif text-[44px] md:text-[56px] text-white">Rezervácia</h1>
        <div className="flex justify-center items-center mt-8">
          <div className="w-[1px] h-[50px] bg-white/20"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[900px] bg-[#ebebeb] p-8 md:p-24 shadow-2xl flex flex-col items-center">
        <Image src="https://cdn.prod.website-files.com/63dfd30946a4d62d586c19ad/63e626a2773f74accfeea262_squares-top.svg" alt="ornament" width={100} height={40} className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[90%]" unoptimized />
        
        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 w-full mt-12 mb-12 relative z-20">
          <div className="space-y-6">
            <label className="block font-sans text-[14px] text-[#151515]">Meno</label>
            <input type="text" placeholder="Meno Priezvisko" className="w-full bg-transparent border-b border-[#ccc] pb-4 text-[#151515] placeholder:text-[#999] focus:outline-none focus:border-[#151515] transition-colors" />
          </div>
          <div className="space-y-6">
            <label className="block font-sans text-[14px] text-[#151515]">Počet hostí</label>
            <input type="number" placeholder="2" className="w-full bg-transparent border-b border-[#ccc] pb-4 text-[#151515] placeholder:text-[#999] focus:outline-none focus:border-[#151515] transition-colors" />
          </div>
          <div className="space-y-6">
            <label className="block font-sans text-[14px] text-[#151515]">Dátum</label>
            <input type="text" placeholder="04/20/2023" className="w-full bg-transparent border-b border-[#ccc] pb-4 text-[#151515] placeholder:text-[#999] focus:outline-none focus:border-[#151515] transition-colors" />
          </div>
          <div className="space-y-6">
            <label className="block font-sans text-[14px] text-[#151515]">Čas</label>
            <input type="text" placeholder="20:00" className="w-full bg-transparent border-b border-[#ccc] pb-4 text-[#151515] placeholder:text-[#999] focus:outline-none focus:border-[#151515] transition-colors" />
          </div>
          <div className="md:col-span-2 space-y-6">
            <label className="block font-sans text-[14px] text-[#151515]">Doplňujúce informácie</label>
            <input type="text" placeholder="Príklad" className="w-full bg-transparent border-b border-[#ccc] pb-4 text-[#151515] placeholder:text-[#999] focus:outline-none focus:border-[#151515] transition-colors" />
          </div>
          <div className="md:col-span-2 flex justify-start mt-4">
            <button type="button" className="bg-[#151515] text-white px-8 py-4 font-sans text-[13px] hover:bg-[#333] transition-colors">
              Odoslať rezerváciu
            </button>
          </div>
        </form>

        <Image src="https://cdn.prod.website-files.com/63dfd30946a4d62d586c19ad/63e626a15068cfae6e18f23f_squares-bottom.svg" alt="ornament" width={100} height={40} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[90%]" unoptimized />
      </div>
    </div>
  );
}
