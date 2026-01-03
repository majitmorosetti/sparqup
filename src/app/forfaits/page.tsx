
import Link from "next/link";

export default function Forfaits() {
  return (
    <main className="container flex min-h-[80vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Page des Forfaits</h1>
        <p className="mb-4">Cette page est en cours de développement.</p>
        <Link
          href="/"
          className="text-blue-600 hover:underline"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}