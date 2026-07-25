type ImageSlotProps = {
  id?: string;
  label?: string;
  className?: string;
  shape?: "rect" | "circle";
};

/** Design-accurate media placeholder until production assets land. */
export function ImageSlot({
  id,
  label = "Image",
  className = "",
  shape = "rect",
}: ImageSlotProps) {
  return (
    <div
      data-image-slot={id}
      role="img"
      aria-label={label || "Visual placeholder"}
      className={`relative flex h-full w-full items-end overflow-hidden bg-[linear-gradient(145deg,#EFEAE0_0%,#E3E6DC_48%,#E9E0D2_100%)] ${
        shape === "circle" ? "rounded-full" : ""
      } ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(199,74,38,0.18), transparent 42%), radial-gradient(circle at 80% 70%, rgba(22,21,15,0.12), transparent 45%)",
        }}
      />
      {label ? (
        <span className="relative z-[1] m-4 rounded-full bg-[rgba(22,21,15,0.55)] px-4 py-[9px] text-[12.5px] text-[rgba(247,245,240,0.9)] backdrop-blur-[8px]">
          {label}
        </span>
      ) : null}
    </div>
  );
}
