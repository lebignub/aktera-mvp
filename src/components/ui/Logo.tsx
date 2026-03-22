"use client";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: { icon: 18, text: "text-sm", gap: "gap-2" },
  md: { icon: 22, text: "text-base", gap: "gap-2.5" },
  lg: { icon: 28, text: "text-lg", gap: "gap-3" },
};

export function Logo({ size = "md", className = "" }: LogoProps) {
  const s = sizes[size];

  return (
    <div className={`flex items-center ${s.gap} ${className}`}>
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="5" y="5.5" width="18" height="3.8" rx="1.9" fill="#FAFAFA" />
        <rect x="5" y="12.1" width="18" height="3.8" rx="1.9" fill="#FAFAFA" />
        <rect x="5" y="18.7" width="18" height="3.8" rx="1.9" fill="#FAFAFA" />
      </svg>
      <span className={`${s.text} font-bold tracking-tight text-[#FAFAFA]`}>
        Aktera
      </span>
    </div>
  );
}
