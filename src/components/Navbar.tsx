import Link from "next/link";

export default function Navbar() {
  const linkStyle = `
          border-b-5
          border-midnight-neon-600/0
          hover:border-midnight-neon-600/90
          pt-3
          pb-2
          transition-colors
          duration-500
          ease-in-out
        `;
  return (
    <nav className="bg-midnight-neon-600/40 text-white px-6 flex justify-left gap-6">
      <Link href="/" className={linkStyle}>
        Home
      </Link>
      <Link href="/table" className={linkStyle}>
        Table
      </Link>
      <Link href="/graph" className={linkStyle}>
        Graph
      </Link>
    </nav>
  );
}
