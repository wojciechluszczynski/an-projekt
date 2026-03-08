import FadeIn from "@/components/FadeIn";

const faqItems = [
  {
    q: "Czy projekt wnętrza naprawdę się opłaca?",
    a: "Tak — i to z kilku powodów. Po pierwsze, projekt porządkuje wszystkie decyzje zanim zaczniesz wydawać pieniądze. Po drugie, projektantka zna dostawców i wykonawców — co często przekłada się na lepsze ceny i jakość. Po trzecie, wizualizacje 3D pozwalają sprawdzić efekt końcowy zanim cokolwiek zostanie przyklejone lub przykręcone. Koszt błędów remontowych bez projektu zazwyczaj wielokrotnie przewyższa koszt projektu.",
  },
  {
    q: "Czy mogę realizować projekt etapami?",
    a: "Tak — to częsta opcja. Projekt jest tworzony całościowo (żeby zachować spójność), ale realizacja może być podzielona na etapy: np. najpierw salon i kuchnia, w kolejnym roku sypialnia i łazienka. Ważne jest, żeby projekt był gotowy w całości przed startem — to chroni spójność wnętrza nawet gdy realizacja trwa kilka lat.",
  },
  {
    q: "Czy projektantka pracuje razem z wykonawcami?",
    a: "W pakiecie Kompleksowa tak — 3 spotkania nadzorujące na budowie: przy zakupach materiałów, przy starcie prac i przy odbiorze końcowym. W pozostałych pakietach dostarczam pełną dokumentację techniczną, z którą każdy dobry wykonawca jest w stanie pracować samodzielnie.",
  },
  {
    q: "Czy projektantka dojeżdża do Rzeszowa i Krosna?",
    a: "Tak. Obszar mojego działania to całe Podkarpacie (Krosno, Rzeszów, Sanok, Przemyśl i okolice) oraz Małopolska (Nowy Sącz i okolice). Pierwsza wizja lokalna i rozmowa jest wliczona w każdy pakiet.",
  },
  {
    q: "Ile trwa projekt wnętrza mieszkania 80m²?",
    a: "W zależności od pakietu: Koncepcyjna: 3–4 tygodnie. Komfortowa: 5–7 tygodni. Kompleksowa: 8–12 tygodni (z nadzorem na budowie).",
  },
];

const EbookFaq = () => (
  <section id="faq" className="section-padding bg-secondary scroll-mt-16">
    <div className="max-w-[1000px] mx-auto">
      <FadeIn>
        <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-4 block">10</span>
        <h2 className="font-heading text-2xl md:text-4xl text-foreground mb-10">
          Najczęstsze pytania klientów
        </h2>

        <div className="space-y-5">
          {faqItems.map((item, i) => (
            <div key={i} className="bg-background rounded-2xl p-5 md:p-6 shadow-sm">
              <h3 className="font-heading text-sm md:text-base text-foreground mb-3">{item.q}</h3>
              <p className="font-body text-sm text-muted-foreground leading-[1.8]">{item.a}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  </section>
);

export default EbookFaq;
