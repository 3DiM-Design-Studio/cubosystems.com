'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Database, Scale, Mail, UserCheck } from 'lucide-react';
import Reveal from './Reveal';
import { useMediaQuery } from './useMediaQuery';
import { usePrefersReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const capabilities = [
  { title: 'Copilots for your teams', desc: 'Assistants that answer questions and take action across your internal tools, with the context they need.' },
  { title: 'Knowledge & documents', desc: 'Search, summarise and extract from contracts, tickets and reports using retrieval over your own data.' },
  { title: 'Workflow automation', desc: 'Models that classify, route and draft inside your existing processes, so people focus on decisions.' },
  { title: 'Guardrails by design', desc: 'Access control, human approval and audit trails built in, so AI stays accountable.' },
];

const steps = [
  { icon: Database, text: 'Queried the finance system', done: true },
  { icon: Scale, text: 'Checked each supplier’s payment terms', done: true },
  { icon: Mail, text: 'Drafted reminder emails', done: true },
  { icon: UserCheck, text: 'Waiting for your approval', done: false },
];

export default function GenAI() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 981px)');
  const reduced = usePrefersReducedMotion();
  const pinned = isDesktop && !reduced;

  // Desktop: pin the section and scrub the track sideways until the last card
  // is in view, then release so the page scrolls on normally. Elsewhere the
  // track is a native horizontal scroller (see .genai-track in site.css).
  useGSAP(
    () => {
      const track = trackRef.current;
      if (!pinned || !track) return;
      const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
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
    <section id="ai" className={'section genai' + (pinned ? ' is-pinned' : '')} ref={sectionRef}>
      <div className="container">
        <Reveal className="genai-head">
          <h2>Put generative AI to work<br className="genai-br" /> <span className="orange">inside your systems</span>.</h2>
          <p className="lede">Not a chatbot bolted on the side. We connect models to your data, tools and processes, so AI does real work and your people stay in control.</p>
        </Reveal>
      </div>

      <div className="genai-viewport">
        <div className="genai-track" ref={trackRef}>
          {capabilities.map(({ title, desc }) => (
            <div key={title} className="genai-card">
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}

          <div className="genai-demo" aria-hidden="true">
            <div className="genai-demo-bar"><span className="genai-demo-dot" />Operations assistant</div>
            <p className="genai-demo-prompt">Which supplier invoices are overdue? Draft reminders.</p>
            <ul className="genai-steps">
              {steps.map(({ icon: Icon, text, done }) => (
                <li key={text} className={done ? 'is-done' : 'is-pending'}>
                  <Icon size={16} />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
