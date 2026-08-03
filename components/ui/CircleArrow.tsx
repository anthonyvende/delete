import { ArrowIcon } from "./ArrowIcon";

type CircleArrowProps = {
  className?: string;
};

export function CircleArrow({ className = "" }: CircleArrowProps) {
  return (
    <span
      className={`circle-arrow icon-circle ${className}`.trim()}
      aria-hidden="true"
    >
      <ArrowIcon />
    </span>
  );
}
