# Fleet Management System

Ova aplikacija je razvijena kao dio tehničkog intervjua i predstavlja sistem za vođenje voznog parka firme. Aplikacija je izgrađena koristeći moderne web tehnologije poput Next.js, Tailwind CSS, Prisma, Zod i Recharts. Podaci se pohranjuju u online hostanu PostgreSQL bazu podataka.

## Tehnologije korištene u projektu

- **Next.js** - React framework za izgradnju server-side rendered i statickih web aplikacija.
- **Tailwind CSS** - Utilitarni CSS framework za brzo i prilagodljivo stiliziranje.
- **Prisma** - ORM alat za jednostavno rukovanje bazama podataka.
- **Zod** - Biblioteka za deklarativnu validaciju i parsiranje podataka.
- **Recharts** - Biblioteka za vizualizaciju podataka putem grafikona.
- **PostgreSQL** - Relacijska baza podataka hostana online.
- **bcrypt & JWT** - Alati za autentifikaciju korisnika i šifrovanje lozinki.

## Ključni funkcionalnosti

1. **Evidencija automobila**
   - Kreiranje novih automobila
   - Ažuriranje podataka o postojećim automobilima
   - Brisanje automobila iz baze podataka

2. **Kreiranje putnih naloga**
   - Unos podataka o putovanjima povezanih sa vozilima
   - Upravljanje statusima i detaljima putnih naloga

3. **Generisanje izvještaja**
   - Filtriranje izvještaja prema vozilu (pojedinačno ili sva vozila)
   - Odabir vremenskog perioda (datum od - datum do)
   - Vizualizacija podataka koristeći grafikone putem Recharts biblioteke

## Autentifikacija korisnika

- **bcrypt** se koristi za šifrovanje lozinki korisnika.
- **JWT (JSON Web Tokens)** se koristi za autentifikaciju i autorizaciju korisnika.

### Vrste korisnika:

1. **Admin**
   - Može kreirati, ažurirati i brisati automobile iz baze podataka.
   - Ima pristup svim funkcionalnostima sistema.

2. **User**
   - Može pregledati informacije o vozilima i kreirati putne naloge.
   - Nema mogućnost izmjene ili brisanja podataka o vozilima.



**Autor:** Damir Bajrami

**Licenca:** MIT

