import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Trust from '@/components/Trust';
import GenAI from '@/components/GenAI';
import Cards from '@/components/Cards';
import DigitalSolutions from '@/components/DigitalSolutions';
import Products from '@/components/Products';
import Technology from '@/components/Technology';
import Proof from '@/components/Proof';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Trust />
        <GenAI />
        <Cards />
        <DigitalSolutions />
        <Products />
        <Technology />
        <Proof />
        <Testimonials />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
