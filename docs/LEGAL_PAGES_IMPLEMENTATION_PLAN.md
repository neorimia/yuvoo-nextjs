# Plan de implementare – Îmbunătățiri pagini legale Yuvoo

**Bazat pe:** [LEGAL_ANALYSIS_REPORT.md](./LEGAL_ANALYSIS_REPORT.md)  
**Data:** 30 ianuarie 2026  
**Fișiere țintă:** `src/app/(legal)/confidentialitate/page.tsx`, `termeni/page.tsx`, `cookies/page.tsx`, `gdpr-parinti/page.tsx`

---

## Rezumat

| Fază       | Descriere                                            | Prioritate     | Estimare |
| ---------- | ---------------------------------------------------- | -------------- | -------- |
| **Faza 1** | Confidențialitate: baza legală + Stripe + date plăți | Înaltă         | 1–2 ore  |
| **Faza 2** | Termeni: rezervări/plăți, încetare, indemnizare      | Înaltă / Medie | 1–2 ore  |
| **Faza 3** | Cookie-uri: Stripe + mențiuni consimțământ/marketing | Înaltă / Medie | ~30 min  |
| **Faza 4** | GDPR părinți: aliniere listă terți                   | Medie          | ~30 min  |
| **Faza 5** | Consistență transversală (adresă, Reg. Comerțului)   | Scăzută        | ~15 min  |

**Reguli:** Toate textele noi în română. Nu inventa companii/CUI/terți – doar ce e în raport și în cod. După fiecare fază: verificare lint, build, citire rapidă a paginii.

---

## Faza 1 – Politică de Confidențialitate (`/confidentialitate`)

**Fișier:** `src/app/(legal)/confidentialitate/page.tsx`

### 1.1 Adăugare secțiune „Baza legală a prelucrării” (prioritate înaltă)

- **Locație:** După secțiunea 3 „Cum folosim datele” (după `</div>` care închide secțiunea 3), inserează o secțiune nouă **3.1** sau redenumește secțiunile următoare (4→5, 5→6, etc.) și adaugă secțiunea **4. Baza legală a prelucrării**.
- **Recomandare:** Păstrezi numerotarea actuală (1–9) și inserezi o subsecțiune **3.1 Baza legală** în secțiunea 3, sau adaugi secțiunea nouă ca „4. Baza legală” și numerotezi din nou 4→5, 5→6, …, 9→10. Cel mai simplu: adaugi un bloc nou după lista din secțiunea 3, cu titlu H2 „4. Baza legală a prelucrării” și restul secțiunilor se renumerează (4→5, 5→6, 6→7, 7→8, 8→9, 9→10).

**Text propus (română):**

```md
## 4. Baza legală a prelucrării

Prelucrăm datele tale pe baza:

- **Executarea contractului** – pentru crearea și gestionarea contului tău, livrarea serviciilor (recomandări, cluburi, specialiști), procesarea plăților și comunicarea cu tine în legătură cu serviciul.
- **Consimțământul tău** – pentru datele despre copii și pentru generarea recomandărilor personalizate prin AI Coach (inclusiv trimiterea răspunsurilor la OpenAI). Poți retrage consimțământul oricând.
- **Interesul nostru legitim** – pentru securitatea platformei, prevenirea fraudelor, îmbunătățirea funcționalităților și analiza utilizării (în formă agregată, fără identificare individuală), în măsura în care drepturile tale nu au prioritate.

În cazul în care baza legală este consimțământul, ai dreptul să retragi consimțământul oricând, fără a afecta legalitatea prelucrării efectuate înainte de retragere.
```

- **Acțiuni:** (1) Inserează secțiunea nouă. (2) Renumerotează toate secțiunile H2 de la 4 la 10 (4→5, 5→6, … 9→10). (3) Actualizează orice referințe interne (ex. „vezi secțiunea 5” → „vezi secțiunea 6”) dacă există.

### 1.2 Includere Stripe în „Partajarea datelor” (prioritate înaltă)

- **Locație:** În secțiunea „Partajarea datelor” (după renumerotare va fi secțiunea 5), în lista de servicii terțe (`<ul>`), adaugă un element nou după Brevo.

**Text propus:**

```html
<li>
  <strong>Stripe:</strong> Procesarea plăților (carduri) pentru deblocarea rezultatelor quiz, plăți
  la cluburi (pay-per-lead, abonamente Premium) și alte tranzacții pe platformă. Nu stocăm datele
  tale de card; Stripe procesează plățile în conformitate cu GDPR.
</li>
```

### 1.3 Mențiune date legate de plăți în „Date colectate” sau „Cum folosim datele” (prioritate medie)

- **Locație 1 (recomandat):** În secțiunea 2 „Datele pe care le colectăm”, adaugă o subsecțiune **2.5. Date legate de plăți** (sau integrează în 2.3 Date tehnice).

**Text propus (variantă scurtă în 2.3):**

În lista din 2.3 Date tehnice, adaugă:

- „Date legate de tranzacții (identificator plată, sumă, dată) – pentru procesarea plăților și facturare; detaliile cardului sunt procesate direct de Stripe și nu le stocăm.”

Sau, ca subsecțiune separată **2.5. Date legate de plăți:**

- „Pentru plăți pe platformă (deblocare rezultate quiz, plăți la cluburi, abonamente) colectăm doar date necesare procesării (identificator tranzacție, sumă, dată). Detaliile cardului sunt introduse direct în Stripe și nu le stocăm.”

### 1.4 Verificare consistență adresă (prioritate scăzută)

- **Locație:** Secțiunea Contact (la final). Verifică cu datele oficiale ale Neorimia SRL: „Bl.p”, „Ap.b16” – dacă sunt corecte, păstrează-le la fel în toate cele 4 pagini; altfel corectează și unifică în toate paginile legale.

---

## Faza 2 – Termeni și condiții (`/termeni`)

**Fișier:** `src/app/(legal)/termeni/page.tsx`

### 2.1 Subsecțiune „Rezervări și plăți” (prioritate înaltă)

- **Locație:** După secțiunea 2 „Descrierea serviciului”, adaugă o subsecțiune nouă (ex. 2.1 sau ca paragraf final în secțiunea 2).

**Variantă – paragraf în secțiunea 2:**

După paragraful „Yuvoo nu este un furnizor direct…” adaugă:

```md
Rezervările și plățile pentru încercări la cluburi sau consultații la specialiști sunt facilitate prin platformă. Contractul pentru serviciul sportiv sau medical este încheiat între tine și clubul sau specialistul respectiv. Yuvoo nu este furnizorul acestor servicii și nu răspunde pentru obligațiile cluburilor sau ale specialiștilor.
```

### 2.2 Secțiune „Încetarea contului” (prioritate medie)

- **Locație:** După secțiunea 6 „Limitarea răspunderii” și înainte de „Rezolvarea disputelor” (care va deveni secțiunea 8). Introduci secțiunea nouă ca **7. Încetarea contului**. Renumerotezi: 7→8, 8→9, 9→10.

**Text propus:**

```md
## 7. Încetarea contului

Poți încheia contul oricând din setările contului sau prin contactarea noastră la contact@yuvoo.ro. La încetare, încetăm accesul tău la servicii și procesăm datele tale personale conform Politicii de Confidențialitate (inclusiv ștergerea, în termenul acolo prevăzut). Unele date pot fi păstrate dacă legea o impune (ex.: evidență contabilă, litigii).
```

### 2.3 Clauză indemnizare (prioritate medie)

- **Locație:** După „Limitarea răspunderii” (secțiunea 6), poți adăuga o subsecțiune **6.5. Indemnizare** sau un paragraf în secțiunea 6.

**Text propus (subsecțiune 6.5):**

```md
### 6.5. Indemnizare

În măsura permisă de legea română, accepti să răspunderi și să despăgubești Neorimia SRL și Yuvoo pentru daune, reclamante, costuri și cheltuieli (inclusiv onorarii rezonabile de avocat) cauzate de încălcarea acestor termeni sau a legilor aplicabile de către tine sau de utilizarea contului tău.
```

### 2.4 Consistență „Reg. Comerțului” (prioritate scăzută)

- **Locație:** În toate cele 4 pagini, verifică că formularea este identică (ex. „Reg. Comerțului: J2025005816003” sau „J40/2025” – conform documentelor oficiale). Aliniază în termeni, cookies, gdpr-parinti cu confidentialitate.

---

## Faza 3 – Politică Cookie-uri (`/cookies`)

**Fișier:** `src/app/(legal)/cookies/page.tsx`

### 3.1 Adăugare Stripe la „Cookie-uri terțe” (prioritate înaltă)

- **Locație:** Secțiunea 3.3 „Cookie-uri terțe”, în `<ul>`, după Cloudinary.

**Text propus:**

```html
<li>
  <strong>Stripe:</strong> Cookie-uri necesare pentru procesarea în siguranță a plăților pe
  platformă (ex.: deblocare rezultate quiz, plăți la cluburi).
</li>
```

### 3.2 Mențiune „fără cookie-uri marketing” + control prin browser (prioritate medie)

- **Locație:** După secțiunea 3 (Tipuri de cookie-uri) sau la începutul secțiunii 5 „Cum poți gestiona cookie-urile”, adaugă un paragraf scurt.

**Text propus (la începutul secțiunii 5):**

```md
Nu folosim cookie-uri de publicitate sau marketing. Poți gestiona sau șterge cookie-urile prin setările browserului (vezi mai jos).
```

### 3.3 Notă pentru viitor – banner/preferințe (prioritate scăzută)

- **Acțiune:** Nu se implementează acum. În planul de produs / backlog: când se introduce banner sau panou de preferințe cookie, actualizează politica (secțiune nouă „Consimțământ” și unde se gestionează).

---

## Faza 4 – GDPR pentru părinți (`/gdpr-parinti`)

**Fișier:** `src/app/(legal)/gdpr-parinti/page.tsx`

### 4.1 Aliniere listă „Servicii terțe” (prioritate medie)

- **Locație:** Secțiunea 4.2 „Servicii terțe”. Înlocuiește paragraful curent cu o listă aliniată cu Politica de Confidențialitate (inclusiv Cloudinary, Brevo).

**Text propus:**

```md
Pentru funcționarea platformei, partajăm datele copiilor doar cu servicii terțe necesare: Stack Auth (autentificare), Neon (stocare), OpenAI (recomandări AI), Cloudinary (imagini), Brevo (emailuri). Toate aceste servicii respectă GDPR și au măsuri de securitate adecvate. Plățile efectuate de părinți (ex.: pentru rezultate quiz) sunt procesate prin alți procesatori (ex.: Stripe), conform Politicii noastre de Confidențialitate; datele copiilor nu sunt transmise pentru procesarea plăților. Pentru detalii complete, vezi [Politica noastră de Confidențialitate](/confidentialitate).
```

- Păstrează linkul existent către `/confidentialitate`.

### 4.2 Mențiune plăți părinți (prioritate scăzută)

- Deja acoperit în textul de la 4.1 (procesare plăți părinți prin Stripe, fără date copii). Nu e nevoie de alineat suplimentar.

---

## Faza 5 – Consistență transversală (toate paginile)

### 5.1 Formulare adresă și Reg. Comerțului

- **Confidentialitate:** Sursă de adevăr pentru operator și adresă. Verifică: „Jud. Vrancea, Mun. Focsani, Bld. Dimitrie Cantemir, Nr.3, Bl.p, Sc.1, Ap.b16” și „Reg. Comerțului: J2025005816003”.
- **Termeni, Cookies, GDPR părinți:** Aliniază exact aceleași formulări (operator: „Neorimia SRL (CUI: 51196719, Reg. Comerțului: J2025005816003)”, adresă identică).
- **Contact:** GDPR/date personale → gdpr@yuvoo.ro; întrebări generale/termeni → contact@yuvoo.ro. Păstrează această separare în toate paginile.

### 5.2 Lista unificată de procesatori (referință)

După implementare, lista de terți menționați în Confidențialitate trebuie să fie:

| Procesator | Scop (scurt)                                           |
| ---------- | ------------------------------------------------------ |
| Stack Auth | Autentificare, sesiuni                                 |
| Neon       | Baza de date                                           |
| Cloudinary | Imagini (cluburi, doctori, avatare)                    |
| OpenAI     | Recomandări AI Coach                                   |
| Brevo      | Emailuri transacționale                                |
| Stripe     | Plăți (quiz, cluburi, abonamente); nu stocăm date card |

Cookie-uri: Stack Auth, Cloudinary, Stripe (și eventual analiză, dacă e cazul).  
GDPR părinți: Stack Auth, Neon, OpenAI, Cloudinary, Brevo + mențiune plăți (Stripe) conform Confidențialitate.

---

## Checklist final

- [x] Faza 1 – Confidențialitate: baza legală, Stripe, date plăți, adresă
- [x] Faza 2 – Termeni: rezervări/plăți, încetare, indemnizare, Reg. Comerțului
- [x] Faza 3 – Cookies: Stripe, fără marketing, control browser
- [x] Faza 4 – GDPR părinți: listă terți + Cloudinary, Brevo, mențiune Stripe
- [x] Faza 5 – Verificare consistență: operator, adresă, contact pe toate cele 4 pagini
- [ ] `npm run lint` fără erori
- [ ] `npm run build` reușit
- [ ] Citire rapidă a fiecărei pagini în browser (navigare, linkuri, titluri)

---

## Referințe

- [LEGAL_ANALYSIS_REPORT.md](./LEGAL_ANALYSIS_REPORT.md) – sursa îmbunătățirilor
- [LEGAL_REVIEW_CHECKLIST.md](./LEGAL_REVIEW_CHECKLIST.md) – puncte de verificare
- [LEGAL_PAGES_DEVELOPMENT_PLAN.md](./LEGAL_PAGES_DEVELOPMENT_PLAN.md) – structura paginilor
- [BRAND_GUIDELINES.md](./BRAND_GUIDELINES.md) – ton și limbaj
