PARTEA 2 — MONETIZARE CLUBURI

„Lead-uri de la părinți + Premium Club”

Context

Yuvoo indexează cluburi sportive și activități pentru copii. Majoritatea cluburilor NU doresc să plătească abonamente upfront. Prin urmare, monetizarea trebuie să fie bazată pe cerere reală (lead-uri validate), nu pe promisiuni de vizibilitate.

Această funcționalitate transformă interesul părintelui într-un lead blocat, pe care clubul îl poate debloca prin:
• plată per lead
• sau upgrade la Premium Club

⸻

Principii de business (obligatorii)
• Cluburile NU plătesc ca să apară
• Cluburile plătesc DOAR când există interes real
• Fără abonamente forțate
• Fără fricțiune mare la primul contact
• Lead = cerere explicită de la un părinte real

⸻

Flow funcțional – Părinte (B2C)

1. Pagina de club (FREE sau PREMIUM)

Pe paginile cluburilor fără premium, NU sunt afișate datele de contact directe ale clubului.

Este afișat un buton clar:

CTA: „Sunt interesat”

⸻

2. Click pe „Sunt interesat” → Modal Lead

Modalul trebuie să conțină:
• explicație scurtă:
„Trimite interesul tău către acest club. Te vom anunța dacă acesta răspunde.”

Câmpuri obligatorii:
• Nume părinte
• Email
• Telefon (opțional, dar recomandat)
• Vârsta copilului
• Mesaj scurt (opțional)

După submit:
• părintele vede status: „Interes trimis către club”
• NU vede datele clubului
• NU i se promite răspuns garantat

⸻

Flow funcțional – Platformă (Yuvoo)

3. Crearea Lead-ului (Locked Lead)

După submit:
• se creează un lead blocat
• lead-ul este asociat cu:
• clubul
• sportul
• orașul
• vârsta copilului
• lead-ul are status:
• „Nou”
• „În așteptare”
• „Acceptat”
• „Expirat”

Lead-ul are valabilitate limitată (ex: 5 zile).

⸻

Flow funcțional – Club (B2B)

4. Notificare Club (Email)

Clubul primește un email automat cu conținut FOARTE CONCRET:

„Un părinte caută [SPORT] pentru copil de [VÂRSTĂ] ani, în [ORAȘ].
Vrei să vezi datele de contact?”

Emailul NU conține:
• nume părinte
• email
• telefon

⸻

5. Opțiuni Club (Paywall B2B)

Clubul are două opțiuni clare:

🟢 Opțiunea A — Pay per Lead
• 3 € / lead
• plată unică
• după plată:
• clubul vede datele părintelui
• lead-ul devine „Acceptat”

🟣 Opțiunea B — Upgrade Premium Club
• 199 lei / an
Include:
• badge „Verificat Yuvoo”
• acces nelimitat la lead-uri
• afișare prioritară în listări
• date de contact vizibile pentru părinți
• notificări instant pentru lead-uri noi

⸻

UX & Copy Rules (critice)

Pentru părinți:
• NU afișa „clubul trebuie să plătească”
• NU afișa prețuri B2B
• mesajul trebuie să fie:
„Trimitem interesul tău către club”

Pentru cluburi:
• NU folosi termenul „lead”
• folosește:
• „cerere”
• „părinte interesat”
• „oportunitate”

⸻

Fallback logic (obligatoriu)

Dacă clubul NU răspunde:
• după 48h → reminder automat
• după 5 zile → lead expirat
• părintele primește mesaj:
„Îți recomandăm alte cluburi similare”

⸻

KPI-uri de business (pentru monitorizare)
• Lead submit rate (părinte): ≥10% din vizitatori pagină club
• Lead accept rate (club): ≥30%
• Time to accept: <48h
• Conversie Pay per Lead → Premium: ≥10–15%

⸻

Ce NU trebuie să facă implementarea
• NU afișa datele părintelui gratuit
• NU trimite datele părintelui fără consimțământ
• NU promite cluburilor rezultate
• NU bloca accesul cluburilor la platformă dacă nu plătesc

⸻

Rezumat pentru Cursor (1 paragraf)

Implementarea trebuie să creeze un sistem de lead-uri blocate: părintele trimite interes prin butonul „Sunt interesat”, Yuvoo creează un lead fără a afișa datele părintelui, clubul primește notificare și poate debloca datele prin plată per lead (3 €) sau prin upgrade la Premium Club (199 lei/an), cu logică de expirare, fallback pentru părinți și UX care protejează încrederea ambelor părți.
