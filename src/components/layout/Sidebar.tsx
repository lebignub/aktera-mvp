"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { IconFolder, IconGlobe } from "@/components/ui/Icons";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] h-screen sticky top-0 bg-black border-r border-[rgba(255,255,255,0.1)] flex flex-col shrink-0">
      {/* Logo */}
      <div className="h-14 flex items-center px-5">
        <Link href="/">
          <Logo size="md" />
        </Link>
      </div>

      {/* Divider */}
      <div className="mx-5 divider-gradient" />

      {/* Navigation */}
      <nav className="flex-1 px-3 pt-4">
        <Link
          href="/"
          className={`
            flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors duration-150
            ${pathname === "/"
              ? "text-white bg-[rgba(255,255,255,0.1)]"
              : "text-[#666] hover:text-white"
            }
          `}
        >
          <IconFolder size={15} className="shrink-0" />
          Dossiers
        </Link>
        <Link
          href="/pitch"
          className={`
            flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors duration-150
            ${pathname === "/pitch"
              ? "text-white bg-[rgba(255,255,255,0.1)]"
              : "text-[#666] hover:text-white"
            }
          `}
        >
          <IconGlobe size={15} className="shrink-0" />
          Pitch
        </Link>
      </nav>

      {/* Bottom — user info */}
      <div className="px-5 py-4 border-t border-[rgba(255,255,255,0.1)]">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-[#222] flex items-center justify-center text-[9px] font-medium text-[#999]">
            MA
          </div>
          <div>
            <p className="text-[12px] font-medium text-white leading-none">Matteo</p>
            <p className="text-[10px] text-[#666] mt-0.5">Pro</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
