'use client';

import Image from 'next/image';
import Reveal from './Reveal';
import { products } from '@/lib/content';

const logos = products.map((p) => ({ src: p.logo, alt: p.name }));

export default function Trust() {
  return (
    <Reveal as="section" className="trust">
      <div className="container trust-inner">
        <div className="marquee-row">
          <div className="marquee">
            <div className="marquee-track">
              {[...logos, ...logos, ...logos, ...logos, ...logos, ...logos].map((l, i) => (
                <span className="marquee-item" key={l.src + i}>
                  <Image src={l.src} alt={i < logos.length ? l.alt : ''} aria-hidden={i >= logos.length} width={180} height={46} style={{ width: 'auto', height: 'auto' }} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
