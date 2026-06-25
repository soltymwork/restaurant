import './globals.css';
import { Libre_Baskerville, Hind_Siliguri, Inter, Montserrat } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CmsProvider } from '@/components/CmsProvider';

const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-libre-baskerville',
});

const hindSiliguri = Hind_Siliguri({
  weight: ['400', '600'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-hind-siliguri',
});

const inter = Inter({
  weight: ['400', '500'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
});

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-montserrat',
});

export const metadata = {
  title: 'Luma Restaurant',
  description: 'Gurmánsky zážitok s vynikajúcou chuťou',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk" className={`${libreBaskerville.variable} ${hindSiliguri.variable} ${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans bg-background text-foreground flex flex-col min-h-screen selection:bg-white selection:text-black">
        <CmsProvider>
          <Navbar />
          <main className="flex-grow pt-24">
            {children}
          </main>
          <Footer />
        </CmsProvider>
      </body>
    </html>
  );
}
