import Reveal, { Stagger, StaggerItem } from './Reveal';
import CountUp from './CountUp';
import StatIcon from './StatIcon';
import { whyCubo, stats } from '@/lib/content';

export default function Proof() {
  return (
    <>
      <section className="section why">
        <div className="container split">
          <Reveal variant="left">
            <h2>Engineering with business <em className="accent">impact</em>.</h2>
          </Reveal>
          <Stagger as="ul" stagger={.06}>
            {whyCubo.map((item) => (
              <StaggerItem as="li" key={item.n}><b>{item.n}</b> {item.label}</StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <section className="stats">
        <Stagger className="stats-grid container" stagger={.1}>
          {stats.map((s) => (
            <StaggerItem className="stat-card" variant="scale" key={s.label}>
              <StatIcon label={s.label} />
              <CountUp value={s.value} suffix={s.suffix} />
              <span>{s.label}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  );
}
