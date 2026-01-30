# Raport analiză legală – Pagini Yuvoo

## Rezumat executiv

Paginile legale din `src/app/(legal)/` sunt bine structurate, în română, cu operatorul corect (Neorimia SRL) și cu secțiuni clare pentru date, drepturi și contact. Nivelul de conformitate este bun, cu câteva lacune importante: lipsa unei secțiuni explicite privind **baza legală** a prelucrării în Politica de Confidențialitate (GDPR art. 13/14), **Stripe** nu este menționat ca procesator în Confidențialitate și în Politica de Cookie-uri (plățile sunt procesate prin Stripe în produs), iar în Termeni lipsesc secțiuni despre rezervări (diferențiere cluburi vs. doctori), despre răspundere (indemnizare) și despre încetarea contractului. Direcția principală a îmbunătățirilor: completare bazei legale, unificarea listei de terți (inclusiv Stripe) în toate documentele și alinierea la fluxurile reale (plăți, rezervări).

---

## 1. Confidențialitate (`/confidentialitate`)

### 1.1 Conformitate și lacune

- **Baza legală (GDPR art. 13/14):** Nu există o secțiune dedicată care să indice baza legală pentru fiecare categorie de prelucrare (executarea contractului, consimțământul, interesul legitim). Este o cerință esențială GDPR; utilizatorul trebuie să știe pe ce bază se prelucrează fiecare tip de date.
- **Procesatori:** Lista din secțiunea 4 (Stack Auth, Neon, Cloudinary, OpenAI, Brevo) este incompletă: **Stripe** este folosit în produs pentru plăți (quiz paywall, lead-uri cluburi, abonamente) și prelucrează date (inclusiv date de plată/identificare). Trebuie adăugat și menționat că nu stocăm datele de card.
- **Contact și termen de răspuns:** Secțiunea 5 indică corect gdpr@yuvoo.ro și termenul de 30 de zile; este conform.
- **Păstrare:** Perioadele sunt clare (cont 2 ani după dezactivare, quiz 3 ani, date tehnice 12 luni). OK.
- **Drepturi:** Toate drepturile GDPR (acces, rectificare, ștergere, portabilitate, opoziție, restricționare) sunt enumerate. OK.

### 1.2 Aliniere la produsul Yuvoo

- Fluxurile de **plăți** (Stripe) nu sunt reflectate: plăți pentru deblocarea rezultatelor quiz, plăți pay-per-lead pentru cluburi, abonamente Premium. Datele de plată (inclusiv cele trimise către Stripe) ar trebui menționate în „Date colectate” / „Partajarea datelor”.
- **Rezervări:** Politica menționează „confirmări de rezervare” în „Cum folosim datele”, dar nu diferențiază între rezervări la cluburi și consultații la doctori; dacă ambele există în aplicație, o mențiune scurtă ar asigura alinierea.
- **Email-uri:** Brevo este listat corect pentru emailuri transacționale; OK.

### 1.3 Îmbunătățiri sugerate (prioritate)

- **[Prioritate înaltă]** Adaugă o secțiune „Baza legală a prelucrării” (după „Cum folosim datele” sau integrată în secțiunea 3): indică pentru fiecare scop baza legală (ex.: executarea contractului pentru cont și servicii, consimțământul pentru recomandări AI și date despre copii, interes legitim pentru securitate și îmbunătățirea platformei). Text sugerat (fragment): „Prelucrăm datele tale pe baza: (1) executării contractului – pentru gestionarea contului și livrarea serviciilor; (2) consimțământului tău – pentru date despre copii și recomandări AI; (3) interesului nostru legitim – pentru securitate și îmbunătățirea platformei.”
- **[Prioritate înaltă]** Includere **Stripe** în secțiunea „Partajarea datelor”: „Stripe: procesarea plăților (carduri) pentru deblocarea rezultatelor quiz, plăți la cluburi și abonamente. Nu stocăm datele tale de card; Stripe procesează plățile în conformitate cu GDPR.”
- **[Prioritate medie]** Mențiune scurtă în secțiunea 2 sau 3 că datele legate de plăți (tranzacții, nu detaliile cardului) sunt folosite pentru procesarea plăților și facturare.
- **[Prioritate scăzută]** Verificare consistență formulare adresă (ex.: „Bl.p”, „Ap.b16”) cu datele oficiale ale operatorului; dacă sunt abreviaturi standard, păstrați-le consistente în toate cele patru pagini.

---

## 2. Termeni și condiții (`/termeni`)

### 2.1 Conformitate și lacune

- **Legea română și jurisdicție:** Secțiunea 7 indică corect legea română și instanțele competente din România. OK.
- **Limitarea răspunderii:** Secțiunile 6.1–6.4 acoperă disponibilitatea serviciului, recomandările AI, informațiile despre cluburi/specialiști și limitarea generală. OK.
- **Lipsesc:** (1) O secțiune explicită de **indemnizare** (utilizatorul acceptă să despăgubească Yuvoo/Neorimia pentru daune cauzate de încălcarea termenilor) – menționată în LEGAL_REVIEW_CHECKLIST; (2) O secțiune de **încetare** (cum se poate încheia contul, ce se întâmplă cu datele la încetare).

### 2.2 Aliniere la produsul Yuvoo

- Descrierea serviciului (secțiunea 2) corespunde produsului: AI Coach Quiz, directorul de cluburi, directorul de specialiști. OK.
- „Rezervări” nu sunt detaliate: în aplicație există fluxuri de rezervare/plată (cluburi, eventual doctori). Termenii ar trebui să facă clar că relația contractuală pentru serviciul efectiv (sportiv sau medical) este între părinte și club/specialist, iar Yuvoo facilitează doar conexiunea și, unde e cazul, plata.

### 2.3 Îmbunătățiri sugerate (prioritate)

- **[Prioritate înaltă]** Adaugă o subsecțiune scurtă despre **rezervări și plăți**: „Rezervările și plățile pentru încercări la cluburi sau consultații la specialiști sunt facilitate prin platformă. Contractul pentru serviciul sportiv sau medical este între tine și clubul/specialistul respectiv. Yuvoo nu este furnizorul acestor servicii.” Aliniază cu fluxurile reale (cluburi vs. doctori).
- **[Prioritate medie]** Adaugă o secțiune **Încetarea contului**: cum poate utilizatorul să-și încheie contul, că datele vor fi șterse conform Politicii de Confidențialitate și că unele date pot fi păstrate dacă legea o impune.
- **[Prioritate medie]** Adaugă o clauză de **indemnizare** (în măsura permisă de legea română): utilizatorul acceptă să răspundă pentru daune (reclamante, costuri) cauzate eșantionului/Neorimia prin încălcarea termenilor sau a legii.
- **[Prioritate scăzută]** Unifică denumirea „Reg. Comerțului” (sau „J”) în toate paginile legale pentru consistență.

---

## 3. Politica de cookie-uri (`/cookies`)

### 3.1 Conformitate și lacune

- **Tipuri de cookie-uri:** Esențiale, analiză și terți sunt prezentate; OK.
- **Cookie-uri terțe (secțiunea 3.3):** Sunt listate doar Stack Auth și Cloudinary. **Stripe** setează cookie-uri în fluxurile de plată; ar trebui menționat pentru transparență și aliniere cu Politica de Confidențialitate.
- **Consimțământ:** Nu este descris niciun mecanism de consimțământ pentru cookie-uri non-esențiale (banner, preferințe). LEGAL_REVIEW_CHECKLIST indică „dacă este implementat”; dacă există doar cookie-uri esențiale și analiză în scop legitim, menționați explicit că nu folosiți cookie-uri de marketing și cum utilizatorul poate controla setările (browser).

### 3.2 Aliniere la produsul Yuvoo

- Autentificare (Stack Auth) și imagini (Cloudinary) sunt corecte. Lipsa lui Stripe duce la neconcordanță cu Confidențialitate și cu realitatea produsului (plăți).

### 3.3 Îmbunătățiri sugerate (prioritate)

- **[Prioritate înaltă]** Adaugă **Stripe** la „Cookie-uri terțe”: „Stripe: cookie-uri necesare pentru procesarea în siguranță a plăților pe platformă (ex.: deblocare rezultate quiz, plăți cluburi).”
- **[Prioritate medie]** Menționează explicit că nu folosiți cookie-uri de publicitate/marketing și că utilizatorul poate gestiona cookie-urile prin setările browserului (link către secțiunea 5.1).
- **[Prioritate scăzută]** Dacă în viitor se introduce un banner sau un panou de preferințe pentru cookie-uri, actualizați politica și descrieți unde se gestionează consimțământul.

---

## 4. GDPR pentru părinți (`/gdpr-parinti`)

### 4.1 Conformitate și lacune

- **Consimțământ părinți (sub 16 ani):** Secțiunea 3 explică cerința de consimțământ și retragerea acestuia. OK.
- **Drepturi părinți și copii:** Secțiunile 5 și 6 acoperă drepturile și exercitarea lor directă de către copil (vârsta 13–14). OK.
- **ANSPDCP:** Secțiunea 10 indică corect autoritatea și datele de contact (site, email, adresă). OK.
- **Servicii terțe (secțiunea 4.2):** Sunt menționate Stack Auth, Neon, OpenAI; nu sunt menționate Cloudinary și Brevo. Pentru consistență cu Politica de Confidențialitate, lista ar trebui aliniată (inclusiv Cloudinary, Brevo); Stripe nu prelucrează în mod tipic date despre copii, deci nu e obligatoriu aici, dar poți menționa că plățile părinților sunt procesate prin terți (Stripe) conform politicii de confidențialitate.

### 4.2 Aliniere la produsul Yuvoo

- Datele despre copii (nume, dată naștere, gen, răspunsuri quiz, măsurători opționale) și scopurile (recomandări AI, cluburi, specialiști) sunt corecte. Nu se cer modificări de substanță, doar consistența listei de terți.

### 4.3 Îmbunătățiri sugerate (prioritate)

- **[Prioritate medie]** Aliniază lista de „Servicii terțe” din secțiunea 4.2 cu Politica de Confidențialitate: adaugă Cloudinary și Brevo acolo unde prelucrează date legate de copii (ex.: imagini profil, emailuri către părinte despre rezultate). Text sugerat: „Pentru funcționarea platformei, partajăm datele copiilor doar cu servicii terțe necesare: Stack Auth (autentificare), Neon (stocare), OpenAI (recomandări AI), Cloudinary (imagini), Brevo (emailuri). Toate respectă GDPR. Detalii în Politica noastră de Confidențialitate.”
- **[Prioritate scăzută]** Mențiune scurtă că plățile efectuate de părinți (ex.: pentru rezultate quiz) sunt procesate prin procesatori de plăți, fără a expune date despre copii acestor servicii, cu referință la Politica de Confidențialitate.

---

## 5. Aspecte transversale

- **Consistență între pagini:** Operatorul (Neorimia SRL, CUI 51196719, Reg. Comerțului J2025005816003) și adresa sunt aceleași în toate cele patru pagini. Lista de procesatori trebuie unificată: Confidențialitate și Cookie-uri să includă Stripe; GDPR pentru părinți să alinieze lista de terți (Cloudinary, Brevo) cu Confidențialitatea. Email GDPR: gdpr@yuvoo.ro; contact general: contact@yuvoo.ro – păstrați această separare.
- **Brand și ton:** Limbajul este în română, clar și accesibil. Tonul este profesional și potrivit pentru părinți; respectă orientarea „profesional, dar cald” din BRAND_GUIDELINES. Nu sunt necesare schimbări majore de ton.
- **Accesibilitate și claritate:** Ierarhia de titluri (H1, H2, H3) este corectă; secțiunile sunt ușor de găsit. Linkurile către celelalte pagini legale (confidentialitate, cookies) sunt utile. Breadcrumb și metadate (title, description, canonical) sunt prezente.

---

## 6. Verificare față de checklist

- **LEGAL_REVIEW_CHECKLIST.md:** Cele patru pagini acoperă majoritatea punctelor: identificarea operatorului (Neorimia SRL, nu „Yuvoo SRL” – în checklist apare Yuvoo SRL, în pagini este corect Neorimia SRL), drepturile GDPR, perioade de păstrare, contact, ANSPDCP. Lacune față de checklist: (1) Baza legală a prelucrării (confidențialitate); (2) Lista completă de terți, inclusiv Stripe; (3) Termeni: indemnizare, încetare; (4) Cookie-uri: consimțământ (dacă se implementează) și mențiunea Stripe. Checklistul menționează și funcționalități tehnice (export date, ștergere date, consimțământ cookie) – acestea sunt de implementare tehnică, nu doar de text în pagini.
- **LEGAL_PAGES_DEVELOPMENT_PLAN.md:** Structura și secțiunile planificate sunt respectate. Raportul de analiză completează etapa de legal review (Phase 4) cu sugestii concrete de îmbunătățire a conținutului.

---

**Data raportului:** 30 ianuarie 2026  
**Baza analizei:** Conținutul din `src/app/(legal)/` (confidentialitate, termeni, cookies, gdpr-parinti), LEGAL_REVIEW_CHECKLIST.md, LEGAL_PAGES_DEVELOPMENT_PLAN.md, BRAND_GUIDELINES.md, COPYWRITING_GUIDE.md și verificare în cod pentru procesatori (inclusiv Stripe).
