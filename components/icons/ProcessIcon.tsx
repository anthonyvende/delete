export type ProcessIconName =
  "magnifier" | "target" | "antibody" | "test-tube" | "funnel" | "vial";

type ProcessIconProps = {
  name: ProcessIconName;
};

/* Manufacturing process icons: a teal outline carrying a navy detail, drawn on
   a shared 64 square so every card's icon optically matches the next. */
export function ProcessIcon({ name }: ProcessIconProps) {
  const shared = {
    className: "process-icon",
    viewBox: "0 0 64 64",
    fill: "none",
    "aria-hidden": true,
    focusable: "false",
  } as const;

  if (name === "magnifier") {
    return (
      <svg {...shared}>
        <circle
          cx="26"
          cy="26"
          r="17"
          stroke="var(--teal-bright)"
          strokeWidth="4"
        />
        <circle cx="26" cy="26" r="9.5" fill="var(--accent)" />
        <path
          d="M38.5 38.5 55 55"
          stroke="var(--teal-bright)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "target") {
    return (
      <svg {...shared}>
        <circle
          cx="28"
          cy="36"
          r="22"
          stroke="var(--teal-bright)"
          strokeWidth="3.5"
        />
        {/* The middle ring is broken where the arrow passes through it. */}
        <circle
          cx="28"
          cy="36"
          r="14"
          pathLength="100"
          strokeDasharray="80 20"
          stroke="var(--teal-bright)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="28" cy="36" r="6.5" fill="var(--accent)" />
        <path
          d="M28 36 54 11M54 11 45 12.5M54 11 52.5 21.5"
          stroke="var(--teal-bright)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "antibody") {
    return (
      <svg {...shared}>
        <path
          d="M32 57V32M32 32 19 17M32 32 45 17"
          stroke="var(--teal-bright)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 51V38M31 29.5 25.5 23M33 29.5 38.5 23"
          stroke="var(--accent)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* The two small antibodies the platform releases. */}
        <path
          d="M8 56v-6M8 50 4 45M8 50 12 45M56 56v-6M56 50 52 45M56 50 60 45"
          stroke="var(--accent)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "test-tube") {
    return (
      <svg {...shared}>
        <path d="M25.5 27v20a6.5 6.5 0 0 0 13 0V27Z" fill="var(--accent)" />
        <path
          d="M32 45v-5M32 40l-3.5-4M32 40l3.5-4M32 34v-4M32 30l-3-3.2M32 30l3-3.2"
          stroke="var(--surface)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23 14v33a9 9 0 0 0 18 0V14"
          stroke="var(--teal-bright)"
          strokeWidth="4"
        />
        <rect
          x="19.5"
          y="8"
          width="25"
          height="6.5"
          rx="3.25"
          stroke="var(--teal-bright)"
          strokeWidth="4"
        />
      </svg>
    );
  }

  if (name === "funnel") {
    return (
      <svg {...shared}>
        <path
          d="M8 11h48L37 33v11a5 5 0 0 1-10 0V33Z"
          stroke="var(--teal-bright)"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M22 26v-6M22 20l-4-4M22 20l4-4M38 26v-6M38 20l-4-4M38 20l4-4M31 31v-5M31 26l-3.5-3.5M31 26l3.5-3.5"
          stroke="var(--accent)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 51c3.5 4 5 6 5 8a5 5 0 0 1-10 0c0-2 1.5-4 5-8Z"
          fill="var(--accent)"
        />
      </svg>
    );
  }

  return (
    <svg {...shared}>
      <rect
        x="24"
        y="5"
        width="16"
        height="9"
        rx="3"
        stroke="var(--teal-bright)"
        strokeWidth="4"
      />
      <path
        d="M27 14v4a8 8 0 0 1-6 7.75A6 6 0 0 0 16.5 31.5v18A6.5 6.5 0 0 0 23 56h18a6.5 6.5 0 0 0 6.5-6.5v-18A6 6 0 0 0 43 25.75 8 8 0 0 1 37 18v-4"
        stroke="var(--teal-bright)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <rect x="23" y="30" width="18" height="16" rx="2" fill="var(--accent)" />
      <path
        d="M32 43v-5M32 38l-4-4.5M32 38l4-4.5"
        stroke="var(--surface)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
