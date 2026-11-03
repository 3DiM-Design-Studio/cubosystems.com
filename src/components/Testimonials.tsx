'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from './Reveal';
import { testimonials } from '@/lib/content';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const { name, quote } = testimonials[index];

  const go = (next: number) => {
    setDir(next > index || (index === testimonials.length - 1 && next === 0) ? 1 : -1);
    setIndex(next);
  };

  return (
    <section id="testimonials" className="section testimonials">
      <div className="container">
        <Reveal>
          <h2>Built on <em className="accent">trusted</em> partnerships.</h2>
        </Reveal>
        <Reveal delay={.1} className="quote">
          <span className="quote-mark" aria-hidden="true">“</span>
          <div className="quote-body">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: dir * 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -dir * 32 }}
                transition={{ duration: .45, ease: [0.16, 1, 0.3, 1] }}
              >
                <blockquote>{quote}</blockquote>
                <p className="quote-attribution">{name}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="quote-controls">
            <button onClick={() => go((index - 1 + testimonials.length) % testimonials.length)} aria-label="Previous testimonial"><ArrowLeft size={18} /></button>
            <div className="quote-progress" role="progressbar" aria-valuenow={index + 1} aria-valuemin={1} aria-valuemax={testimonials.length}>
              {testimonials.map((_, i) => (
                <span key={i} className={'quote-dot' + (i === index ? ' active' : '')} />
              ))}
            </div>
            <button onClick={() => go((index + 1) % testimonials.length)} aria-label="Next testimonial"><ArrowRight size={18} /></button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
