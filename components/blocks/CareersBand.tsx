import { ButtonLink } from "../ui/ButtonLink";
import { MediaCutout } from "../ui/MediaCutout";

type CareersBandProps = {
  id: string;
  image: string;
  imageAlt: string;
  title: string;
  href: string;
  actionLabel: string;
  /* Which edge the heading sits against, over the media. */
  align?: "start" | "end";
};

export function CareersBand({
  id,
  image,
  imageAlt,
  title,
  href,
  actionLabel,
  align = "end",
}: CareersBandProps) {
  return (
    <section
      data-block="careers-band"
      className="careers-band"
      id={id}
      data-reveal-target
      data-reveal="pending"
      suppressHydrationWarning
    >
      <MediaCutout
        className="careers-band__media"
        image={image}
        imageAlt={imageAlt}
      >
        <ButtonLink href={href}>{actionLabel}</ButtonLink>
      </MediaCutout>
      <div className={`careers-band__copy careers-band__copy--${align}`}>
        <h2 className="careers-band__title">{title}</h2>
      </div>
    </section>
  );
}
