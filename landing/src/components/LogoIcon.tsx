interface LogoIconProps {
  className?: string;
  width?: number;
  height?: number;
}

/**
 * Renders the official Kymatics logo (icon + wordmark) from logo.png.
 */
export function LogoIcon({
  className = "",
  width = 280,
  height = 200
}: LogoIconProps) {
  return (
    <img
      src="/logo.png"
      alt="Kymatics"
      width={width}
      height={height}
      className={className}
      loading="eager"
      decoding="async"
    />
  );
}
