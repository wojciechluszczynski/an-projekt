import FadeIn from "@/components/FadeIn";

const PolitykaPrywatnosci = () => (
  <main className="pt-40 pb-24">
    <div className="max-w-[800px] mx-auto px-6 md:px-12">
      <FadeIn>
        <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-12">Polityka prywatności</h1>
        <div className="prose prose-lg font-body text-muted-foreground">
          <h2 className="font-heading text-2xl text-foreground mt-10 mb-4">1. Administrator danych</h2>
          <p>Administratorem danych osobowych jest Anna Nowak, prowadząca działalność gospodarczą pod nazwą AN Projekt, z siedzibą w Odrzykoniu, woj. podkarpackie.</p>

          <h2 className="font-heading text-2xl text-foreground mt-10 mb-4">2. Zakres zbieranych danych</h2>
          <p>Zbieramy dane osobowe podane dobrowolnie przez użytkowników w formularzu kontaktowym: imię, nazwisko, numer telefonu, adres e-mail oraz treść wiadomości.</p>

          <h2 className="font-heading text-2xl text-foreground mt-10 mb-4">3. Cel przetwarzania</h2>
          <p>Dane przetwarzane są w celu odpowiedzi na zapytania, przygotowania wyceny projektu oraz nawiązania współpracy.</p>

          <h2 className="font-heading text-2xl text-foreground mt-10 mb-4">4. Prawa użytkownika</h2>
          <p>Każdy użytkownik ma prawo dostępu do swoich danych, ich sprostowania, usunięcia lub ograniczenia przetwarzania. Kontakt: anna@anprojekt.com.pl</p>

          <h2 className="font-heading text-2xl text-foreground mt-10 mb-4">5. Pliki cookies</h2>
          <p>Strona może wykorzystywać pliki cookies w celu zapewnienia prawidłowego funkcjonowania serwisu oraz analityki.</p>
        </div>
      </FadeIn>
    </div>
  </main>
);

export default PolitykaPrywatnosci;
