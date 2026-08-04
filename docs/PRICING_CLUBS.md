PARTEA 2 — MONETIZARE CLUBURI

„Cereri de la părinți + Premium Club (vizibilitate)”

Context

Yuvoo indexează cluburi sportive și activități pentru copii. Contactul între părinți și cluburi este **gratuit** pentru ambele părți. Monetizarea cluburilor se face prin **Premium** (vizibilitate, badge, listare prioritară), nu prin deblocarea contactului.

⸻

Principii de business (obligatorii)
• Cluburile NU plătesc ca să apară
• Contactul părinte ↔ club este GRATUIT
• Premium = vizibilitate și credibilitate, nu acces la date
• Fără abonamente forțate pentru contact
• Cerere = interes explicit de la un părinte real

⸻

Flow funcțional – Părinte (B2C)

1. Pagina de club

Pe toate paginile de club sunt afișate datele de contact directe (telefon, email, website) când există în profil.

Este disponibil și un formular opțional:

CTA secundar: „Trimite un mesaj prin Yuvoo”

⸻

2. Click pe formular → Modal cerere

Modalul conține:
• explicație: contactul este gratuit; formularul trimite un mesaj structurat către club

Câmpuri obligatorii:
• Nume părinte
• Email
• Telefon (opțional, dar recomandat)
• Vârsta copilului
• Mesaj scurt (opțional)

După submit:
• părintele vede confirmare
• clubul primește email cu datele de contact ale părintelui
• NU i se promite răspuns garantat

⸻

Flow funcțional – Platformă (Yuvoo)

3. Crearea cererii

După submit:
• se creează o cerere asociată cu clubul, sportul, orașul, vârsta copilului
• clubul primește notificare email cu date de contact complete
• cererea are status: „Nou”, „În așteptare”, „Acceptat”, „Expirat”
• valabilitate limitată (ex: 5 zile) pentru follow-up

⸻

Flow funcțional – Club (B2B)

4. Notificare Club (Email)

Clubul primește email cu:
• sport, vârstă copil, locație
• nume, email, telefon părinte
• CTA: contactează părintele / vezi în dashboard

⸻

5. Premium Club (opțional)

Clubul poate upgrade la Premium pentru:
• badge „Verificat Yuvoo”
• afișare prioritară în listări
• profil evidențiat
• notificări instant

Premium NU deblochează contact — contactul este deja gratuit.

⸻

UX & Copy Rules (critice)

Pentru părinți:
• Mesaj clar: „Contactul clubului este gratuit”
• NU afișa prețuri B2B
• Formularul Yuvoo = mesaj structurat opțional

Pentru cluburi:
• NU folosi termenul „lead” în UI
• folosește: „cerere”, „părinte interesat”
• Mesaj clar: „Contactul cu părinții este gratuit”

⸻

Fallback logic (obligatoriu)

Dacă clubul NU răspunde:
• după 48h → reminder automat
• după 5 zile → cerere expirată
• părintele primește mesaj: „Îți recomandăm alte cluburi similare”

⸻

Ce NU trebuie să facă implementarea
• NU bloca datele părintelui în spatele unui paywall
• NU bloca contactul clubului pentru părinți
• NU trimite datele părintelui fără consimțământ
• NU promite cluburilor rezultate garantate

⸻

Rezumat

Părinții văd contactul clubului direct pe pagină. Pot trimite opțional o cerere prin Yuvoo. Cluburile primesc datele părintelui gratuit (email + dashboard). Premium se vinde pe vizibilitate, nu pe deblocarea contactului.
