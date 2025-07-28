import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-midnight-neon-900 shadow text-left font-light flex align-center gap-4">
      <Image
        src="/PortfolioSampleLogo.svg"
        alt="Abstract Logo"
        width={78}
        height={78}
      />
      <h1 className={`text-3xl font-light px-3 py-6`}>
        Visualization Examples
      </h1>
    </header>
  );
}
