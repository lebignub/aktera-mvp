"use client";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: { icon: 16, text: "text-[13px]", gap: "gap-2" },
  md: { icon: 18, text: "text-[15px]", gap: "gap-2" },
  lg: { icon: 22, text: "text-[17px]", gap: "gap-2.5" },
};

export function Logo({ size = "md", className = "" }: LogoProps) {
  const s = sizes[size];

  return (
    <div className={`flex items-center ${s.gap} ${className}`}>
      {/* Clean three-bar icon */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="5" y="5.5" width="18" height="3.5" rx="1.75" fill="#FFFFFF" />
        <rect x="5" y="12.25" width="18" height="3.5" rx="1.75" fill="#FFFFFF" />
        <rect x="5" y="19" width="18" height="3.5" rx="1.75" fill="#FFFFFF" />
      </svg>
      <span className={`${s.text} font-semibold tracking-[-0.02em] text-white`}>
        Aktera
      </span>
    </div>
  );
}
