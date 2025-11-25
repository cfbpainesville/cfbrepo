import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex flex-col">
            <h1 className="text-2xl font-bold">CFBC</h1>
            <p className="text-xs text-blue-100">
              Calvary Fellowship Baptist Church
            </p>
          </Link>

          <nav className="flex gap-8 items-center">
            <Link
              href="/about"
              className="hover:text-blue-200 transition-colors"
            >
              About
            </Link>
            <Link
              href="/visit"
              className="hover:text-blue-200 transition-colors"
            >
              Visit Us
            </Link>
            <Link
              href="/ministries"
              className="hover:text-blue-200 transition-colors"
            >
              Ministries
            </Link>
            <Link
              href="/contact"
              className="hover:text-blue-200 transition-colors"
            >
              Contact
            </Link>
            <a
              href="tel:(440) 354-8994"
              className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Call Us
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
