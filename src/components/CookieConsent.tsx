'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { usePrefersReducedMotion } from './useReducedMotion';

// Cookie consent: a small card bottom-left with Accept all / Reject all / Customise.
// The choice is stored in localStorage (and a first-party cookie, so a server could
// read it) and broadcast as a `cookie-consent` event. Nothing on the site sets
// analytics or marketing cookies yet; when you add any, load them only when
// getConsent()?.analytics / .marketing is true (or listen for the event).

export type Consent = { necessary: true; analytics: boolean; marketing: boolean; savedAt: string };
const KEY = 'cubo-cookie-consent-v1';
const OPEN_EVENT = 'open-cookie-settings';

export function getConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

function saveConsent(c: Omit<Consent, 'necessary' | 'savedAt'>) {
  const value: Consent = { necessary: true, ...c, savedAt: new Date().toISOString() };
  try {
    localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    /* storage blocked: the choice just won't persist */
  }
  document.cookie = `${KEY}=${c.analytics ? 'a' : ''}${c.marketing ? 'm' : ''}n; max-age=31536000; path=/; SameSite=Lax`;
  window.dispatchEvent(new CustomEvent('cookie-consent', { detail: value }));
}

const CATEGORIES = [
  { id: 'necessary', title: 'Strictly necessary', text: 'Keep the site working, such as remembering this choice. Always on.', locked: true },
  { id: 'analytics', title: 'Analytics', text: 'Help us understand how the site is used so we can improve it.' },
  { id: 'marketing', title: 'Marketing', text: 'Used to show relevant content and measure our campaigns.' },
] as const;

export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Cookie settings
    </button>
  );
}

export default function CookieConsent() {
  const reduced = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: false, marketing: false });

  useEffect(() => {
    // Read the saved choice after mount (localStorage isn't available during SSR).
    const existing = getConsent();
    const t = window.setTimeout(() => {
      if (existing) setPrefs({ analytics: existing.analytics, marketing: existing.marketing });
      else setOpen(true);
    }, existing ? 0 : 900);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const reopen = () => {
      const c = getConsent();
      if (c) setPrefs({ analytics: c.analytics, marketing: c.marketing });
      setCustom(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const decide = (c: { analytics: boolean; marketing: boolean }) => {
    saveConsent(c);
    setPrefs(c);
    setOpen(false);
    setCustom(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.section
          className="cookie"
          role="dialog"
          aria-label="Cookie preferences"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="cookie-head">
            <Cookie size={20} aria-hidden="true" />
            <h2>{custom ? 'Cookie preferences' : 'We use cookies'}</h2>
            {getConsent() && (
              <button type="button" className="cookie-close" aria-label="Close" onClick={() => { setOpen(false); setCustom(false); }}>
                <X size={18} />
              </button>
            )}
          </div>

          {!custom ? (
            <>
              <p>We use cookies to keep the site working and, with your permission, to understand how it’s used and improve it. You can change your choice at any time.</p>
              <div className="cookie-actions">
                <button type="button" className="cookie-btn cookie-btn--primary" onClick={() => decide({ analytics: true, marketing: true })}>Accept all</button>
                <button type="button" className="cookie-btn" onClick={() => decide({ analytics: false, marketing: false })}>Reject all</button>
                <button type="button" className="cookie-link" onClick={() => setCustom(true)}>Customise</button>
              </div>
            </>
          ) : (
            <>
              <ul className="cookie-cats">
                {CATEGORIES.map((c) => (
                  <li key={c.id}>
                    <div>
                      <strong>{c.title}</strong>
                      <span>{c.text}</span>
                    </div>
                    <label className="cookie-switch">
                      <input
                        type="checkbox"
                        role="switch"
                        aria-label={c.title}
                        checked={'locked' in c ? true : prefs[c.id as 'analytics' | 'marketing']}
                        disabled={'locked' in c}
                        onChange={(e) => setPrefs((p) => ({ ...p, [c.id]: e.target.checked }))}
                      />
                      <span aria-hidden="true" />
                    </label>
                  </li>
                ))}
              </ul>
              <div className="cookie-actions">
                <button type="button" className="cookie-btn cookie-btn--primary" onClick={() => decide(prefs)}>Save preferences</button>
                <button type="button" className="cookie-btn" onClick={() => decide({ analytics: true, marketing: true })}>Accept all</button>
              </div>
            </>
          )}
        </motion.section>
      )}
    </AnimatePresence>
  );
}
