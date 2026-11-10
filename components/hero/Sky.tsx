/** Decorative sky behind the hero: drifting clouds by day, moon and stars by night. */

function Cloud({ className, fill }: { className: string; fill: string }) {
  return (
    <svg viewBox="0 0 420 140" className={className} aria-hidden="true">
      <g fill={fill}>
        <ellipse cx="110" cy="90" rx="110" ry="42" />
        <ellipse cx="200" cy="64" rx="90" ry="58" />
        <ellipse cx="300" cy="92" rx="110" ry="40" />
      </g>
    </svg>
  );
}

const STARS = [
  [8, 9, 1.6],
  [24, 17, 1.2],
  [42, 7, 1.8],
  [61, 21, 1.2],
  [72, 10, 1.5],
  [87, 29, 1.2],
  [95, 8, 1.7],
  [53, 37, 1.1],
  [92, 53, 1.3],
  [68, 62, 1.2],
  [15, 44, 1.1],
  [33, 58, 1.3],
] as const;

export function Sky() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Day */}
      <div className="dark:hidden">
        <Cloud fill="#FFFFFF" className="sky-drift absolute left-[52%] top-[13%] w-[220px] md:w-[420px]" />
        <Cloud fill="#FFFFFF" className="sky-drift-back absolute right-[-4%] top-[47%] w-[180px] md:w-[360px] opacity-90" />
        <Cloud fill="#FFFFFF" className="sky-drift-slow absolute left-[-4%] top-[78%] w-[220px] md:w-[520px] opacity-85" />
      </div>

      {/* Night */}
      <div className="hidden dark:block">
        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
          {STARS.map(([x, y, r], i) => (
            <circle
              key={i}
              cx={`${x}%`}
              cy={`${y}%`}
              r={r}
              fill="#E8EEF6"
              className="sky-twinkle"
              style={{ animationDelay: `${(i % 5) * 0.7}s` }}
            />
          ))}
        </svg>
        <div className="absolute right-[12%] top-[12%] h-14 w-14 rounded-full bg-[#F3E9D2] opacity-90 md:h-24 md:w-24" />
        <Cloud fill="#22324C" className="sky-drift absolute left-[50%] top-[19%] w-[240px] md:w-[600px] opacity-55" />
        <Cloud fill="#22324C" className="sky-drift-back absolute right-[-2%] top-[52%] w-[200px] md:w-[480px] opacity-45" />
      </div>

      {/* Curved horizon into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-16 rounded-t-[50%] bg-[#F7FBFE] md:h-28 dark:bg-[#0A111D]" />
    </div>
  );
}
