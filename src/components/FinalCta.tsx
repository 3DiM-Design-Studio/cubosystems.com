import Reveal from './Reveal';
import { ArrowRight } from 'lucide-react';

export default function FinalCta() {
  return (
    <section className="final-cta">
      <Reveal variant="scale" className="container final-cta-inner">
        <h2>Ready to move<br />your business <em className="accent">forward?</em></h2>
        <a className="button" href="#contact">Let’s Talk <b><ArrowRight size={16} /></b></a>
      </Reveal>
    </section>
  );
}
