import type { ReactNode } from "react";

type SplitContentProps = {
  id?: string;
  variant?: "story" | "standard" | "feature";
  image: string;
  imageAlt: string;
  imagePosition?: string;
  children: ReactNode;
  mediaFirst?: boolean;
  reverse?: boolean;
};

export function SplitContent({
  id,
  variant = "standard",
  image,
  imageAlt,
  imagePosition,
  children,
  mediaFirst = false,
  reverse = false,
}: SplitContentProps) {
  const media = (
    <div className="split-content__media">
      <img
        src={image}
        alt={imageAlt}
        style={imagePosition ? { objectPosition: imagePosition } : undefined}
      />
    </div>
  );
  const copy = <div className="split-content__copy">{children}</div>;

  return (
    <section
      data-block="split-content"
      id={id}
      data-reveal-target
      data-reveal="pending"
      suppressHydrationWarning
      className={`split-content split-content--${variant}${reverse ? " split-content--reverse" : ""}`}
    >
      <div className="container split-content__grid">
        {mediaFirst ? media : copy}
        {mediaFirst ? copy : media}
      </div>
    </section>
  );
}
