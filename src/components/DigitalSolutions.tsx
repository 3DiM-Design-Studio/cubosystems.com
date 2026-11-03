'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import SolutionVisual from './SolutionVisual';
import { solutions, stats } from '@/lib/content';

const panelTags: string[][] = [
  ['Agents', 'Orchestration', 'Guardrails'],
  ['LLMs', 'RAG', 'APIs'],
  ['Strategy', 'Modernisation', 'Digital Experience'],
  ['Workflow', 'Process', 'Automation'],
  ['Data', 'Analytics', 'Intelligence'],
  ['API', 'Cloud', 'Systems'],
];

// Company-wide figures from content.ts for now; swap in per-solution numbers
// here when real ones exist (one array per solution, same order as `solutions`).
const panelStats = solutions.map(() => stats.filter((s) => s.label !== 'Awards'));

// Photos fill the frame; the two isometric illustrations sit inside it instead.
const panelImages: { src: string; fit?: 'contain' }[] = [
  { src: '/media/y2sdbuba/1.jpg' },
  { src: '/media/04fdzbo3/2.jpg' },
  { src: '/media/55uiwvsw/businessman-go.png' },
  { src: '/media/gmpibigp/3.png', fit: 'contain' },
  { src: '/media/tiipy3eq/laptop.png', fit: 'contain' },
  { src: '/media/4ypgnwjk/culture-2.png' },
];

function Copy({ index }: { index: number }) {
  const s = solutions[index];
  return (
    <>
      <div>
        <h3 className="ds-title">
          {s.headline.split('*').map((part, i) => (i % 2 ? <u key={i}>{part}</u> : part))}
        </h3>
        <p className="ds-desc">{s.desc}</p>
        <div className="ds-tags">
          {panelTags[index].map((tag) => <span className="ds-tag" key={tag}>{tag}</span>)}
        </div>
      </div>
      <div className="ds-stats">
        {panelStats[index].map((st) => (
          <div className="ds-stat" key={st.label}>
            <b>{st.value}{st.suffix}</b>
            <span>{st.label}</span>
          </div>
        ))}
      </div>
      <div className="ds-image">
        <Image src={panelImages[index].src} alt="" fill sizes="(max-width: 980px) 100vw, 560px" style={panelImages[index].fit ? { objectFit: panelImages[index].fit, padding: 12 } : undefined} />
      </div>
    </>
  );
}

// Desktop: the left column is position:sticky and swaps its content as the
// right-hand visuals scroll past. Below 981px each visual carries its own
// copy block instead (.ds-mobile-copy) and the left column is hidden.
export default function DigitalSolutions() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="solutions" className="section ds-section">
      <div className="container ds-split">
        <div className="ds-left">
          {solutions.map((s, i) => (
            <div key={s.n} className={'ds-left-item' + (active === i ? ' is-active' : '')} aria-hidden={active !== i}>
              <Copy index={i} />
            </div>
          ))}
        </div>

        <div className="ds-right">
          {solutions.map((s, i) => (
            <div key={s.n} className="ds-right-item" data-index={i} ref={(el) => { itemRefs.current[i] = el; }}>
              <div className="ds-mobile-copy"><Copy index={i} /></div>
              <div className="ds-panel-visual">
                <SolutionVisual index={i} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
