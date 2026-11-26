"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navigationLinks = [
  { href: "/", label: "Inicio" },
  { href: "/experiences", label: "Experiencias" },
  { href: "/favorites", label: "Favoritos" },
  { href: "/profile", label: "Perfil" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    navRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
    };
  }, [isMenuOpen]);

  return (
    <header className="site-header" ref={headerRef}>
      <Link className="site-brand" href="/">
        EXPERIENCIAS ARNAU
      </Link>
      <button
        aria-controls="primary-navigation"
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
        className="menu-toggle"
        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        ref={menuButtonRef}
        type="button"
      >
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
          {isMenuOpen ? (
            <path d="m6 6 12 12M18 6 6 18" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      <nav
        aria-label="Navegacion principal"
        className={`main-nav${isMenuOpen ? " is-open" : ""}`}
        id="primary-navigation"
        ref={navRef}
      >
        <ul className="nav-links">
          {navigationLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                aria-current={
                  (href === "/experiences"
                    ? pathname === href || pathname.startsWith(`${href}/`)
                    : pathname === href)
                    ? "page"
                    : undefined
                }
                className="nav-link"
                href={href}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
