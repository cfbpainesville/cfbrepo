"use client";

import Link from "next/link";
import { useState } from "react";
import "./header.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header-bg text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex flex-col">
            <h1 className="text-2xl font-bold">CFBC</h1>
            <p className="text-xs opacity-90">
              Calvary Fellowship Baptist Church
            </p>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            <Link
              href="/about"
              className="hover-secondary"
            >
              About
            </Link>
            <Link
              href="/visit"
              className="hover-secondary"
            >
              Visit Us
            </Link>
            <Link
              href="/ministries"
              className="hover-secondary"
            >
              Ministries
            </Link>
            <Link
              href="/contact"
              className="hover-secondary"
            >
              Contact
            </Link>
            <a
              href="tel:(440) 354-8994"
              className="btn-primary px-4 py-2 rounded-lg font-semibold"
            >
              Call Us
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="w-6 h-0.5 bg-current block"></span>
            <span className="w-6 h-0.5 bg-current block"></span>
            <span className="w-6 h-0.5 bg-current block"></span>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <Link
              href="/about"
              className="hover-secondary block"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/visit"
              className="hover-secondary block"
              onClick={() => setIsMenuOpen(false)}
            >
              Visit Us
            </Link>
            <Link
              href="/ministries"
              className="hover-secondary block"
              onClick={() => setIsMenuOpen(false)}
            >
              Ministries
            </Link>
            <Link
              href="/contact"
              className="hover-secondary block"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <a
              href="tel:(440) 354-8994"
              className="btn-primary px-4 py-2 rounded-lg font-semibold inline-block w-full text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Call Us
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
