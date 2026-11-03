'use client';

import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from './Reveal';
import { ArrowRight, Check } from 'lucide-react';

type Status = 'idle' | 'sending' | 'success' | 'error';

function Field({ id, label, type = 'text', required = false, autoComplete }: { id: string; label: string; type?: string; required?: boolean; autoComplete?: string }) {
  return (
    <div className="field">
      <input id={id} name={id} type={type} required={required} autoComplete={autoComplete} placeholder=" " />
      <label htmlFor={id}>{label}{required && <span className="field-required" aria-hidden="true"> *</span>}</label>
    </div>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
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
    <>
      <section className="cta">
        <Reveal variant="scale" className="container">
          <h2>Have a challenge worth solving?</h2>
          <p>Let’s talk about how technology can move your business forward.</p>
          <a className="button light" href="#contact">Start a conversation <b><ArrowRight size={16} /></b></a>
        </Reveal>
      </section>
      <section id="contact" className="section contact">
        <div className="contact-dots" aria-hidden="true" />
        <div className="container split">
          <Reveal variant="left">
            <h2>Tell us what you’re building.</h2>
            <p className="lede">Tell us about your challenge, your next product, or the process you want to improve. We’ll help you find a practical way forward.</p>
          </Reveal>
          <Reveal variant="right" delay={.12} as="form" onSubmit={handleSubmit} noValidate>
            <Field id="name" label="Name" required autoComplete="name" />
            <Field id="email" label="Work email" type="email" required autoComplete="email" />
            <Field id="phone" label="Phone" type="tel" autoComplete="tel" />
            <Field id="company" label="Company" autoComplete="organization" />
            <div className="field field-textarea">
              <textarea id="message" name="message" required rows={4} placeholder=" " />
              <label htmlFor="message">How can we help?<span className="field-required" aria-hidden="true"> *</span></label>
            </div>
            <button className="button" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'} <b><ArrowRight size={16} /></b>
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
                    Something went wrong. Please try again or email us directly.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
