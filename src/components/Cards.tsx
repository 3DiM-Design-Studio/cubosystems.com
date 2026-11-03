'use client';

import { useState } from 'react';
import Reveal, { Stagger, StaggerItem } from './Reveal';
import ServiceIcon from './ServiceIcon';
import { services } from '@/lib/content';
import { ChevronRight } from 'lucide-react';

// Bento sizing: masonry columns. Col 1 = 01 (tall, spans rows 1-2). Col 2 =
// 02 and 03 stacked as two mediums. Col 3 = 05 (tall, spans rows 1-2). Row 3
// = 04 and 06 as two normal verticals closing the section. Placement is
// class-based (not inline style) so the responsive breakpoints in site.css
// can cleanly override it back to a plain single column on mobile.
const BENTO_PLACEMENT: Record<number, string> = {
  0: 'place-01', // tall, col 1
  1: 'place-02', // medium, col 2 top
  2: 'place-03', // medium, col 2 bottom
  4: 'place-05', // tall, col 3
  3: 'place-04', // vertical, row 3
  5: 'place-06', // vertical, row 3, wider
};

function ServiceCard({ index, n, title, desc, openMobile, setOpenMobile }: {
  index: number; n: string; title: string; desc: string;
  openMobile: string | null; setOpenMobile: (n: string | null) => void;
}) {
  const isOpen = openMobile === n;
  const placement = BENTO_PLACEMENT[index];

  return (
    <StaggerItem
      as="article"
      className={'service' + (placement ? ` service--${placement}` : '') + (isOpen ? ' is-open' : '')}
      key={n}
      onClick={() => setOpenMobile(isOpen ? null : n)}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      onKeyDown={(e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpenMobile(isOpen ? null : n); } }}
    >
      <div className="service-inner">
        <div className="service-row">
          <ServiceIcon index={index} />
          <ChevronRight className="service-chevron" size={18} aria-hidden="true" />
        </div>
        <h3>{title}</h3>
        <p className="service-desc">{desc}</p>
      </div>
    </StaggerItem>
  );
}

export default function Cards() {
  const [openMobile, setOpenMobile] = useState<string | null>(null);

  return (
    <section id="services" className="section muted">
      <div className="container">
        <Reveal>
          <h2>From business challenges<br />to <em className="accent">engineered</em> solutions.</h2>
        </Reveal>
        <Stagger className="cards" stagger={.07}>
          {services.map((s, i) => (
            <ServiceCard
              key={s.n}
              index={i}
              n={s.n}
              title={s.title}
              desc={s.desc}
              openMobile={openMobile}
              setOpenMobile={setOpenMobile}
            />
          ))}
          {['l1', 'l2', 'r1', 'r2'].map((g) => <div key={g} className={`ghost ghost-${g}`} aria-hidden="true" />)}
        </Stagger>
      </div>
    </section>
  );
}
