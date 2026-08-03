import type { ReactNode } from "react";
import { SiteHeader } from "../SiteHeader";

type LandingHeroProps = {
  image: string;
  imageAlt: string;
  title: ReactNode;
  children: ReactNode;
  showHeader?: boolean;
  video?: { mp4: string; webm?: string; poster: string };
  animation?: boolean;
};

export function LandingHero({
  image,
  imageAlt,
  title,
  children,
  showHeader = true,
  video,
  animation = false,
}: LandingHeroProps) {
  return (
    <section data-block="landing-hero" className="hero hero--immersive">
      <div className="hero__media">
        {animation ? (
          /* Three.js sets width/height/data-engine on this canvas before
             hydration, which is exactly what suppressHydrationWarning is for. */
          <canvas
            className="hero__canvas"
            data-microcapsule
            aria-hidden="true"
            /* The renderer sizes this element and stamps its own attributes
               before hydration, so React never matches what it finds. */
            suppressHydrationWarning
          />
        ) : null}
        {video ? (
          <video
            className="hero__video"
            poster={video.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={imageAlt}
          >
            {video.webm ? <source src={video.webm} type="video/webm" /> : null}
            <source src={video.mp4} type="video/mp4" />
          </video>
        ) : (
          <img src={image} alt={imageAlt} />
        )}
      </div>
      {showHeader && <SiteHeader />}
      <div className="container hero__content">
        <div className="hero__copy">
          <h1 className="hero__title">{title}</h1>
          <div className="hero__intro">{children}</div>
        </div>
      </div>
    </section>
  );
}
