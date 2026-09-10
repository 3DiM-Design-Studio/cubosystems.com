'use client';

import { useMemo, useRef, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal, { Stagger, StaggerItem } from './Reveal';
import TechIcon from './TechIcon';
import OptionWheel, { type OptionWheelHandle } from './OptionWheel';
import { stack, type TechCategory, type TechItem, type TechGroup } from '@/lib/content';
import { usePrefersReducedMotion } from './useReducedMotion';

const categories = Object.keys(stack) as TechCategory[];
const DEFAULT_INDEX = categories.indexOf('Mobile');

function isGrouped(content: TechItem[] | TechGroup[]): content is TechGroup[] {
  return content.length > 0 && 'items' in content[0];
}

function flatten(content: TechItem[] | TechGroup[]): TechItem[] {
  return isGrouped(content) ? content.flatMap((g) => g.items) : content;
}

export default function Technology() {
  const [activeIndex, setActiveIndex] = useState(DEFAULT_INDEX);
  const [direction, setDirection] = useState(1);
  const reduced = usePrefersReducedMotion();
  const active = categories[activeIndex];
  const activeContent = useMemo(() => stack[active], [active]);
  const activeGroups = useMemo<TechGroup[]>(
    () => (isGrouped(activeContent) ? activeContent : [{ label: active, items: activeContent }]),
    [activeContent, active]
  );
  const wheelRef = useRef<OptionWheelHandle | null>(null);

  // Single source of truth: activeIndex. The wheel's own interactions
  // (click/drag/scroll/keys) call this via onChange, so it never needs the
  // imperative handle. Only the panel's prev/next arrows — which change
  // activeIndex from outside the wheel — also nudge the wheel via
  // wheelRef, since OptionWheel has no controlled `selected` prop to
  // re-render it with.
  const selectIndex = (next: number, fromWheel = false) => {
    setDirection(next > activeIndex ? 1 : -1);
    setActiveIndex(next);
    if (!fromWheel) wheelRef.current?.select(next);
  };

  return (
    <section id="technology" className="section technology">
      <div className="container">
        <Reveal>
          <p className="eyebrow orange">TECHNOLOGY STACK</p>
          <h2 id="technology-heading">The right <em className="accent">technology</em>,<br />for the right outcome.</h2>
        </Reveal>

        {/* Desktop / tablet: curved category wheel + dynamic content panel */}
        <Reveal delay={.1} className="tech-layout" as="div">
          <div className="tech-wheel-col">
            <OptionWheel
              ref={wheelRef}
              items={categories}
              defaultSelected={DEFAULT_INDEX}
              textColor="#7A7A7A"
              activeColor="#FFFFFF"
              side="left"
              fontSize={1.6}
              spacing={1.6}
              curve={1}
              tilt={10}
              blur={2}
              fade={0.3}
              smoothing={200}
              inset={24}
              loop={false}
              draggable
              soundUrl=""
              soundVolume={0}
              onChange={(index: number) => selectIndex(index, true)}
            />
          </div>

          <div className="tech-panel" id="tech-panel" role="tabpanel" aria-labelledby={`tech-tab-${activeIndex}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduced ? { opacity: 0 } : { opacity: 0, x: 24 * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, x: -24 * direction }}
                transition={{ duration: reduced ? .2 : .4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="tech-panel-head">
                  <div>
                    <span className="tech-panel-index">{String(activeIndex + 1).padStart(2, '0')}.</span>
                    <h3>{active}</h3>
                  </div>
                  <div className="tech-panel-nav">
                    <span className="tech-panel-count">
                      <b>{String(activeIndex + 1).padStart(2, '0')}</b> / {String(categories.length).padStart(2, '0')}
                    </span>
                    <button
                      type="button"
                      className="tech-panel-arrow"
                      aria-label="Previous category"
                      disabled={activeIndex === 0}
                      onClick={() => selectIndex(Math.max(activeIndex - 1, 0))}
                    >‹</button>
                    <button
                      type="button"
                      className="tech-panel-arrow"
                      aria-label="Next category"
                      disabled={activeIndex === categories.length - 1}
                      onClick={() => selectIndex(Math.min(activeIndex + 1, categories.length - 1))}
                    >›</button>
                  </div>
                </div>
                {activeGroups.map((group) => (
                  <div className="tech-panel-group" key={group.label}>
                    {activeGroups.length > 1 && <h4 className="tech-panel-group-label">{group.label}</h4>}
                    <Stagger
                      className="tech-panel-grid"
                      stagger={.04}
                      style={{ '--tech-cols': Math.min(group.items.length, 3) } as CSSProperties}
                    >
                      {group.items.map((item) => (
                        <StaggerItem className="tech-card" key={item.src}>
                          <span className="tech-card-badge"><TechIcon name={item.name} /></span>
                          <div className="tech-card-body">
                            <strong>{item.name}</strong>
                            <span>{item.desc}</span>
                          </div>
                        </StaggerItem>
                      ))}
                    </Stagger>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Mobile: vertical spine, categories branch off alternating sides */}
        <div className="orbit-mobile">
          <div className="orbit-spine">
            {categories.map((c, i) => {
              const isOpen = active === c;
              return (
                <div className={'orbit-spine-item' + (isOpen ? ' open' : '')} key={c}>
                  <button
                    className="orbit-spine-node"
                    aria-expanded={isOpen}
                    onClick={() => selectIndex(i)}
                  >
                    <span className="orbit-spine-dot" aria-hidden="true" />
                    <span className="orbit-spine-label">{c}</span>
                    <span className="orbit-spine-toggle" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="orbit-spine-panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: .3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <ul>
                          {flatten(stack[c]).map((item) => (
                            <li key={item.src}>
                              <span className="tech-card-badge"><TechIcon name={item.name} /></span>
                              <div className="tech-card-body">
                                <strong>{item.name}</strong>
                                <span>{item.desc}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
