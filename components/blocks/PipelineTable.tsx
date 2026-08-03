import type { CSSProperties } from "react";

export type PipelineStudy = {
  label: string;
  progress: number;
  stage: string;
  current?: boolean;
  note?: string;
};

export type PipelineGroup = {
  title: string;
  tone?: "current" | "future";
  studies: PipelineStudy[];
};

type PipelineTableProps = {
  phases: string[];
  groups: PipelineGroup[];
};

function PipelineRow({
  study,
  phases,
}: {
  study: PipelineStudy;
  phases: string[];
}) {
  const progressStyle = {
    "--pipeline-progress": study.progress,
  } as CSSProperties;

  return (
    <div className="pipeline-row" style={progressStyle}>
      <span className="pipeline-row__label">{study.label}</span>
      <span className="pipeline-row__status">{study.note ?? study.stage}</span>
      <span className="pipeline-row__phase-scale" aria-hidden="true">
        {phases.map((phase) => (
          <span key={phase}>{phase}</span>
        ))}
      </span>
      <span
        className="pipeline-stage pipeline-stage--track"
        role="img"
        aria-label={`Development stage: ${study.note ?? study.stage}`}
      >
        <span
          className={`pipeline-stage__bar${study.current ? " pipeline-stage__bar--current" : ""}`}
        >
          {study.note}
        </span>
      </span>
      {phases.slice(1).map((phase) => (
        <span className="pipeline-stage" aria-hidden="true" key={phase} />
      ))}
    </div>
  );
}

export function PipelineTable({ phases, groups }: PipelineTableProps) {
  return (
    <section
      data-block="pipeline-table"
      className="pipeline-overview"
      data-reveal-target
      data-reveal="pending"
    >
      <div className="container">
        <div
          className="data-scroll"
          tabIndex={0}
          aria-label="Clinical development pipeline"
        >
          <div className="pipeline-table">
            <div className="pipeline-table__phases" aria-hidden="true">
              <span />
              {phases.map((phase) => (
                <span key={phase}>{phase}</span>
              ))}
            </div>
            {groups.map((group) => (
              <section
                className={`pipeline-group${group.tone ? ` pipeline-group--${group.tone}` : ""}`}
                key={group.title}
              >
                <div className="pipeline-group__title">{group.title}</div>
                {group.studies.map((study) => (
                  <PipelineRow
                    phases={phases}
                    study={study}
                    key={study.label}
                  />
                ))}
              </section>
            ))}
          </div>
        </div>
        <div className="pipeline-legend" aria-label="Pipeline legend">
          <span>
            <i className="is-current" /> Current Studies
          </span>
          <span>
            <i /> Potential future studies SAB is not currently funding
          </span>
        </div>
      </div>
    </section>
  );
}
