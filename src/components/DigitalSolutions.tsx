'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Reveal from './Reveal';
import SolutionVisual from './SolutionVisual';
import { solutions } from '@/lib/content';
import { useMediaQuery } from './useMediaQuery';
import { usePrefersReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EASE = [0.16, 1, 0.3, 1] as const;
const COUNT = solutions.length;

// Vertical scroll distance devoted to the horizontal slide, per panel-to-panel
// step — short and deliberate rather than a long scrub buffer, since the
// scroll now snaps fully to each panel instead of tracking position
// continuously.
const VH_PER_STEP = 100;

export default function DigitalSolutions() {
  const isDesktop = useMediaQuery('(min-width: 981px)');
  const reduced = usePrefersReducedMotion();
  const useSlider = isDesktop && !reduced;

  return (
    <section id="solutions" className="section ds-section">
      <div className="container">
        <Reveal>
          <p className="eyebrow orange">DIGITAL SOLUTIONS</p>
          <h2>Technology built around<br />your <em className="accent">business</em>.</h2>
        </Reveal>
      </div>

      {useSlider ? <SliderExperience /> : <StackedExperience />}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Desktop: GSAP ScrollTrigger pins the section and drives a timeline that
// tweens the track's xPercent across the 4 panels. scrub ties the tween to
// scroll position while actively scrolling, but `snap` always eases the
// timeline fully to the nearest panel label the moment scrolling stops —
// so it's never left resting mid-transition between two panels. ScrollTrigger
// pins by fixing the element itself (not CSS position:sticky), so it isn't
// affected by the site's global html/body{overflow-x:hidden}.
// ---------------------------------------------------------------------------
function SliderExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const steps = COUNT - 1;
      const tl = gsap.timeline({ defaults: { ease: 'none' } });
      for (let i = 0; i < steps; i++) {
        tl.addLabel(`panel-${i}`)
          .to(track, { xPercent: -100 * (i + 1), duration: 1 });
      }
      tl.addLabel(`panel-${steps}`);

      const st = ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top top',
        end: () => `+=${steps * window.innerHeight * (VH_PER_STEP / 100)}`,
        invalidateOnRefresh: true,
        pin: true,
        animation: tl,
        scrub: 1,
        snap: {
          snapTo: 'labels',
          duration: { min: 0.2, max: 0.5 },
          ease: 'power2.inOut',
        },
        onUpdate: (self) => {
          const idx = Math.min(steps, Math.round(self.progress * steps));
          setActive((prev) => (prev === idx ? prev : idx));
        },
      });

      return () => st.kill();
    },
    { scope: rootRef }
  );

  return (
    <div className="ds-drive" ref={rootRef}>
      <div className="ds-pin">
        <div className="container ds-viewport">
          <div className="ds-track" ref={trackRef}>
            {solutions.map((s, i) => (
              <SolutionPanel key={s.n} solution={s} index={i} isActive={active === i} />
            ))}
          </div>
        </div>

        <motion.div
          className="ds-scroll-hint"
          initial={false}
          animate={{ opacity: active === 0 ? 1 : 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          aria-hidden="true"
        >
          <span>Scroll to explore</span>
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
            <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mobile / reduced-motion: a plain, natural vertical stack. No pin, no
// horizontal movement — each panel reveals in place as the user scrolls.
// ---------------------------------------------------------------------------
function StackedExperience() {
  return (
    <div className="container ds-stack">
      {solutions.map((s, i) => (
        <Reveal key={s.n} className="ds-panel ds-panel--stacked" duration={0.6}>
          <SolutionPanelContent solution={s} index={i} />
        </Reveal>
      ))}
    </div>
  );
}

function SolutionPanel({
  solution,
  index,
  isActive,
}: {
  solution: (typeof solutions)[number];
  index: number;
  isActive: boolean;
}) {
  return (
    <div className={'ds-panel' + (isActive ? ' is-active' : '')}>
      <SolutionPanelContent solution={solution} index={index} isActive={isActive} />
    </div>
  );
}

function SolutionPanelContent({
  solution,
  index,
  isActive = true,
}: {
  solution: (typeof solutions)[number];
  index: number;
  isActive?: boolean;
}) {
  return (
    <>
      <div className="ds-panel-left">
        <span className="ds-panel-num">
          <span className="ds-panel-num-big">{solution.n}</span>
          <span className="ds-panel-num-total">/ 0{COUNT}</span>
        </span>
        <h3 className="ds-panel-title">{solution.title}</h3>
        <p className="ds-panel-desc">{solution.desc}</p>
        <div className="ds-panel-tags">
          {panelTags[index]?.map((tag) => (
            <span className="ds-panel-tag" key={tag}>{tag}</span>
          ))}
        </div>
      </div>

      <motion.div
        className="ds-panel-visual"
        initial={false}
        animate={{ opacity: isActive ? 1 : 0.55, scale: isActive ? 1 : 0.97 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <SolutionVisual index={index} />
      </motion.div>
    </>
  );
}

const panelTags: string[][] = [
  ['Strategy', 'Modernisation', 'Digital Experience'],
  ['Workflow', 'Process', 'Automation'],
  ['Data', 'Analytics', 'Intelligence'],
  ['API', 'Cloud', 'Systems'],
];
