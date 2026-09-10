'use client';

import { useState } from 'react';
import Reveal from './Reveal';
import Carousel, { type CarouselItem } from './Carousel';
import { process } from '@/lib/content';
import { useMediaQuery } from './useMediaQuery';

const ICONS: Record<number, string> = {
  0: 'M12 3a9 9 0 1 0 9 9 M12 3v9l6 3',
  1: 'M4 6h16M4 12h10M4 18h13',
  2: 'M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7h-7z M13 13h7v7h-7z',
  3: 'M8 9l-4 3 4 3 M16 9l4 3-4 3 M13 6l-2 12',
  4: 'M4 12l6 6L20 6',
};

const items: CarouselItem[] = process.map((step, i) => ({
  id: i,
  title: step.title,
  description: step.desc,
  tags: step.tags,
  icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[i]} />
    </svg>
  ),
}));

export default function Process() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = process[activeIndex];
  const isNarrow = useMediaQuery('(max-width: 480px)');
  const carouselWidth = isNarrow ? 320 : 460;

  return (
    <section id="process" className="section process">
      <div className="container process-layout">
        <Reveal>
          <p className="eyebrow orange">OUR APPROACH</p>
          <h2>From idea to <em className="accent">impact</em>.</h2>
          <p className="lede process-lede">A disciplined five-stage way of working — drag through the stages, or let each one speak for itself.</p>

          <div className="process-counter">
            <span className="process-counter-current">0{activeIndex + 1}</span>
            <span className="process-counter-total">/ 0{process.length}</span>
            <span className="process-counter-label">{activeStep.title}</span>
          </div>
        </Reveal>

        <div className="process-carousel-col">
          <Carousel items={items} baseWidth={carouselWidth} loop onActiveChange={setActiveIndex} />
        </div>
      </div>
    </section>
  );
}
