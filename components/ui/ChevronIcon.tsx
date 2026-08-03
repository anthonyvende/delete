type ChevronIconProps = {
  className?: string;
};

export function ChevronIcon({ className = "" }: ChevronIconProps) {
  return (
    <svg
      className={`chevron-icon ${className}`.trim()}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
