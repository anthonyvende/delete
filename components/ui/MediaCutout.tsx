import type { ReactNode } from "react";

type MediaCutoutProps = {
  image: string;
  imageAlt: string;
  children: ReactNode;
  className?: string;
};

export function MediaCutout({
  image,
  imageAlt,
  children,
  className = "",
}: MediaCutoutProps) {
  return (
    <div className={`media-cutout ${className}`.trim()}>
      <img className="media-cutout__image" src={image} alt={imageAlt} />
      <div className="media-cutout__action cutout-action">{children}</div>
    </div>
  );
}
