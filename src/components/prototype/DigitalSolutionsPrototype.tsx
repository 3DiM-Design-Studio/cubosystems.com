'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './digital-solutions.css';
import { DashboardVisual, WorkflowVisual, DataVisual, IntegrationVisual } from './PanelVisuals';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Solution = {
  n: string;
  title: string;
  desc: string;
  tags: string[];
  visual: React.ReactNode;
};

const solutions: Solution[] = [
  {
    n: '01',
    title: 'Business Transformation',
    desc: 'Modernise systems, processes and experiences to create a stronger digital foundation.',
    tags: ['Strategy', 'Modernisation', 'Digital Experience'],
    visual: <DashboardVisual />,
  },
  {
    n: '02',
    title: 'Automation',
    desc: 'Streamline repetitive processes and connect workflows through intelligent automation.',
    tags: ['Workflow', 'Process', 'Automation'],
    visual: <WorkflowVisual />,
  },
  {
    n: '03',
    title: 'Data & Intelligence',
    desc: 'Turn business data into useful insights, smarter decisions and intelligent experiences.',
    tags: ['Data', 'Analytics', 'Intelligence'],
    visual: <DataVisual />,
  },
  {
    n: '04',
    title: 'Integration',
    desc: 'Connect platforms, APIs, cloud systems and business tools into one connected ecosystem.',
    tags: ['API', 'Cloud', 'Systems'],
    visual: <IntegrationVisual />,
  },
];

function Panel({ solution, index, onActive }: { solution: Solution; index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-42% 0px -42% 0px' });

  if (inView) onActive(index);

  return (
    <div className="ds-panel-wrap">
      <motion.div
        ref={ref}
        className={'ds-panel' + (inView ? ' is-active' : '')}
        initial={{ opacity: 0, y: 48, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div className="ds-panel-glow" aria-hidden="true" />

        <div className="ds-panel-left">
          <motion.div
            className="ds-panel-num"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
          >
            <span className="ds-panel-num-big">{solution.n}</span>
            <span className="ds-panel-num-total">/ 04</span>
          </motion.div>

          <motion.h3
            className="ds-panel-title"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
          >
            {solution.title}
          </motion.h3>

          <motion.p
            className="ds-panel-desc"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.22 }}
          >
            {solution.desc}
          </motion.p>

          <motion.div
            className="ds-panel-tags"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
          >
            {solution.tags.map((tag) => (
              <span className="ds-panel-tag" key={tag}>{tag}</span>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="ds-panel-visual"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
        >
          {solution.visual}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function DigitalSolutionsPrototype() {
  const [active, setActive] = useState(0);

  return (
    <section className="ds-proto" id="digital-solutions-prototype">
      <div className="ds-dev-indicator">
        ACTIVE SOLUTION
        <span className="ds-dev-count"><b>{solutions[active].n}</b> / 04</span>
        <span className="ds-dev-dots">
          {solutions.map((s, i) => (
            <span key={s.n} className={'ds-dev-dot' + (i === active ? ' active' : '')} />
          ))}
        </span>
      </div>

      <div className="container ds-intro">
        <p className="eyebrow">DIGITAL SOLUTIONS</p>
        <h2>Technology that creates real impact.</h2>
      </div>

      <div className="container ds-stack">
        {solutions.map((s, i) => (
          <Panel key={s.n} solution={s} index={i} onActive={setActive} />
        ))}
      </div>
    </section>
  );
}
