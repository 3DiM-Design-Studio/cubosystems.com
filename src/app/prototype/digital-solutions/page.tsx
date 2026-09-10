import DigitalSolutionsPrototype from '@/components/prototype/DigitalSolutionsPrototype';

export const metadata = {
  title: 'Prototype — Digital Solutions',
  robots: { index: false, follow: false },
};

export default function DigitalSolutionsPrototypePage() {
  return (
    <div className="ds-proto-page">
      <section className="ds-fake-section">
        <div className="container">
          <p className="eyebrow">ABOUT CUBO</p>
          <h2>We build technology that businesses actually rely on.</h2>
          <p>
            This placeholder section stands in for whatever precedes Digital Solutions on the real
            page, so the transition into the prototype feels like part of a normal scroll — not an
            isolated demo dropped on a blank canvas.
          </p>
        </div>
      </section>

      <DigitalSolutionsPrototype />

      <section className="ds-fake-section dark">
        <div className="container">
          <p className="eyebrow">OUR APPROACH</p>
          <h2>A placeholder for whatever comes next.</h2>
          <p>
            This section exists only to show how Digital Solutions hands off to the following part
            of the page. It is not part of the prototype brief.
          </p>
        </div>
      </section>
    </div>
  );
}
