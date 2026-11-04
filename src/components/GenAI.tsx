'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Database, Scale, Mail, UserCheck, FolderOpen, Folder, FileText, FileSpreadsheet, FileImage, FileType } from 'lucide-react';
import { RiOpenaiFill, RiClaudeFill } from 'react-icons/ri';
import Reveal from './Reveal';
import RiveCard from './RiveCard';
import { useMediaQuery } from './useMediaQuery';
import { usePrefersReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Motion = 'chat' | 'docs' | 'flow' | 'shield';
const capabilities: { title: string; desc: string; motion: Motion }[] = [
  { motion: 'chat', title: 'Copilots for your teams', desc: 'Assistants that answer questions and act across your internal tools.' },
  { motion: 'docs', title: 'Knowledge & documents', desc: 'Search, summarise and extract from contracts and reports over your own data.' },
  { motion: 'flow', title: 'Workflow automation', desc: 'Models that classify, route and draft inside your processes.' },
  { motion: 'shield', title: 'Guardrails by design', desc: 'Access control, human approval and audit trails built in, so AI stays accountable.' },
];

// Nested folder tree for the Knowledge card; the agent walks every row in turn (--s): folders light up, files get analysed.
type Node = { name: string; icon: typeof Folder; depth: number; last?: boolean; rail?: boolean; out?: string };
const TREE: Node[] = [
  { name: 'Contracts', icon: FolderOpen, depth: 0 },
  { name: 'Vendors', icon: FolderOpen, depth: 1 },
  { name: 'nda-acme.pdf', icon: FileText, depth: 2, rail: true, out: '3 key clauses · 1 risk flagged' },
  { name: 'supplier-msa.docx', icon: FileType, depth: 2, last: true, rail: true, out: 'Renewal date: 14 Mar 2027' },
  { name: 'policy-handbook.pdf', icon: FileText, depth: 1, last: true, out: 'Updated 9 Jan · no conflicts' },
  { name: 'Finance', icon: FolderOpen, depth: 0 },
  { name: 'Reports', icon: FolderOpen, depth: 1, last: true },
  { name: 'q3-forecast.xlsx', icon: FileSpreadsheet, depth: 2, out: 'Revenue up 12% vs Q2' },
  { name: 'site-photos.png', icon: FileImage, depth: 2, last: true, out: '14 photos · 2 need review' },
];

// Looping CSS/SVG animations, one per capability card (styles: .gm-* in site.css).
const MOTIONS: Record<Motion, React.ReactNode> = {
  chat: <RiveCard src="/media/genai/copilot.riv" />,
  docs: (
    <div className="gm gm-docs">
      {TREE.map(({ name, icon: Icon, depth, last, rail, out }, i) => (
        <span key={name} className={'gm-row d' + depth + (last ? ' last' : '') + (out ? ' file' : ' dir')} style={{ '--s': i } as React.CSSProperties}>
          {rail && <i className="gm-trunk" />}
          <Icon size={14} />
          <span className="gm-txt">
            <em>{name}</em>
            {out && (
              <span className="gm-status">
                <RiOpenaiFill size={14} className="gpt" />
                <RiClaudeFill size={14} className="claude" />
                <i className="a">Analyzing document…</i>
                <i className="b">{out}</i>
              </span>
            )}
          </span>
        </span>
      ))}
    </div>
  ),
  flow: (
    <div className="gm gm-flow">
      <span className="gm-rail" />
      <span className="gm-packet" />
      <span className="gm-node" /><span className="gm-node" /><span className="gm-node" /><span className="gm-node" />
    </div>
  ),
  shield: (
    <div className="gm gm-shield">
      <span className="gm-ring" /><span className="gm-ring" />
      <svg viewBox="0 0 100 114" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path className="gm-shield-body" d="M50 6 90 20v34c0 27-17 45-40 54C27 99 10 81 10 54V20Z" />
        <path className="gm-check" d="M32 57l13 13 24-27" />
      </svg>
    </div>
  ),
};

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
          {capabilities.map(({ title, desc, motion }) => (
            <div key={title} className="genai-card">
              <div className={'genai-motion' + (motion === 'chat' ? ' is-rive' : motion === 'docs' ? ' is-tree' : '')} aria-hidden="true">{MOTIONS[motion]}</div>
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
