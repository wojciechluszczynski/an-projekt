import FadeIn from "@/components/FadeIn";

const Regulamin = () => (
  <main className="pt-40 pb-24">
    <div className="max-w-[800px] mx-auto px-6 md:px-12">
      <FadeIn>
        <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-12">Regulamin</h1>
        <div className="prose prose-lg font-body text-muted-foreground">
          <h2 className="font-heading text-2xl text-foreground mt-10 mb-4">1. Postanowienia ogólne</h2>
          <p>Niniejszy regulamin określa zasady korzystania ze strony internetowej AN Projekt prowadzonej przez Annę Nowak.</p>

          <h2 className="font-heading text-2xl text-foreground mt-10 mb-4">2. Usługi</h2>
          <p>AN Projekt oferuje usługi projektowania wnętrz w trzech pakietach: Koncepcyjna, Komfortowa i Kompleksowa. Szczegółowy zakres usług opisany jest na stronie Oferta.</p>

          <h2 className="font-heading text-2xl text-foreground mt-10 mb-4">3. Formularz kontaktowy</h2>
          <p>Przesłanie formularza kontaktowego nie stanowi zawarcia umowy. Jest to jedynie zapytanie, na które odpowiadamy w ciągu 24 godzin roboczych.</p>

          <h2 className="font-heading text-2xl text-foreground mt-10 mb-4">4. Prawa autorskie</h2>
          <p>Wszystkie treści, wizualizacje i projekty zamieszczone na stronie są własnością AN Projekt i podlegają ochronie prawnej.</p>

          <h2 className="font-heading text-2xl text-foreground mt-10 mb-4">5. Postanowienia końcowe</h2>
          <p>W sprawach nieuregulowanych niniejszym regulaminem zastosowanie mają przepisy prawa polskiego.</p>
        </div>
      </FadeIn>
    </div>
  </main>
);

export default Regulamin;
