"use client";

import { useState } from "react";
import Image from "next/image";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#timeline", label: "Timeline" },
  { href: "#eligibility", label: "Eligibility" },
  { href: "#criteria", label: "Criteria" },
  { href: "#prizes", label: "Prizes" },
  { href: "#register", label: "Register" },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-bg-primary/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2 group shrink-0"
            onClick={handleClick}
          >
            <Image
              src="/neurox.webp"
              alt="NeuroX"
              width={120}
              height={32}
              className="h-8 w-auto"
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-xs text-text-secondary hover:text-accent-cyan transition-colors rounded-md hover:bg-bg-tertiary/50 tracking-wider uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-accent-cyan transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className={`block h-0.5 bg-current transition-all ${
                  isOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-current transition-all ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-current transition-all ${
                  isOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-80 pb-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleClick}
                className="px-3 py-2.5 text-sm text-text-secondary hover:text-accent-cyan transition-colors rounded-md hover:bg-bg-tertiary/50 uppercase tracking-wider"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
