"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink(props) {
  const pathname = usePathname();

  const active = pathname === props.path;

  return (
    <Link
      href={props.path}
      className={active ? "opacity-100" : "opacity-50 hover:opacity-90"}
    >
      {props.label}
    </Link>
  );
}
