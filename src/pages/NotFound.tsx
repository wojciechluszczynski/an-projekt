import { Link } from "react-router-dom";

const NotFound = () => (
  <main className="min-h-screen flex items-center justify-center bg-background px-6">
    <div className="text-center">
      <h1 className="font-heading text-6xl md:text-8xl text-foreground mb-4">404</h1>
      <p className="font-body text-lg text-muted-foreground mb-10">
        Strona, której szukasz, nie istnieje.
      </p>
      <Link
        to="/"
        className="px-8 py-3.5 rounded-full bg-primary text-primary-foreground text-sm tracking-[0.12em] uppercase font-body hover:bg-accent hover:text-accent-foreground transition-all duration-300"
      >
        Wróć na stronę główną
      </Link>
    </div>
  </main>
);

export default NotFound;
