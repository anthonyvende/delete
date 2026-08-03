/**
 * Full-bleed heading backdrop. It is absolutely positioned against its host, so
 * whatever element hosts it decides where the band ends — the split follows the
 * heading's real height instead of a fixed offset.
 */
export function PageBand() {
  return <span className="page-band" aria-hidden="true" />;
}
