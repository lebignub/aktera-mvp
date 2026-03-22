"use client";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  className?: string;
}

const sizes = {
  sm: { icon: 20, text: "text-lg", gap: "gap-2" },
  md: { icon: 26, text: "text-xl", gap: "gap-2.5" },
  lg: { icon: 34, text: "text-2xl", gap: "gap-3" },
};

export function Logo({ size = "md", showWordmark = true, className = "" }: LogoProps) {
  const s = sizes[size];

  return (
    <div className={`flex items-center ${s.gap} ${className}`}>
      {/* Three-bar icon mark */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="6" y="6" width="20" height="4.5" rx="2.25" fill="white" />
        <rect x="6" y="13.75" width="20" height="4.5" rx="2.25" fill="white" />
        <rect x="6" y="21.5" width="20" height="4.5" rx="2.25" fill="white" />
      </svg>

      {showWordmark && (
        <span className={`${s.text} font-bold tracking-tight text-white`}>
          Aktera
        </span>
      )}
    </div>
  );
}
