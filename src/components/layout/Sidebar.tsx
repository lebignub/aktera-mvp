"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { IconFolder } from "@/components/ui/Icons";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[240px] h-screen sticky top-0 sidebar-bg border-r border-[rgba(255,255,255,0.04)] flex flex-col shrink-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-6">
        <Link href="/">
          <Logo size="md" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 pt-2">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#454D5E] font-semibold px-3 mb-3">
          Platform
        </p>

        <Link
          href="/"
          className={`
            flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150
            ${pathname === "/"
              ? "bg-[rgba(59,130,246,0.08)] text-[#3B82F6] ring-active"
              : "text-[#7C8494] hover:text-[#F0F2F5] hover:bg-[rgba(255,255,255,0.03)]"
            }
          `}
        >
          <IconFolder size={16} className="shrink-0" />
          Dossiers
        </Link>
      </nav>

      {/* Bottom */}
      <div className="px-6 py-5 border-t border-[rgba(255,255,255,0.04)]">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] flex items-center justify-center text-[10px] font-bold text-white">
            MA
          </div>
          <div>
            <p className="text-[12px] font-medium text-[#F0F2F5]">Matteo</p>
            <p className="text-[10px] text-[#454D5E]">Pro plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
