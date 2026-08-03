import { CardGrid } from "../layout/CardGrid";
import { Section } from "../layout/Section";
import { CircleArrow } from "../ui/CircleArrow";

type Job = {
  title: string;
  location?: string;
  href?: string;
};

export function JobBoard({ title, jobs }: { title: string; jobs: Job[] }) {
  return (
    <Section data-block="job-board" compact>
      <h2 className="section-heading">{title}</h2>
      <CardGrid columns={3}>
        {jobs.map((job) => (
          <a
            className="job-card expanding-action surface-card"
            href={
              job.href ??
              `mailto:careers@sab.bio?subject=${encodeURIComponent(`Application: ${job.title}`)}`
            }
            key={job.title}
          >
            <span className="job-card__location">
              Location: {job.location ?? "Remote"}
            </span>
            <h3 className="job-card__title">{job.title}</h3>
            <CircleArrow className="job-card__arrow expanding-action__control" />
          </a>
        ))}
      </CardGrid>
    </Section>
  );
}
