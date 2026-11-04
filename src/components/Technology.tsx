'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import TechIcon from './TechIcon';
import { stack, type TechCategory, type TechItem, type TechGroup } from '@/lib/content';
import { usePrefersReducedMotion } from './useReducedMotion';
import { useMediaQuery } from './useMediaQuery';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Scroll-expand frame: starts as a small centered card holding only the
// heading, grows to the site's content width and height, and the four tech
// carousels fade in around the heading, one per side.
const FRAME_START_H = 380;
const HEADER_H = 87; // fixed navbar
const FRAME_GAP = 24; // breathing room below the expanded frame

const categories = Object.keys(stack) as TechCategory[];
// Fallback strips (mobile / reduced motion) use one row per category.
const SIDES = ['top', 'right', 'bottom', 'left'] as const;

function flatten(content: TechItem[] | TechGroup[]): TechItem[] {
  return content.length > 0 && 'items' in content[0] ? (content as TechGroup[]).flatMap((g) => g.items) : (content as TechItem[]);
}

function Carousel({ label, items, side }: { label: string; items: TechItem[]; side: (typeof SIDES)[number] }) {
  // Repeat the set so one half is always wider than the track, then render two
  // halves so translating by -50% loops seamlessly.
  const half = Array.from({ length: Math.max(1, Math.ceil(8 / items.length)) }, () => items).flat();
  const list = [...half, ...half];
  return (
    <div className={`tech-c tech-c--${side}`} role="group" aria-label={label}>
      <span className="tech-c-label">{label}</span>
      <div className="tech-marquee">
        <div className="tech-marquee-track" style={{ '--dur': `${half.length * 2.8}s` } as CSSProperties}>
          {list.map((item, i) => (
            <span className="tech-chip" key={i} aria-hidden={i >= half.length}>
              <span className="tech-card-badge"><TechIcon name={item.name} /></span>
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}


// Desktop: one quarter-circle track in each corner of the frame, centred on that
// corner, with one category's chips streaming along it (fading in and out at the
// two ends so each loop reads as endless). Positions are recomputed every frame
// from the frame's current size and each chip's measured width.
const CORNERS = ['tl', 'tr', 'br', 'bl'] as const;
type Corner = (typeof CORNERS)[number];
const CORNER_SPEED = 56; // px/s along the arc
const CHIP_GAP = 30;
const FADE = 70; // px at each end of the arc over which chips fade
const BLURBS: Record<TechCategory, string> = {
  'Software Development': 'Web, back-end and mobile engineering: the languages and frameworks we build products with.',
  'Cloud & Infrastructure': 'Cloud platforms and tooling for hosting, scaling and managing business systems.',
  'AI & Data': 'AI, machine learning and analytics tools that turn data into decisions.',
  CMS: 'Content platforms that let your team manage sites and customer data without code.',
};
const CURSOR_SIZE = 250; // the square that replaces the cursor over a loop
const HOVER_GROW = 1.2; // hovered corner scale
const HOVER_SHRINK = 0.78; // other corners' scale while one is hovered
const arcRadius = (w: number, h: number) => Math.min(w * 0.3, h * 0.44);
// Icons and title scale by the full amount; the loop's radius only by half, so a grown loop stays clear of the heading.
const radiusScale = (g: number) => 1 + (g - 1) * 0.5;

// Chips for one corner: the category's items, repeated so the stream is always
// longer than the arc it runs along. The category title itself stays put (see
// .tech-corner-label) while the chips move.
type Entry = { key: string; item: TechItem };
const cornerEntries = (cat: TechCategory): Entry[] => {
  const items = flatten(stack[cat]);
  const reps = Math.max(1, Math.ceil(16 / items.length));
  return Array.from({ length: reps }, (_, r) => items.map((item) => ({ key: `${cat}-${r}-${item.name}`, item }))).flat();
};

// Point at arc distance u from the arc's start, moving clockwise round the frame.
function arcPoint(corner: Corner, u: number, r: number, w: number, h: number) {
  const phi = corner === 'tl' || corner === 'br' ? Math.PI / 2 - u / r : u / r;
  const dx = r * Math.cos(phi);
  const dy = r * Math.sin(phi);
  return {
    x: corner === 'tl' || corner === 'bl' ? dx : w - dx,
    y: corner === 'tl' || corner === 'tr' ? dy : h - dy,
  };
}

function Orbit() {
  const rootRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(-1); // index of the hovered corner, or -1
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(-1); // drives which stack the square describes

  // Hovering inside a corner's quarter-circle grows that loop; the others shrink.
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const reach = arcRadius(box.width, box.height) * 1.15;
    let best = -1;
    let bestD = reach;
    CORNERS.forEach((c, k) => {
      const d = Math.hypot(x - (c === 'tl' || c === 'bl' ? 0 : box.width), y - (c === 'tl' || c === 'tr' ? 0 : box.height));
      if (d < bestD) {
        bestD = d;
        best = k;
      }
    });
    hoverRef.current = best;
    setHovered((h) => (h === best ? h : best));
    // The square always hangs below the pointer (flipping sideways near the right edge,
    // sliding up only if it would leave the frame at the bottom).
    const cur = cursorRef.current;
    if (cur) {
      const cx = x + 18 + CURSOR_SIZE > box.width ? x - CURSOR_SIZE - 18 : x + 18;
      const cy = Math.min(y + 18, box.height - CURSOR_SIZE - 8);
      cur.style.transform = `translate(${cx}px, ${cy}px)`;
    }
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const groups = [...root.querySelectorAll<HTMLElement>('.tech-ring')];
    const labels = [...root.querySelectorAll<HTMLElement>('.tech-corner-label')];
    const grow = [1, 1, 1, 1]; // eased per-corner scale
    const tick = (time: number) => {
      const w = root.clientWidth;
      const h = root.clientHeight;
      grow.forEach((g, k) => {
        const target = hoverRef.current < 0 ? 1 : k === hoverRef.current ? HOVER_GROW : HOVER_SHRINK;
        grow[k] = g + (target - g) * 0.12;
      });
      // Titles stay fixed in each corner's pocket, halfway out along the bisector.
      labels.forEach((el, k) => {
        const d = arcRadius(w, h) * radiusScale(grow[k]) * 0.5 * Math.SQRT1_2;
        const c = CORNERS[k];
        const x = c === 'tl' || c === 'bl' ? d : w - d;
        const y = c === 'tl' || c === 'tr' ? d : h - d;
        el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${grow[k]})`;
      });
      groups.forEach((group, k) => {
        const r = arcRadius(w, h) * radiusScale(grow[k]);
        const arcLen = (Math.PI * r) / 2;
        const chips = [...group.children] as HTMLElement[];
        const widths = chips.map((c) => c.offsetWidth);
        const total = widths.reduce((a, b) => a + b + CHIP_GAP, 0);
        const shift = time * CORNER_SPEED;
        let cum = 0;
        chips.forEach((c, i) => {
          const u = (((cum + widths[i] / 2 + shift) % total) + total) % total;
          cum += widths[i] + CHIP_GAP;
          if (u > arcLen) {
            c.style.opacity = '0';
            return;
          }
          const { x, y } = arcPoint(CORNERS[k], u, r, w, h);
          c.style.opacity = String(Math.max(0, Math.min(1, Math.min(u, arcLen - u) / FADE)));
          c.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${grow[k]})`;
        });
      });
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <div className="tech-orbit tech-orbit--rings" ref={rootRef} onPointerMove={onPointerMove} onPointerLeave={() => { hoverRef.current = -1; setHovered(-1); }} data-hover={hovered >= 0 ? '' : undefined}>
      {categories.map((cat, k) => (
        <div key={cat}>
          <span className="tech-corner-label">{cat}</span>
          <div className="tech-ring" data-corner={CORNERS[k % CORNERS.length]}>
            {cornerEntries(cat).map((e) => (
              <span className="tech-orbit-icon" key={e.key} role="img" aria-label={e.item.name} title={e.item.name}>
                <TechIcon name={e.item.name} />
              </span>
            ))}
          </div>
        </div>
      ))}
      <div className={'tech-cursor' + (hovered >= 0 ? ' is-on' : '')} ref={cursorRef} aria-hidden="true" style={{ width: CURSOR_SIZE, height: CURSOR_SIZE }}>
        {hovered >= 0 && (
          <>
            <strong>{categories[hovered]}</strong>
            <p>{BLURBS[categories[hovered]]}</p>
            <span>{flatten(stack[categories[hovered]]).map((i) => i.name).join(' · ')}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default function Technology() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 981px)');
  const pinned = isDesktop && !reduced;

  useGSAP(
    () => {
      const frame = frameRef.current;
      if (!pinned || !frame) return;
      const vw = () => document.documentElement.clientWidth;
      const tl = gsap.timeline({ defaults: { ease: 'none' } });
      tl.fromTo(
        frame,
        { width: () => Math.min(860, vw() * 0.86), height: FRAME_START_H, borderRadius: 28 },
        {
          width: () => Math.min(1200, vw() - 48), // site content width
          height: () => window.innerHeight - HEADER_H - FRAME_GAP,
          borderRadius: 20,
          duration: 1,
        },
        0
      )
        .fromTo(frame.querySelectorAll('.tech-ring, .tech-corner-label'), { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.1 }, 0.75)
        .to({}, { duration: 0.3 });
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * 1.4}`,
        pin: true,
        scrub: 0.5,
        invalidateOnRefresh: true,
        animation: tl,
      });
      return () => st.kill();
    },
    { dependencies: [pinned], revertOnUpdate: true }
  );

  return (
    <section id="technology" className={'section technology' + (pinned ? ' is-pinned' : '')} ref={sectionRef}>
      <div className="tech-frame" ref={frameRef}>
        <div className="tech-head">
          <h2 id="technology-heading">The right <em className="accent">technology</em>,<br />for the right outcome.</h2>
        </div>
        {pinned ? (
          <Orbit />
        ) : (
          <div className="tech-orbit">
            {categories.map((c, i) => (
              <Carousel key={c} label={c} items={flatten(stack[c])} side={SIDES[i % SIDES.length]} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
