"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkStyle = (href: string) => `
    border-b-4
    ${pathname === href ? "border-midnight-neon-400" : "border-transparent"}
    hover:border-midnight-neon-600
    pt-3
    pb-2
    px-3
    transition-colors
    duration-300
    ease-in-out
  `;

  return (
    <nav className="bg-midnight-neon-600/40 text-white flex justify-left gap-0">
      <Link href="/" className={linkStyle("/")}>Home</Link>
      <Link href="/table" className={linkStyle("/table")}>Table</Link>
      <Link href="/graph" className={linkStyle("/graph")}>Graph</Link>
    </nav>
  );
}

