import type { ReactNode } from "react";

export type MediaBannerSlide = {
  image: string;
  imageAlt: string;
  content?: ReactNode;
};

type MediaBannerProps = {
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  title?: ReactNode;
  label?: string;
  slides?: MediaBannerSlide[];
};

export function MediaBanner({
  image = "",
  imageAlt = "",
  children,
  title,
  label,
  slides,
}: MediaBannerProps) {
  const items = slides?.length
    ? slides
    : [{ image, imageAlt, content: children }];
  const interactive = items.length > 1;

  return (
    <section
      data-block="media-banner"
      className="media-banner page-section container"
      data-reveal-target
      data-reveal="pending"
      suppressHydrationWarning
      data-media-banner={interactive ? "true" : undefined}
    >
      {title ? <h2 className="section-heading">{title}</h2> : null}
      <div
        className="media-banner__frame"
        role={interactive ? "group" : undefined}
        aria-label={interactive ? "Media slider" : undefined}
        tabIndex={interactive ? 0 : undefined}
        data-banner-frame
      >
        {items.map((slide, index) => (
          <div
            className={`media-banner__slide${index === 0 ? " is-active" : ""}`}
            aria-hidden={index !== 0}
            data-banner-slide
            key={`${slide.image}-${index}`}
          >
            <img src={slide.image} alt={slide.imageAlt} />
            {label ? (
              <span className="media-banner__label">{label}</span>
            ) : null}
            {slide.content ? (
              <div className="media-banner__copy">{slide.content}</div>
            ) : null}
          </div>
        ))}
      </div>
      {interactive ? (
        <div className="media-banner__indicators" aria-label="Choose a slide">
          {items.map((slide, index) => (
            <button
              className={index === 0 ? "is-active" : ""}
              type="button"
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`View slide ${index + 1}`}
              data-banner-dot
              key={`${slide.image}-${index}`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
