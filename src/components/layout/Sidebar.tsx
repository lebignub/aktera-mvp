"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { IconFolder } from "@/components/ui/Icons";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] h-screen sticky top-0 bg-[#0F0F12] border-r border-[#1E1E21] flex flex-col shrink-0">
      {/* Logo */}
      <div className="h-14 flex items-center px-5">
        <Link href="/">
          <Logo size="sm" />
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2">
        <p className="text-[10px] uppercase tracking-[0.1em] text-[#52525B] font-semibold px-2 mb-2">
          Werkruimte
        </p>
        <Link
          href="/"
          className={`
            flex items-center gap-2.5 px-2.5 py-[7px] rounded-lg text-[13px] font-medium transition-colors
            ${pathname === "/"
              ? "bg-[#18181B] text-[#FAFAFA]"
              : "text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#18181B]"
            }
          `}
        >
          <IconFolder size={15} className="shrink-0" />
          Dossiers
        </Link>
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-[#1E1E21]">
        <p className="text-[10px] text-[#52525B]">Aktera v0.1</p>
      </div>
    </aside>
  );
}
