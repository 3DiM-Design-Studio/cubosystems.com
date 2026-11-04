'use client';

import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ArrowUpRight, Mail, Phone, MapPin, CalendarClock, Link2 } from 'lucide-react';
import Reveal from './Reveal';
import { services, contactBlocks } from '@/lib/content';

type Status = 'idle' | 'sending' | 'success' | 'error';

const ICONS = { mail: Mail, phone: Phone, pin: MapPin, calendar: CalendarClock, link: Link2 };
const SERVICE_OPTIONS = [...services.map((s) => s.title), 'Other'];

function Field({ id, label, type = 'text', required = false, autoComplete, placeholder, half = false }: { id: string; label: string; type?: string; required?: boolean; autoComplete?: string; placeholder?: string; half?: boolean }) {
  return (
    <div className={'field' + (half ? ' field-half' : '')}>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} type={type} required={required} autoComplete={autoComplete} placeholder={placeholder} />
    </div>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = { ...Object.fromEntries(fd.entries()), services: fd.getAll('services') };
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Request failed');
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <Reveal className="contact-head">
          <h2>Tell us what you’re building.</h2>
          <p className="lede">Tell us about your challenge, your next product, or the process you want to improve. We’ll help you find a practical way forward.</p>
        </Reveal>

        <div className="contact-grid">
          <Reveal as="form" onSubmit={handleSubmit} noValidate className="contact-form">
            <Field id="firstName" label="First name" placeholder="First name" required autoComplete="given-name" half />
            <Field id="lastName" label="Last name" placeholder="Last name" autoComplete="family-name" half />
            <Field id="email" label="Email" type="email" placeholder="you@company.com" required autoComplete="email" />
            <Field id="phone" label="Phone number" type="tel" placeholder="+1 (555) 000-0000" autoComplete="tel" />
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" required rows={5} placeholder="Leave us a message…" />
            </div>
            <fieldset className="field contact-services">
              <legend>Services</legend>
              <div className="contact-services-grid">
                {SERVICE_OPTIONS.map((o) => (
                  <label className="check" key={o}>
                    <input type="checkbox" name="services" value={o} />
                    <span>{o}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <button className="contact-submit" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
            <div className="form-status-slot" aria-live="polite">
              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.p key="success" className="form-status success" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <Check size={16} aria-hidden="true" /> Message sent — we’ll be in touch soon.
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p key="error" className="form-status error" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    Something went wrong. Please try again or reach out another way.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          <Reveal delay={.12} className="contact-info">
            {contactBlocks.filter((b) => b.links.length > 0).map((b) => {
              const Icon = ICONS[b.icon];
              return (
              <div className="contact-block" key={b.title}>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
                <ul className={b.icon === 'link' ? 'is-inline' : undefined}>
                  {b.links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"><Icon size={17} aria-hidden="true" />{l.label}{b.icon === 'link' && <ArrowUpRight size={15} aria-hidden="true" />}</a>
                    </li>
                  ))}
                </ul>
              </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
