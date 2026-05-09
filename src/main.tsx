import { createRoot } from "react-dom/client";
import "./index.css";

const rootEl = document.getElementById("root")!;

import("./App.tsx")
  .then(({ default: App }) => {
    createRoot(rootEl).render(<App />);
  })
  .catch((error) => {
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
              Wracam do Ciebie za chwilę. Jeśli sprawa jest pilna, napisz proszę
              bezpośrednio na adres
              <a href="mailto:anprojekt.com@gmail.com" style="color:hsl(25,22%,45%);">anprojekt.com@gmail.com</a>.
            </p>
            <p style="margin:0;font-size:0.875rem;color:hsl(25,10%,50%);">
              AN Projekt &middot; Anna Nowak
            </p>
          </div>
        </main>
      `;
    // eslint-disable-next-line no-console
    console.error("[AN Projekt] Nie udało się uruchomić aplikacji.", error);
  });
