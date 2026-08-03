import { ChevronIcon } from "../ui/ChevronIcon";
import { PersonCard } from "./PersonCard";

type Person = {
  name: string;
  role: string;
  image?: string;
  bio?: string;
  bioFull?: string[];
};

type PeopleGroup = {
  id: string;
  label: string;
  people: Person[];
};

type PeoplePanel = {
  id: string;
  label: string;
  groups: PeopleGroup[];
};

export function PeopleDirectory({ panels }: { panels: PeoplePanel[] }) {
  return (
    <section
      data-block="people-directory"
      className="people-directory container"
    >
      <div className="people-directory__tabs" role="tablist">
        {panels.map((panel, index) => (
          <button
            className="people-directory__tab"
            type="button"
            role="tab"
            id={`${panel.id}-tab`}
            aria-controls={panel.id}
            aria-selected={index === 0}
            data-people-tab
            key={panel.id}
          >
            {panel.label}
            <ChevronIcon className="people-directory__tab-chevron" />
          </button>
        ))}
      </div>

      {panels.map((panel, index) => (
        <div
          className="people-directory__panel"
          role="tabpanel"
          id={panel.id}
          aria-labelledby={`${panel.id}-tab`}
          hidden={index !== 0}
          data-people-panel
          key={panel.id}
        >
          {panel.groups.every((group) => group.people.length === 0) ? (
            <p className="people-directory__empty">
              This roster is coming soon.
            </p>
          ) : null}
          {panel.groups
            .filter((group) => group.people.length > 0)
            .map((group) => (
              <section
                className="people-directory__group"
                data-reveal-target
                data-reveal="pending"
                key={group.id}
              >
                <h2 className="section-heading">{group.label}</h2>
                <div
                  className={`people-directory__grid${group.people.length === 5 ? " people-directory__grid--balanced" : ""}`}
                >
                  {group.people.map((person) => (
                    <PersonCard {...person} key={person.name} />
                  ))}
                </div>
              </section>
            ))}
        </div>
      ))}
    </section>
  );
}
