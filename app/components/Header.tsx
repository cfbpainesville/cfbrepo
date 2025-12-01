import Link from "next/link";
import "./header.css";

export default function Header() {
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

          <nav className="flex gap-8 items-center">
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
        </div>
      </div>
    </header>
  );
}
