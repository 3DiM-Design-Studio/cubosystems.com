'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Database, Scale, Mail, UserCheck, Sparkles, Check, Eye, Ban, CalendarDays, MessageSquare, Terminal, Banknote, FolderOpen, Folder, FileText, FileSpreadsheet, FileImage, FileType } from 'lucide-react';
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

// Guardrails, using OpenClaw as the example agent: it reaches for each tool in turn; some are allowed, some read-only, some need approval, some are blocked.
// Geometry and timing come from the 10s loop in site.css (.pb-*): s/e = packet start/arrival as a fraction of the loop.
const PERMS = [
  { key: 'cal', label: 'Calendar', sub: 'Allowed', icon: CalendarDays, status: Check, x: 0, y: 6, blocked: false, a: 0 },
  { key: 'crm', label: 'Files', sub: 'Read-only', icon: FolderOpen, status: Eye, x: 0, y: 83, blocked: false, a: 2 },
  { key: 'mail', label: 'Email', sub: 'Needs approval', icon: Mail, status: UserCheck, x: 0, y: 160, blocked: false, a: 4 },
  { key: 'inv', label: 'Messages', sub: 'Needs approval', icon: MessageSquare, status: UserCheck, x: 276, y: 6, blocked: false, a: 5 },
  { key: 'pay', label: 'Shell', sub: 'Blocked', icon: Terminal, status: Ban, x: 276, y: 83, blocked: true, a: 1 },
  { key: 'db', label: 'Payments', sub: 'Blocked', icon: Banknote, status: Ban, x: 276, y: 160, blocked: true, a: 3 },
];
const REACH = [
  { key: 'cal', i: 0, s: 0.04, e: 0.12, edge: 'M190 100C155 100 135 23 104 23', move: 'M190 100C155 100 135 23 104 23', end: null },
  { key: 'pay', i: 1, s: 0.19, e: 0.27, edge: 'M190 100C225 100 245 100 276 100', move: 'M190 100C211.7 100 227.6 100 244 100', end: { x: 244, y: 100 } },
  { key: 'crm', i: 2, s: 0.34, e: 0.42, edge: 'M190 100C155 100 135 100 104 100', move: 'M190 100C155 100 135 100 104 100', end: null },
  { key: 'db', i: 3, s: 0.49, e: 0.57, edge: 'M190 100C225 100 245 177 276 177', move: 'M190 100C211.7 100 227.6 129.6 244 152.1', end: { x: 244, y: 152.1 } },
  { key: 'mail', i: 4, s: 0.64, e: 0.72, edge: 'M190 100C155 100 135 177 104 177', move: 'M190 100C155 100 135 177 104 177', end: null },
  { key: 'inv', i: 5, s: 0.79, e: 0.87, edge: 'M190 100C225 100 245 23 276 23', move: 'M190 100C225 100 245 23 276 23', end: null },
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
  flow: <RiveCard src="/media/genai/workflow.riv" />,
  shield: (
    <div className="gm gm-perm">
      <svg viewBox="0 0 380 200" fill="none" role="presentation">
        {REACH.map(({ key, edge }) => <path key={key} className="pb-edge" d={edge} />)}
        <circle className="pb-ring" cx="190" cy="100" r="22" />
        <circle cx="190" cy="100" r="20" fill="#111" />
        <Sparkles x={181} y={91} size={18} color="#fff" strokeWidth={1.8} />
        <text x="190" y="137" textAnchor="middle" className="pb-name">OpenClaw</text>
        <text x="190" y="148" textAnchor="middle" className="pb-sub">AI agent</text>
        {PERMS.map(({ key, label, sub, icon: Icon, status: Status, x, y, blocked, a }) => (
          <g key={key} className={'pb-chip pbc' + a + (blocked ? ' is-blocked' : '')}>
            <rect x={x} y={y} width="104" height="34" rx="9" />
            <Icon x={x + 9} y={y + 11} size={12} strokeWidth={2} />
            <text x={x + 27} y={y + 15} className="pb-name">{label}</text>
            <text x={x + 27} y={y + 26} className="pb-sub">{sub}</text>
            <Status x={x + 86} y={y + 11} size={12} strokeWidth={2.2} />
          </g>
        ))}
        {REACH.map(({ key, i, s, e, move, end }) => (
          <g key={key}>
            <circle className="pb-packet" r="4">
              <animateMotion dur="10s" repeatCount="indefinite" calcMode="linear" keyPoints="0;0;1;1" keyTimes={`0;${s};${e};1`} path={move} />
              <animate attributeName="opacity" dur="10s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes={`0;${s};${s + 0.005};${e};${e + 0.01};1`} />
            </circle>
            {end && (
              <g transform={`translate(${end.x} ${end.y})`}>
                <g className={'pb-mk pbm' + i}><circle r="8" /><path d="M-3 -3L3 3M3 -3L-3 3" /></g>
              </g>
            )}
          </g>
        ))}
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
              <div className={'genai-motion' + (motion === 'chat' || motion === 'flow' ? ' is-rive' : motion === 'docs' ? ' is-tree' : motion === 'shield' ? ' is-guard' : '')} aria-hidden="true">{MOTIONS[motion]}</div>
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
