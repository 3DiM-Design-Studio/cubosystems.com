'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from './useReducedMotion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

// One shared timing scale for the entrance sequence — badge, headline (via
// SplitText's own stagger), lede, actions and scroll cue all step off this
// so the Hero reads as one coordinated entrance rather than independent fades.
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const T_TITLE = 0.1;
const T_LEDE = 0.85;
const T_ACTIONS = 1.0;
const T_SCROLL_CUE = 1.3;

const TITLE: { text?: string; pill?: string; icon?: string; ratio?: number; accent?: boolean }[] = [
  { text: 'We' }, { text: 'build' }, { icon: '/media/hero/layers.png', ratio: 800 / 636 },
  { text: 'technology' }, { text: 'that' }, { text: 'moves' }, { icon: '/media/hero/bolt.png', ratio: 436 / 800 },
  { text: 'businesses' }, { text: 'forward.', accent: true },
];

const PANEL = [
  { src: '/media/04fdzbo3/2.jpg', alt: 'Digital marketing interface on a tablet' },
  { src: '/media/4ypgnwjk/culture-2.png', alt: 'The Cubo team at work' },
  { src: '/media/y2sdbuba/1.jpg', alt: 'Human and robot hand touching a network' },
  { src: '/media/55uiwvsw/businessman-go.png', alt: 'Business professional' },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.4]);

  return (
    <section id="home" className="hero hero-left" ref={sectionRef}>
      <motion.div className="container hero-content" style={{ y: contentY, opacity: contentOpacity }}>
        <h1 aria-label="We build technology that moves businesses forward.">
          {TITLE.map((w, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className={w.pill ? 'hero-pill' : w.icon ? 'hero-icon' : w.accent ? 'hero-accent' : undefined}
              style={w.icon ? ({ aspectRatio: w.ratio, '--src': `url(${w.icon})` } as React.CSSProperties) : undefined}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .8, delay: T_TITLE + i * .07, ease: EASE }}
            >
              {w.pill ? <Image src={w.pill} alt="" fill sizes="160px" /> : w.icon ? <Image src={w.icon} alt="" fill sizes="120px" /> : w.text}
            </motion.span>
          ))}
        </h1>
        <motion.p className="lede" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: T_LEDE, ease: EASE }}>
          Cubo Systems helps businesses transform complex ideas, processes and data into scalable digital solutions.
        </motion.p>
        <motion.div className="actions" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: T_ACTIONS, ease: EASE }}>
          <a className="button" href="#contact">Let’s Talk <b><ArrowRight size={16} /></b></a>
        </motion.div>
      </motion.div>
      <motion.div className="hero-panel" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: T_SCROLL_CUE, ease: EASE }}>
        {PANEL.map((p) => (
          <div className="hero-panel-item" key={p.src}>
            <Image src={p.src} alt={p.alt} fill sizes="(max-width: 900px) 50vw, 25vw" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
