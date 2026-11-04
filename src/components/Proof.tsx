import Image from 'next/image';
import Reveal, { Stagger, StaggerItem } from './Reveal';
import CountUp from './CountUp';
import StatIcon from './StatIcon';
import { stats } from '@/lib/content';

// Mosaic: stat tiles and photo tiles interleaved on one grid. Placement per
// tile (m1..m9) lives in site.css.
const IMAGES = [
  '/media/proof/team-office.jpg',
  '/media/proof/award-handover.jpg',
  '/media/proof/team-outdoor-alt.jpg',
  '/media/hero/team-window-laptop.jpg',
  '/media/4ypgnwjk/culture-2.png',
];
type Tile = { kind: 'img'; src: string } | { kind: 'stat'; i: number };
// Entrance direction per tile (same order as TILES): tiles fly in from different sides.
const ENTER = ['left', 'up', 'scale', 'right', 'up', 'scale', 'left', 'up', 'right'] as const;
const TILES: Tile[] = [
  { kind: 'img', src: IMAGES[0] }, { kind: 'stat', i: 0 }, { kind: 'img', src: IMAGES[1] },
  { kind: 'stat', i: 1 }, { kind: 'img', src: IMAGES[2] }, { kind: 'stat', i: 2 },
  { kind: 'img', src: IMAGES[3] }, { kind: 'stat', i: 3 }, { kind: 'img', src: IMAGES[4] },
];

export default function Proof() {
  return (
    <section className="section why">
      <div className="container">
        <Reveal>
          <h2>Engineering with business <em className="accent">impact</em>.</h2>
        </Reveal>
        <Stagger className="mosaic" stagger={.11}>
          {TILES.map((t, n) => {
            const cls = `m${n + 1}`;
            if (t.kind === 'img') {
              return (
                <StaggerItem className={`mosaic-img ${cls}`} variant={ENTER[n]} key={n}>
                  <Image src={t.src} alt="" fill sizes="(max-width: 700px) 50vw, 30vw" />
                </StaggerItem>
              );
            }
            const s = stats[t.i];
            return (
              <StaggerItem className={`stat-card ${cls} stat-card--${t.i}`} variant={ENTER[n]} key={n}>
                <StatIcon label={s.label} />
                <CountUp value={s.value} suffix={s.suffix} />
                <span>{s.label}</span>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
      <div className="mosaic-line" aria-hidden="true" />
    </section>
  );
}
