type ArrowIconProps = {
  className?: string;
};

export function ArrowIcon({ className = "" }: ArrowIconProps) {
  return (
    <svg
      className={`arrow-icon ${className}`.trim()}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M4 12h16M13 6l6 6-6 6" />
    </svg>
  );
}
