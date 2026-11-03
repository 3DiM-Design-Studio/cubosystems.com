'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Reveal from './Reveal';
import { useMediaQuery } from './useMediaQuery';
import { usePrefersReducedMotion } from './useReducedMotion';
import { products } from '@/lib/content';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Same technique as GenAI: on desktop the section pins and vertical scroll
// slides the full-width cards sideways, then releases after the last card.
// Elsewhere it is a plain swipeable scroll-snap strip.
export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 981px)');
  const reduced = usePrefersReducedMotion();
  const pinned = isDesktop && !reduced;

  useGSAP(
    () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!pinned || !track || !viewport) return;
      const dist = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${dist() * 1.15}`,
        pin: true,
        scrub: 0.5,
        invalidateOnRefresh: true,
        // The trailing empty tween holds the pin ~15% longer so the last card has
        // fully landed before the section releases.
        animation: gsap.timeline({ defaults: { ease: 'none' } }).to(track, { x: () => -dist(), duration: 1 }).to({}, { duration: 0.15 }),
      });
      return () => st.kill();
    },
    { dependencies: [pinned], revertOnUpdate: true }
  );

  return (
    <section id="products" className={'section products' + (pinned ? ' is-pinned' : '')} ref={sectionRef}>
      <div className="container">
        <Reveal>
          <h2>Our <span className="orange">products</span>.</h2>
        </Reveal>
      </div>

      <div className="products-viewport" ref={viewportRef}>
        <div className="products-track" ref={trackRef}>
          {products.map((p) => (
            <article className="product-card" key={p.name}>
              <div className="product-copy">
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
              </div>
              <div className="product-logo">
                <Image src={p.logo} alt={p.name} width={240} height={90} />
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="container products-cta">
        <div className="products-cta-main">
          <h3>Interested in any of these products?</h3>
          <p>Tell us what you’re looking for and we’ll get back to you with the next steps.</p>
          <a className="button" href="#contact">Let’s talk <b><ArrowRight size={16} /></b></a>
        </div>
        <div className="products-ai">
          <h3><span className="ai-underline">AI-powered</span>, from the ground up.</h3>
          <p>Generative AI is built into how these products work, so they take on more of the work for you.</p>
          <a className="text-link" href="#ai">See how we use AI <b><ArrowRight size={16} /></b></a>
        </div>
      </div>
    </section>
  );
}
