// Wewnetrzna konfiguracja zdjec z realizacji Nowowiejska.
// UWAGA: Ta tablica nie jest jeszcze nigdzie publicznie renderowana.
// Sluzy tylko jako roboczy katalog do selekcji zdjec na blog / social /
// kandydatow do portfolio. Po zatwierdzeniu przez Anie i Wojtka
// poszczegolne pozycje moga zostac uzyte na blogu lub w sekcji realizacji.

import nowowiejska1 from "@/assets/nowowiejska/nowowiejska-1.webp";
import nowowiejska2 from "@/assets/nowowiejska/nowowiejska-2.webp";
import nowowiejska3 from "@/assets/nowowiejska/nowowiejska-3.webp";
import nowowiejska4 from "@/assets/nowowiejska/nowowiejska-4.webp";
import nowowiejska5 from "@/assets/nowowiejska/nowowiejska-5.webp";
import nowowiejska6 from "@/assets/nowowiejska/nowowiejska-6.webp";
import nowowiejska7 from "@/assets/nowowiejska/nowowiejska-7.webp";
import nowowiejska8 from "@/assets/nowowiejska/nowowiejska-8.webp";

export type NowowiejskaUse =
  | "blog" // dobrej jakosci, gotowe do wpisu blogowego
  | "social" // raczej format pionowy, dobry dla IG
  | "portfolioCandidate" // mocny kadr, do oceny pod portfolio
  | "reject"; // nie uzywac

export type NowowiejskaRoom =
  | "kuchnia"
  | "salon"
  | "jadalnia"
  | "schody"
  | "lazienka"
  | "inne";

export interface NowowiejskaPhoto {
  id: string;
  filename: string;
  src: string;
  /** Oryginalna nazwa pliku z aparatu Ani (jesli zmapowana). */
  originalFilename?: string;
  room: NowowiejskaRoom;
  recommendedUse: NowowiejskaUse;
  alt: string;
  note?: string;
}

export const nowowiejskaPhotos: NowowiejskaPhoto[] = [
  {
    id: "now-01",
    filename: "nowowiejska-1.webp",
    src: nowowiejska1,
    originalFilename: "20260203_115359.jpg",
    room: "kuchnia",
    recommendedUse: "portfolioCandidate",
    alt: "Kuchnia z marmurowa wyspa, bezowymi frontami i drewniana podloga w jodelke",
    note: "Mocny detal marmuru i okapu, czysty kadr. Pionowy - dobry do bloga lub IG.",
  },
  {
    id: "now-02",
    filename: "nowowiejska-2.webp",
    src: nowowiejska2,
    originalFilename: "20260203_115631.jpg",
    room: "jadalnia",
    recommendedUse: "portfolioCandidate",
    alt: "Jadalnia z drewnianym stolem, rozowymi krzeslami i designerska lampa nad wyspa",
    note: "Szeroki kadr, dobry hero do wpisu blogowego o aranzacji jadalni.",
  },
  {
    id: "now-03",
    filename: "nowowiejska-3.webp",
    src: nowowiejska3,
    originalFilename: undefined,
    room: "jadalnia",
    recommendedUse: "blog",
    alt: "Jadalnia od strony stolu, lampy w klatkach, marmurowa wyspa w tle",
    note: "Brak jednoznacznego dopasowania do screenow Ani - prawdopodobnie alternatywny kadr 115631. Do potwierdzenia.",
  },
  {
    id: "now-04",
    filename: "nowowiejska-4.webp",
    src: nowowiejska4,
    originalFilename: "20260203_115930.jpg",
    room: "kuchnia",
    recommendedUse: "blog",
    alt: "Otwarta kuchnia z marmurowa wyspa, salon i schody w tle",
    note: "Pokazuje przejscie kuchnia - salon, dobry kontekst do wpisu o open space.",
  },
  {
    id: "now-05",
    filename: "nowowiejska-5.webp",
    src: nowowiejska5,
    originalFilename: "20260203_115415.jpg",
    room: "schody",
    recommendedUse: "social",
    alt: "Detal klatki schodowej z roslinami w bieli i czerni",
    note: "Pionowy kadr, naturalne swiatlo - mocny detal pod IG, ewentualnie blog o detalach.",
  },
  {
    id: "now-06",
    filename: "nowowiejska-6.webp",
    src: nowowiejska6,
    originalFilename: "20260203_115833.jpg",
    room: "salon",
    recommendedUse: "portfolioCandidate",
    alt: "Salon z drewniana sciana TV, jasna sofa i okraglymi stolikami",
    note: "Najmocniejszy kadr salonu, idealny jako cover wpisu blogowego o salonach.",
  },
  {
    id: "now-07",
    filename: "nowowiejska-7.webp",
    src: nowowiejska7,
    originalFilename: "20260203_115857.jpg",
    room: "kuchnia",
    recommendedUse: "blog",
    alt: "Kuchnia z marmurowa wyspa, jasnymi frontami i firanami w tle",
    note: "Dobre swiatlo dzienne, nadaje sie jako ilustracja w blogu.",
  },
  {
    id: "now-08",
    filename: "nowowiejska-8.webp",
    src: nowowiejska8,
    originalFilename: "20260203_115921.jpg",
    room: "salon",
    recommendedUse: "portfolioCandidate",
    alt: "Panorama salon - jadalnia - kuchnia z duzymi oknami i jasnymi firanami",
    note: "Najszerszy kadr calego open space, kandydat na hero portfolio.",
  },
];

/**
 * Oryginaly zdjec ze screenow Ani, ktorych NIE MA w paczce zoptymalizowanej (.webp).
 * Trzeba je dosluc, zanim trafia na strone.
 */
export const nowowiejskaMissingOriginals: { originalFilename: string; reason: string }[] = [
  {
    originalFilename: "20260203_115805.jpg",
    reason: "Pionowy detal stopni schodow - brak w paczce nowowiejska-*.webp.",
  },
  {
    originalFilename: "20260203_120041.jpg",
    reason: "Lazienka z wolnostojaca wanna - brak w paczce nowowiejska-*.webp.",
  },
];
