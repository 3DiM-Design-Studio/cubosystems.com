import Image from 'next/image';
import Reveal from './Reveal';
import { ArrowRight, ArrowUpRight, Mail, Phone, MapPin, CalendarClock } from 'lucide-react';
import { FaLinkedinIn, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { footerGroups, socialLinks, products } from '@/lib/content';
import { CookieSettingsLink } from './CookieConsent';

// lucide dropped its brand logos, so these come from react-icons (as the tech logos do).
const CONTACT_ICONS = { mail: Mail, phone: Phone, pin: MapPin, calendar: CalendarClock } as const;
const SOCIAL_ICONS: Record<string, React.ComponentType<{ size?: number }>> = { LinkedIn: FaLinkedinIn, Instagram: FaInstagram, Facebook: FaFacebookF };

// The final CTA and the footer are one dark block: link columns plus the CTA on
// top, an oversized wordmark and cube behind, and a mono credit line at the bottom.
export default function Footer() {
  return (
    <Reveal as="footer" className="site-footer">
      <div className="footer-cta container">
        <p>Ready to move your business <em>forward?</em></p>
        <a className="button footer-cta-btn" href="#contact">Let’s Talk <b><ArrowRight size={16} /></b></a>
      </div>

      <div className="footer-top container">
        <div className="footer-cols">
          {footerGroups.map((g) => (
            <nav className="footer-col" key={g.title} aria-label={g.title}>
              <h4>{g.title}</h4>
              <ul>
                {g.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className={[l.gradient ? 'has-gradient' : '', l.icon && l.icon !== 'link' ? 'has-icon' : ''].filter(Boolean).join(' ') || undefined}>
                      {l.icon && l.icon !== 'link' && (() => { const Icon = CONTACT_ICONS[l.icon]; return <Icon size={17} aria-hidden="true" />; })()}
                      {l.gradient ? <span className="gradient-text">{l.label}</span> : l.label}
                    </a>
                  </li>
                ))}
              </ul>
              {g.title === 'Contact' && (
                <div className="footer-social">
                  {socialLinks.map((l) => {
                    const Icon = SOCIAL_ICONS[l.label];
                    return Icon ? (
                      <a key={l.label} href={l.href} target="_blank" rel="noreferrer" aria-label={l.label} title={l.label}><Icon size={20} /></a>
                    ) : null;
                  })}
                </div>
              )}
            </nav>
          ))}
        </div>
      </div>

      <div className="footer-products container">
        <h4>Our products</h4>
        <ul className="footer-products-panel">
          {products.map((p) => (
            <li key={p.name}>
              <Image src={p.logo} alt={p.name} width={140} height={36} />
              <div className="footer-product-info">
              <p>{p.desc}</p>
              <a className="footer-visit" href={p.href} {...(p.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>
                Visit <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer-mark" aria-hidden="true">
        <span className="footer-wordmark">Cubo</span>
        <svg className="footer-cube" viewBox="0 0 100 114" fill="none" stroke="currentColor" strokeWidth="9" strokeLinejoin="round">
          <path d="M50 5 94 30v54L50 109 6 84V30Z" />
          <path d="M6 30l44 25 44-25M50 55v54" />
        </svg>
      </div>

      <div className="footer-bar container">
        <span>© 2026 Cubo Systems. All rights reserved.</span>
        <CookieSettingsLink className="footer-cookie" />
        <span>Designed with passion by <a href="https://3dim.io" target="_blank" rel="noreferrer">3DiM.io</a></span>
      </div>
    </Reveal>
  );
}
