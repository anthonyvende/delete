import type { ReactNode } from "react";
import { Eyebrow } from "../ui/Eyebrow";
import { PageBand } from "../ui/PageBand";

type InnerHeroProps = {
  eyebrow: string;
  title: ReactNode;
  image: string;
  imageAlt: string;
  intro: ReactNode;
  imagePosition?: string;
};

export function InnerHero({
  eyebrow,
  title,
  image,
  imageAlt,
  intro,
  imagePosition,
}: InnerHeroProps) {
  return (
    <section data-block="inner-hero" className="inner-hero">
      <div className="container inner-hero__grid">
        <PageBand />
        <div className="inner-hero__heading">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1>{title}</h1>
        </div>
        <div className="inner-hero__intro">{intro}</div>
        <div className="inner-hero__media">
          <img
            src={image}
            alt={imageAlt}
            style={
              imagePosition ? { objectPosition: imagePosition } : undefined
            }
          />
        </div>
      </div>
    </section>
  );
}
