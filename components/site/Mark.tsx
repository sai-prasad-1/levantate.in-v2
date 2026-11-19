/** The two pieces of the Levantate mark: ours (left hook) and yours (right hook). */
export const MARK_PATH_OURS =
  "M0 3.43524V22.49C0 22.808 0.202326 23.0879 0.505816 23.2405L7.03807 26.3061C7.31265 26.4333 7.6595 26.446 7.93408 26.3061L19.6401 20.9891C20.3338 20.671 20.3338 19.8188 19.669 19.4881L14.6398 17.0458C14.3652 16.9059 14.0328 16.9059 13.7437 17.0204L9.07578 19.0301C8.4399 19.31 7.6884 18.8902 7.6884 18.2669V0.853046C7.6884 0.217038 6.92245 -0.190007 6.28657 0.0898365L0.534719 2.67203C0.216778 2.81195 0 3.10451 0 3.43524Z";
export const MARK_PATH_YOURS =
  "M30.2317 28.9229V9.51572C30.2317 9.23222 30.0593 8.9616 29.7721 8.83274L23.1932 5.68842C22.9346 5.57245 22.6473 5.57245 22.3888 5.68842L10.5525 11.1652C9.93486 11.4487 9.92049 12.2348 10.5382 12.5441L15.7381 15.1214C15.9823 15.2502 16.2839 15.2502 16.5425 15.1343L21.3545 13.0209C21.9291 12.7631 22.6042 13.1497 22.6042 13.7167V31.629C22.6042 32.2089 23.2937 32.5826 23.8683 32.3249L29.7721 29.6316C30.0593 29.5027 30.2461 29.2321 30.2461 28.9357L30.2317 28.9229Z";

type MarkProps = {
  className?: string;
  /** Fill for the left piece. Pass "gradient" for the Daybreak gradient. */
  ours?: string;
  /** Fill for the right piece. */
  yours?: string;
  /** Unique id when using the gradient fill (one per page instance). */
  gradientId?: string;
  title?: string;
};

export function Mark({
  className,
  ours = "var(--night)",
  yours = ours === "gradient" ? "var(--night)" : ours,
  gradientId,
  title,
}: MarkProps) {
  const useGradient = ours === "gradient" && gradientId;
  return (
    <svg
      viewBox="0 0 31 33"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {useGradient ? (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: "var(--g0)" }} />
            <stop offset="0.5" style={{ stopColor: "var(--g1)" }} />
            <stop offset="1" style={{ stopColor: "var(--g2)" }} />
          </linearGradient>
        </defs>
      ) : null}
      <path d={MARK_PATH_OURS} style={{ fill: useGradient ? `url(#${gradientId})` : ours }} />
      <path d={MARK_PATH_YOURS} style={{ fill: yours }} />
    </svg>
  );
}
