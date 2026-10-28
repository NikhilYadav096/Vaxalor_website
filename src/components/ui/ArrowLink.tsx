import Link from "next/link";
import type { ReactNode } from "react";

export default function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`arrow-link ${className}`}>
      <span>{children}</span>
      <span className="arr" aria-hidden="true">→</span>
    </Link>
  );
}
