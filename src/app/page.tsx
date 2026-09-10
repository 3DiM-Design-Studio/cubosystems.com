import ScrollProgress from '@/components/ScrollProgress';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Trust from '@/components/Trust';
import About from '@/components/About';
import Cards from '@/components/Cards';
import DigitalSolutions from '@/components/DigitalSolutions';
import Process from '@/components/Process';
import Technology from '@/components/Technology';
import Proof from '@/components/Proof';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Trust />
        <About />
        <Cards />
        <DigitalSolutions />
        <Process />
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
