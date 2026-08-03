import type { ReactNode } from "react";

export type ComparisonColumn = {
  image: string;
  imageAlt: string;
};

export type ComparisonRow = {
  label: string;
  values: (boolean | string)[];
};

function ComparisonValue({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return (
      <span
        className={`comparison-pill${value ? "" : " comparison-pill--negative"}`}
      >
        {value ? "✓" : "×"}
      </span>
    );
  }

  return <span>{value}</span>;
}

export function ComparisonTable({
  label,
  columns,
  rows,
  note,
}: {
  label: string;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  note?: ReactNode;
}) {
  return (
    <section
      data-block="comparison-table"
      className="comparison page-section container"
      data-reveal-target
      data-reveal="pending"
    >
      <div className="data-scroll" tabIndex={0} aria-label={label}>
        <table className="comparison__table">
          <thead>
            <tr>
              <th scope="col">Therapy characteristics</th>
              {columns.map((column) => (
                <th scope="col" key={column.image}>
                  <img src={column.image} alt={column.imageAlt} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {row.values.map((value, index) => (
                  <td
                    data-label={columns[index].imageAlt}
                    key={`${row.label}-${index}`}
                  >
                    <ComparisonValue value={value} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note ? <p className="comparison__note">{note}</p> : null}
    </section>
  );
}
