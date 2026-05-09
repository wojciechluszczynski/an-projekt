import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

const rootEl = document.getElementById("root")!;

if (!supabaseUrl || !supabaseKey) {
  // Awaryjny fallback: bez konfiguracji backendu cala aplikacja pada na bialym ekranie,
  // bo supabase client jest importowany globalnie. Pokazujemy zamiast tego prosta
  // strone serwisowa, zeby uzytkownik mial co przeczytac i jak sie skontaktowac.
  rootEl.innerHTML = `
    <main style="
      min-height:100vh;display:flex;align-items:center;justify-content:center;
      padding:2rem;background:hsl(35,30%,97%);color:hsl(25,15%,20%);
      font-family:'Barlow',system-ui,-apple-system,sans-serif;
    ">
      <div style="max-width:520px;text-align:center;">
        <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:2rem;margin:0 0 1rem;">
          Trwa aktualizacja serwisu
        </h1>
        <p style="margin:0 0 1.5rem;line-height:1.6;color:hsl(25,10%,35%);">
          Wracam do Ciebie za chwile. Jesli sprawa jest pilna, napisz prosze
          bezposrednio na adres
          <a href="mailto:anprojekt.com@gmail.com" style="color:hsl(25,22%,45%);">anprojekt.com@gmail.com</a>.
        </p>
        <p style="margin:0;font-size:0.875rem;color:hsl(25,10%,50%);">
          AN Projekt &middot; Anna Nowak
        </p>
      </div>
    </main>
  `;
  // Loguj jednoznacznie do konsoli, zeby diagnoza byla natychmiastowa.
  // eslint-disable-next-line no-console
  console.error(
    "[AN Projekt] Brak konfiguracji Lovable Cloud (VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY). " +
      "Republikuj projekt z aktualnym .env (Publish -> Update)."
  );
} else {
  createRoot(rootEl).render(<App />);
}
