import type { ReactNode } from "react";
import { ButtonLink } from "../ui/ButtonLink";
import { Eyebrow } from "../ui/Eyebrow";
import { MediaAction } from "../ui/MediaAction";
import { MediaCutout } from "../ui/MediaCutout";

export type ImageTextBandLayout =
  "copy-media-cutout" | "media-note-copy" | "copy-note-media" | "media-copy";

type ImageTextBandProps = {
  id: string;
  layout: ImageTextBandLayout;
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  image: string;
  imageAlt: string;
  action: { href: string; label: string };
  mediaAction?: { href: string; label: string };
  note?: { title: string; copy: string };
};

export function ImageTextBand({
  id,
  layout,
  eyebrow,
  title,
  children,
  image,
  imageAlt,
  action,
  mediaAction,
  note,
}: ImageTextBandProps) {
  const copy = (
    <div className="image-text-band__copy">
      <div className="image-text-band__heading">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="image-text-band__title">{title}</h2>
      </div>
      <div className="image-text-band__body">
        <p className="lead">{children}</p>
        <ButtonLink href={action.href}>{action.label}</ButtonLink>
      </div>
    </div>
  );
  const media = mediaAction ? (
    <MediaCutout
      className="image-text-band__media"
      image={image}
      imageAlt={imageAlt}
    >
      <MediaAction href={mediaAction.href}>{mediaAction.label}</MediaAction>
    </MediaCutout>
  ) : (
    <div className="image-text-band__media">
      <img src={image} alt={imageAlt} />
      {note ? (
        <div className="image-text-band__note">
          <div className="image-text-band__note-card surface-card">
            <h3 className="image-text-band__note-title">{note.title}</h3>
            <p className="image-text-band__note-copy">{note.copy}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
  const mediaFirst = layout === "media-note-copy" || layout === "media-copy";

  return (
    <section
      data-block="image-text-band"
      data-reveal-target
      data-reveal="pending"
      className={`image-text-band image-text-band--${layout}`}
      id={id}
    >
      {mediaFirst ? media : copy}
      {mediaFirst ? copy : media}
    </section>
  );
}
