Mai jos este brief-ul detaliat, exclusiv pentru development, formulat ca document de specificație funcțională și de produs, fără copy de marketing, fără exemple de cod, fără UI mockups.
Textul poate fi folosit direct în Jira / Notion / README intern.

⸻

📘 Yuvoo – Brief Development

Soft Email Gate după Quiz (Faza 1)

⸻

1. 🎯 Scopul acestei funcționalități

Scopul este de a maximiza conversia în emailuri calificate, fără a afecta experiența utilizatorului și fără a compromite încrederea părintelui.

Funcționalitatea trebuie să permită:
• afișarea imediată a rezultatului principal al quiz-ului
• colectarea emailului opțional, pentru livrarea unui raport extins
• evitarea oricărei forme de blocare („hard gate”) a valorii de bază
• respectarea completă a principiilor GDPR și a unui UX „parent-first”

Această funcționalitate este critică pentru:
• validarea produsului
• construirea unui canal de comunicare cu părinții
• crearea unei relații pe termen lung, fără fricțiune inițială

⸻

2. 🧭 Principii de produs (obligatorii)

Toate deciziile de implementare trebuie să respecte următoarele principii:

1. Rezultatul quiz-ului NU este condiționat de email
2. Emailul este cerut doar pentru valoare suplimentară
3. Părintele are control total (fără cont implicit)
4. Nicio funcționalitate critică nu este ascunsă sau restricționată
5. Fluxul trebuie să fie simplu, rapid și clar
6. Colectarea datelor este minimă și explicită

Orice implementare care contrazice aceste principii este considerată incorectă.

⸻

3. 🧩 Context funcțional

Funcționalitatea este declanșată imediat după finalizarea AI Coach Quiz.

Există trei stări principale ale utilizatorului:

1. utilizator neautentificat
2. utilizator care oferă email (fără cont)
3. utilizator care decide ulterior să își creeze cont

Acest brief acoperă doar primele două stări.

⸻

4. 🔁 Fluxul funcțional complet

4.1 Finalizarea quiz-ului

După completarea ultimei întrebări:
• sistemul procesează răspunsurile
• generează recomandările personalizate
• utilizatorul este redirecționat către ecranul de rezultate

Această redirecționare NU trebuie să includă pași intermediari.

⸻

4.2 Afișarea rezultatului inițial (necondiționat)

Pe ecranul de rezultat trebuie afișate imediat:
• sportul principal recomandat
• scorul de compatibilitate
• explicația de bază a recomandării
• un preview limitat al cluburilor potrivite
• eventuale atenționări generale (fără detalii medicale)

Această secțiune este complet accesibilă fără email și fără cont.

⸻

4.3 Secțiunea de „valoare extinsă” (Soft Email Gate)

Sub rezultatul inițial trebuie să existe o secțiune clar delimitată care:
• explică ce informații suplimentare pot fi oferite
• oferă posibilitatea introducerii emailului
• NU blochează interacțiunea cu restul paginii

Această secțiune este considerată un call-to-action opțional, nu un pas obligatoriu.

⸻

5. 📩 Colectarea emailului (fără cont)

5.1 Condiții de afișare

Formularul de email apare:
• doar după afișarea rezultatului
• o singură dată per sesiune (nu pop-up agresiv)
• fără redirecționare automată

⸻

5.2 Comportament funcțional

La introducerea emailului:
• NU se creează automat cont de utilizator
• NU se solicită parolă
• NU se declanșează autentificare
• emailul este salvat separat ca „lead fără cont”

⸻

5.3 Validări obligatorii
• validare format email
• prevenire submit duplicat
• protecție basic anti-abuz (rate limit)

⸻

5.4 Consimțământ (GDPR)

Este obligatoriu:
• checkbox explicit de consimțământ
• text clar despre ce informații vor fi trimise
• mențiune explicită că utilizatorul se poate dezabona oricând

Fără bifarea consimțământului:
• formularul nu poate fi trimis

⸻

6. 📧 Livrarea raportului pe email

6.1 Timp de livrare

Emailul trebuie trimis:
• automat
• în maximum 60 de secunde de la submit
• fără acțiuni suplimentare din partea utilizatorului

⸻

6.2 Conținutul raportului (nivel funcțional)

Raportul trimis pe email trebuie să includă:
• datele copilului (așa cum au fost introduse)
• sportul principal recomandat
• lista completă de sporturi potrivite (top 5)
• explicații detaliate pentru fiecare sport
• sporturi mai puțin potrivite (dacă există)
• recomandări generale de început
• preview extins de cluburi relevante
• mențiune despre posibilitatea de a crea cont ulterior

Conținutul emailului este considerat parte din produs, nu notificare.

⸻

7. 🔄 Comportament ulterior (re-engagement)

După trimiterea emailului:
• utilizatorul rămâne pe pagina de rezultate
• nu este redirecționat automat
• i se poate afișa un mesaj de confirmare non-intruziv

Nu se declanșează:
• redirect către login
• pop-up de creare cont
• alte cereri de date personale

⸻

8. 📊 Tracking & evenimente (obligatoriu)

Pentru validarea produsului, trebuie track-uite următoarele evenimente:
• quiz_completed
• result_viewed
• email_gate_viewed
• email_submitted
• email_sent_success
• email_opened
• email_link_clicked
• account_created_after_email (dacă se întâmplă ulterior)

Evenimentele trebuie să poată fi corelate anonim înainte de creare cont.

⸻

9. 🧱 Structură logică a datelor (conceptual)

Trebuie să existe separare clară între:
• utilizatori cu cont
• lead-uri fără cont

Un lead:
• poate avea email
• poate avea asociat un quiz
• poate fi convertit ulterior într-un utilizator

Conversia trebuie să fie:
• explicită
• inițiată de utilizator
• fără creare automată de cont

⸻

10. 🚫 Comportamente interzise

Nu este permis:
• afișarea unui ecran de tip „pentru a vedea rezultatul, introdu emailul”
• ascunderea rezultatului complet în spatele emailului
• crearea automată de cont
• solicitarea parolei
• pop-up-uri agresive
• mesaje de tip FOMO sau presiune
• folosirea datelor copilului în scopuri de marketing fără consimțământ

⸻

11. 🧪 Criterii de acceptanță (QA)

Funcționalitatea este considerată corect implementată dacă:
• utilizatorul poate vedea rezultatul fără email
• emailul este opțional
• raportul este trimis corect și rapid
• datele sunt salvate corect
• consimțământul este clar și respectat
• tracking-ul funcționează
• experiența este fluidă pe mobile

⸻

12. 🔮 Extensibilitate (pentru fazele următoare)

Această implementare trebuie să permită ulterior:
• trimiterea de rapoarte periodice (re-evaluare la 3 luni)
• notificări despre cluburi noi
• invitarea utilizatorului să creeze cont
• activarea unui abonament premium
• integrarea cu calendarul familiei

⸻

13. 📌 Concluzie

Această funcționalitate este un punct-cheie de diferențiere Yuvoo.

Implementarea corectă:
• crește conversia
• păstrează încrederea
• validează produsul
• creează bazele relației cu părintele

Este preferată o implementare simplă, clară și etică, în detrimentul uneia agresive sau orientate exclusiv pe lead-uri.

⸻

Dacă vrei, următorul pas logic poate fi:
• transformarea acestui brief în epic + user stories
• checklist de QA
• diagramă de flow (doar logică)
• sau integrarea lui ca standard de produs în documentația Yuvoo
