import type { ReactNode } from "react";

export function FactFeature({
  image,
  imageAlt,
  quote,
  intro,
  statistic,
  map,
}: {
  image: string;
  imageAlt: string;
  quote: string;
  intro: ReactNode;
  statistic: ReactNode;
  map?: string;
}) {
  return (
    <section
      data-block="fact-feature"
      className="fact-feature page-section container"
      data-reveal-target
      data-reveal="pending"
    >
      <div className="fact-feature__media">
        <img src={image} alt={imageAlt} />
        <div className="fact-feature__quote cutout-action">
          <blockquote>{quote}</blockquote>
        </div>
      </div>
      <div className="fact-feature__copy">
        <p>{intro}</p>
        {map ? <img className="fact-feature__map" src={map} alt="" /> : null}
        <p>
          <strong>{statistic}</strong>
        </p>
      </div>
    </section>
  );
}
