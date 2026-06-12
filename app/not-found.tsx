import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-5 pt-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-display text-5xl font-light text-ivory md:text-6xl">
        This moment
        <br />
        doesn&apos;t exist.
      </h1>
      <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ivory-muted">
        The page you&apos;re looking for has slipped off the dial. The
        collection, however, is exactly where you left it.
      </p>
      <Link href="/shop" className="btn-gold mt-10">
        Back to the collection
      </Link>
    </div>
  );
}
