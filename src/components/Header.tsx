"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { navigation, contact } from "@/content/site";

export function Header() {
  // Transparent over the hero, solid once the hero has scrolled past.
  const [lifted, setLifted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  /** Which top-level item currently has its submenu open, if any. */
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // A click anywhere outside the nav closes the submenu — the pointer-leave
  // handler alone strands it open after a touch or a keyboard jump.
  useEffect(() => {
    if (!openMenu) return;
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [openMenu]);

  useEffect(() => {
    const timer = closeTimer;
    return () => window.clearTimeout(timer.current);
  }, []);

  /** Small grace period so the pointer can cross the gap into the panel. */
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 140);
  };

  const cancelClose = () => window.clearTimeout(closeTimer.current);

  const handleNavClick = (href: string) => {
    setOpenMenu(null);
    setMenuOpen(false);

    if (href.includes("category=")) {
      const match = href.match(/category=([^&#]+)/);
      if (match) {
        const catId = match[1];
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("open-portfolio-category", { detail: catId })
          );
          setTimeout(() => {
            const portfolioEl = document.getElementById("portfolio");
            if (portfolioEl) {
              portfolioEl.scrollIntoView({ behavior: "smooth" });
            }
          }, 50);
        }
      }
    }
  };

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-accent-500 focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          lifted || menuOpen || openMenu
            ? "border-b border-rule bg-powder-50/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-18 max-w-[88rem] items-center justify-between gap-8 px-6 lg:px-10">
          <a
            href="/"
            aria-label="Saanso Pharma — home"
            className="relative z-10 shrink-0"
            onClick={() => setMenuOpen(false)}
          >
            <Logo tone="dark" />
          </a>

          <nav
            ref={navRef}
            aria-label="Primary"
            className="hidden items-stretch self-stretch lg:flex"
          >
            {navigation.map((item) => {
              const hasMenu = Boolean(item.children?.length);
              const isOpen = openMenu === item.label;

              if (!hasMenu) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group relative flex items-center px-5 text-[0.875rem] font-semibold tracking-[-0.01em] text-ink-950 transition-colors duration-200 hover:text-brand-600"
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-5 bottom-5 h-0.5 origin-left scale-x-0 rounded-full bg-brand-600 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    />
                  </Link>
                );
              }

              return (
                <div
                  key={item.href}
                  className="relative flex items-stretch"
                  onPointerEnter={() => {
                    cancelClose();
                    setOpenMenu(item.label);
                  }}
                  onPointerLeave={scheduleClose}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() => setOpenMenu(isOpen ? null : item.label)}
                    className="group relative flex cursor-pointer items-center gap-1.5 px-5 text-[0.875rem] font-semibold tracking-[-0.01em] text-ink-950 transition-colors duration-200 hover:text-brand-600"
                  >
                    {item.label}
                    <svg
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                      className={`h-3.5 w-3.5 text-ink-800 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? "-rotate-180 text-brand-600" : "group-hover:text-brand-600"
                      }`}
                    >
                      <path
                        d="M4 6.5L8 10.5L12 6.5"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-x-5 bottom-5 h-0.5 origin-left rounded-full bg-brand-600 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </button>

                  <div
                    onPointerEnter={cancelClose}
                    onPointerLeave={scheduleClose}
                    className={`absolute top-full left-1/2 w-max min-w-[17rem] max-w-[28rem] -translate-x-1/2 pt-2 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-1 opacity-0"
                    }`}
                  >
                    <div className="max-h-[80vh] overflow-y-auto rounded-2xl border border-sky-200/90 bg-white/95 p-2 shadow-2xl shadow-sky-950/15 backdrop-blur-xl ring-1 ring-sky-100">
                      {item.children?.map((child) => (
                        <div key={`${child.label}-${child.href}`}>
                          <Link
                            href={child.href}
                            onClick={() => handleNavClick(child.href)}
                            className="group/item flex items-center justify-between gap-4 rounded-xl px-3.5 py-2.5 transition-colors duration-150 hover:bg-sky-50"
                          >
                            <span
                              className={`text-[0.84375rem] text-ink-950 transition-colors duration-150 group-hover/item:text-brand-600 ${
                                child.children?.length ? "font-semibold" : "font-medium"
                              }`}
                            >
                              {child.label}
                            </span>
                            {child.hint ? (
                              <span className="spec-label numeric shrink-0 text-[0.6875rem] text-slate-500">
                                {child.hint}
                              </span>
                            ) : null}
                          </Link>

                          {child.children?.length ? (
                            <ul className="mb-1 ml-3.5 border-l border-rule pl-2">
                              {child.children.map((sub) => (
                                <li key={`${sub.label}-${sub.href}`}>
                                  <Link
                                    href={sub.href}
                                    onClick={() => handleNavClick(sub.href)}
                                    className="group/sub flex items-center justify-between gap-4 rounded-lg px-3 py-2 transition-colors duration-150 hover:bg-sky-50"
                                  >
                                    <span className="text-[0.8125rem] font-medium text-ink-800 transition-colors duration-150 group-hover/sub:text-brand-600">
                                      {sub.label}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Present at every width now — the phone header used to carry no
                call to action at all. It tightens rather than disappears, so a
                360px bar still fits logo, button and toggle. */}
            <a
              href={`mailto:${contact.general}`}
              className="btn btn-bubble px-4! py-2! text-[0.75rem]! sm:px-5! sm:py-2.5! sm:text-[0.8125rem]!"
            >
              Get in touch
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="relative z-10 -mr-2 flex h-11 w-11 items-center justify-center text-ink-950 lg:hidden"
            >
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true" className="relative block h-3.5 w-5">
                <span
                  className={`absolute left-0 block h-0.5 w-full rounded-full bg-current transition-all duration-300 ${
                    menuOpen ? "top-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute top-1/2 left-0 block h-0.5 w-full rounded-full bg-current transition-opacity duration-200 ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-0.5 w-full rounded-full bg-current transition-all duration-300 ${
                    menuOpen ? "top-1/2 -rotate-45" : "bottom-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet — the same index, with the Categories submenu inlined
          rather than hidden behind a second tap. */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 flex-col bg-powder-50/95 backdrop-blur-xl pt-20 transition-all duration-300 lg:hidden ${
          menuOpen
            ? "flex opacity-100 pointer-events-auto"
            : "hidden opacity-0 pointer-events-none"
        }`}
      >
        <nav
          aria-label="Primary, mobile"
          className="flex-1 overflow-y-auto px-6 pt-4 pb-8"
        >
          <ul className="border-t border-rule">
            {navigation.map((item, i) => (
              <li key={item.href} className="border-b border-rule">
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline justify-between gap-6 py-4 active:bg-powder-100/50 rounded-xl px-2"
                >
                  <span className="font-display text-2xl font-normal tracking-[-0.02em] text-ink-950">
                    {item.label}
                  </span>
                  <span className="index-num numeric shrink-0 font-medium text-ink-950">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </Link>

                {item.children?.length ? (
                  <ul className="-mt-1 pb-3 pl-3 space-y-1">
                    {item.children.map((child) => (
                      <li key={`${child.label}-${child.href}`}>
                        <Link
                          href={child.href}
                          onClick={() => handleNavClick(child.href)}
                          className="flex items-center justify-between gap-4 py-2 px-3 rounded-lg hover:bg-sky-50 active:bg-sky-100 transition-colors"
                        >
                          <span className="text-[0.9375rem] font-medium text-ink-950">
                            {child.label}
                          </span>
                          {child.hint ? (
                            <span className="spec-label numeric shrink-0 text-xs text-slate-500">
                              {child.hint}
                            </span>
                          ) : null}
                        </Link>

                        {child.children?.length ? (
                          <ul className="mt-0.5 mb-1 ml-5 border-l border-rule pl-2 space-y-0.5">
                            {child.children.map((sub) => (
                              <li key={`${sub.label}-${sub.href}`}>
                                <Link
                                  href={sub.href}
                                  onClick={() => handleNavClick(sub.href)}
                                  className="flex items-center py-1.5 px-3 rounded-lg hover:bg-sky-50 active:bg-sky-100 transition-colors"
                                >
                                  <span className="text-[0.875rem] font-medium text-ink-800">
                                    {sub.label}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact info at bottom */}
        <div className="border-t border-rule bg-white/60 px-6 py-6 backdrop-blur-sm">
          <p className="spec-label">General enquiries</p>
          <a
            href={`mailto:${contact.general}`}
            className="mt-1 block font-display text-lg break-all text-ink-950 font-medium hover:text-accent-700"
          >
            {contact.general}
          </a>
        </div>
      </div>
    </>
  );
}
