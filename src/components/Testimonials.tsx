'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Reveal from './Reveal';
import { useMediaQuery } from './useMediaQuery';
import { usePrefersReducedMotion } from './useReducedMotion';
import { testimonials } from '@/lib/content';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// One full-width card per testimonial, in a carousel. Same technique as GenAI and
// Products: on desktop the section pins and vertical scroll slides the cards
// sideways, then releases after the last one; elsewhere it's a swipeable strip.
// Cards with an `image` get it as a background under a gradient from the logo's
// blue to transparent, with the logo (same blue background) on top-left.
export default function Testimonials() {
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
        // The trailing empty tween holds the pin a little longer so the last card lands fully.
        animation: gsap.timeline({ defaults: { ease: 'none' } }).to(track, { x: () => -dist(), duration: 1 }).to({}, { duration: 0.15 }),
      });
      return () => st.kill();
    },
    { dependencies: [pinned], revertOnUpdate: true }
  );

  return (
    <section id="testimonials" className={'section testimonials' + (pinned ? ' is-pinned' : '')} ref={sectionRef}>
      <div className="container">
        <Reveal>
          <h2>Built on <em className="accent">trusted</em> partnerships.</h2>
        </Reveal>
      </div>
      <div className="container quotes-viewport" ref={viewportRef}>
        <div className="quotes" ref={trackRef}>
          {testimonials.map((t) => (
            <div key={t.name} style={(t.tint || t.mark ? { ...(t.tint ? { background: t.tint } : {}), ...(t.mark ? { '--mark': t.mark } : {}) } : undefined) as React.CSSProperties | undefined} className={'quote' + (t.image ? ' has-bg' : '') + (t.logo ? ' has-logo' : '') + (t.tint ? ' has-tint' : '') + (t.logoWidth ? ' has-wordmark' : '') + (t.logoBadge ? ' has-badge' : '') + (t.lightOverlay ? ' has-light' : '')}>
              {t.image && <span className="quote-bg" style={{ backgroundImage: `url(${t.image})`, ...(t.overlay ? { '--overlay': t.overlay } : {}) } as React.CSSProperties} aria-hidden="true" />}
              {t.logo ? (
                <Image className={'quote-logo' + (t.image && !t.logoWidth ? '' : ' quote-logo--plain') + (t.logoLight ? ' quote-logo--light' : '') + (t.logoBadge ? ' quote-logo--badge' : '')} src={t.logo} alt={t.name} width={704} height={598} style={t.logoWidth ? { width: t.logoWidth } : undefined} />
              ) : (
                <span className="quote-mark" aria-hidden="true">“</span>
              )}
              <div className="quote-body">
                <div>
                  <blockquote>{t.quote.split('*').map((part, i) => (i % 2 ? <mark key={i}>{part}</mark> : part))}</blockquote>
                  <p className="quote-attribution">{t.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
