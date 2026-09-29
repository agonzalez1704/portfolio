type Props = { className?: string };

function Icon({ d, className = "size-3.5", width = 1.5 }: Props & { d: string; width?: number }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={d} />
    </svg>
  );
}

export const ArrowUpRight = (p: Props) => <Icon d="M5 11L11 5M6 5h5v5" {...p} />;
export const ArrowRight = (p: Props) => <Icon d="M3 8h10M9 4l4 4-4 4" {...p} />;
export const ArrowLeft = (p: Props) => <Icon d="M13 8H3M7 4L3 8l4 4" {...p} />;
export const ArrowDown = (p: Props) => <Icon d="M8 3v10M4 9l4 4 4-4" {...p} />;
export const ArrowUp = (p: Props) => <Icon d="M8 13V3M4 7l4-4 4 4" width={1.75} {...p} />;
export const Check = (p: Props) => <Icon d="M3.5 8.5l3 3 6-7" width={1.75} {...p} />;
export const Close = (p: Props) => <Icon d="M4 4l8 8M12 4l-8 8" {...p} />;
export const Menu = (p: Props) => <Icon d="M2 6h12M2 10h12" {...p} />;
