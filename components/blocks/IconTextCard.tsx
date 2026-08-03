import type { ReactNode } from "react";

type IconTextCardProps = {
  title?: string;
  children: ReactNode;
  icon?: string;
  symbol?: ReactNode;
  className?: string;
};

export function IconTextCard({
  title,
  children,
  icon,
  symbol,
  className = "",
}: IconTextCardProps) {
  return (
    <article className={`icon-text-card surface-card ${className}`.trim()}>
      <span className="icon-text-card__icon" aria-hidden="true">
        {icon ? <img src={icon} alt="" /> : symbol}
      </span>
      <div className="icon-text-card__copy">
        {title ? <h3 className="icon-text-card__title">{title}</h3> : null}
        {children}
      </div>
    </article>
  );
}
