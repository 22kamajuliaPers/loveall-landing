import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="z-20 relative group inline-block"
      aria-label="LoveAll Home"
    >
      <img
        src="/loveall_Logo.png"
        alt="LoveAll"
        className="h-10 md:h-14 w-auto transition-transform duration-200 group-hover:scale-105"
      />
    </Link>
  );
}
