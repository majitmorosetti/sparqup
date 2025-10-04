import Container from "@/components/shared/Container";

export default function Footer() {
  return (
    <footer className="border-t py-10 text-sm text-neutral-600">
      <Container className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Sparqup. Tous droits réservés.</p>
        <div className="flex gap-4">
          <a href="/legal/mentions">Mentions légales</a>
          <a href="/legal/privacy">Confidentialité</a>
        </div>
      </Container>
    </footer>
  );
}
