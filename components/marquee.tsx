type MarqueeProps = {
  text: string;
  reverse?: boolean;
  onPrimary?: boolean;
  className?: string;
};

/** Three identical groups; the track slides exactly one group (-33.333%)
 *  per cycle so the loop is seamless. Each group repeats the phrase twice
 *  so wide screens never see a gap. */
export function Marquee({ text, reverse, onPrimary, className = "" }: MarqueeProps) {
  const group = `${text}  `.repeat(2);
  const classes = [
    "marquee",
    reverse ? "marquee--reverse" : "",
    onPrimary ? "marquee--on-primary" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <div className="marquee-track">
        <span className="marquee-group">{group}</span>
        <span className="marquee-group" aria-hidden="true">
          {group}
        </span>
        <span className="marquee-group" aria-hidden="true">
          {group}
        </span>
      </div>
    </div>
  );
}
