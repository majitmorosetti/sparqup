import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h3 className="mb-3 text-2xl font-semibold">
          Un site moderne. Des process intelligents.
        </h3>
        <p className="mb-6 text-neutral-600">
          Réservez un échange gratuit de 20 minutes.
        </p>
        <Link
          href="/contact"
          className="inline-block rounded bg-black px-5 py-3 text-white"
        >
          Réserver un appel
        </Link>
      </div>
    </section>
  );
}
