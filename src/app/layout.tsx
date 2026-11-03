import type { Metadata } from 'next';
import { Google_Sans_Flex } from 'next/font/google';
import './globals.css';
import './site.css';
import SmoothScroll from '@/components/SmoothScroll';

const font = Google_Sans_Flex({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Cubo Systems | Digital Engineering & Technology Solutions',
  description: 'Cubo Systems transforms complex ideas, processes and data into scalable digital solutions.',
  metadataBase: new URL('https://cubosystems.com'),
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Cubo Systems | Technology that moves business forward',
    description: 'Practical digital engineering, automation and data solutions for ambitious businesses.',
    type: 'website',
    url: 'https://cubosystems.com/',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={font.variable}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
