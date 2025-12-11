Mai jos ai o descriere detaliată, profesionist formulată, a Fazei 1 Yuvoo — exact tipul de text ce poate fi folosit în documentație internă, granturi, discuții cu investitori, parteneri și echipă.

⸻

📘 Yuvoo – Descriere Detaliată a Proiectului (Faza 1 – MVP Sport)

Perioadă: primele 3 luni de dezvoltare
Obiectiv principal: lansarea unui MVP funcțional care validează fluxul complet „Descoperă sportul potrivit → găsește clubul potrivit → conectează-te cu specialiști” pentru părinții din România, începând cu București.

⸻

1. 🧭 Viziunea Fazei 1

Faza 1 își propune să stabilească fundamentele produsului Yuvoo, concentrându-se exclusiv pe sporturile pentru copii cu vârste între 4 și 14 ani. Scopul este de a demonstra că:

1. Părinții au nevoie de un instrument digital care să-i ajute să aleagă sportul potrivit pentru copil.
2. Ei apreciază existența unui catalog verificat de cluburi sportive pentru copii.
3. Integrarea unui flux de recomandare medicală (prin specialiști pediatri) crește încrederea și gradul de adoptare.
4. Yuvoo poate rezolva problema fragmentării informației și poate oferi un parcurs coerent, complet și intuitiv.

Faza 1 validează că piața răspunde pozitiv la triunghiul de valoare Yuvoo:
AI Coach → Cluburi Verificate → Specialiști Pediatri.

⸻

2. 🎯 Obiectivele Fazei 1

2.1 Obiective funcționale
• Dezvoltarea unui AI Coach Quiz capabil să recomande 3–5 sporturi potrivite pentru fiecare copil.
• Implementarea unei baze de date de cluburi sport orientate pe copii, cu filtre precum: sport, vârstă acceptată, nivel, zonă, program.
• Crearea sistemului de verificare pentru cluburi (status: verificat, în curs de verificare).
• Dezvoltarea primelor profiluri de specialiști pediatrici relevanți sportului (ortopezi, nutriționiști, psihologi).
• Configurarea profilului de părinte și a profilurilor de copil.
• Generarea unui flux complet de recomandări: quiz → sporturi recomandate → cluburi potrivite → specialist recomandat (dacă este nevoie).
• Crearea unui landing page și a unui proces de onboarding pentru părinți.

2.2 Obiective de validare
• Demonstrarea interesului pentru AI Sport Coach în România.
• Verificarea utilității listelor de cluburi sport pentru părinți.
• Testarea dorinței părinților de a consulta un specialist pentru probleme legate de postura, accidentări sau anxietate în sport.
• Colectarea primelor date legate de rata de conversie în cadrul fluxului complet.
• Evaluarea intenției de cumpărare pentru serviciile viitoare (trial bundles, abonamente premium, rezervări la cluburi).

⸻

3. 🧩 Funcționalități incluse în Faza 1

3.1 AI Coach Quiz (v1)

Este componenta centrală a Fazei 1 și punctul de intrare pentru majoritatea utilizatorilor.

Caracteristicile-cheie:
• Întrebări structurate pe teme: interese, personalitate, nivel de energie, preferințe sociale, posibile restricții medicale, istoric sportiv.
• Set de reguli capabile să coreleze răspunsurile cu diferite sporturi.
• Generarea unei liste de sporturi potrivite, ordonate în funcție de relevanță.
• Explicații clare pentru părinți, într-un limbaj accesibil.
• Atenționări pentru posibile riscuri sau recomandări medicale.

Rezultat așteptat: fiecare utilizator primește o listă personalizată de sporturi potrivite copilului său, însoțită de argumente și sugestii.

⸻

3.2 Directorul de Cluburi (bază inițială)

Platforma va include un director minimal de cluburi, orientat exclusiv către sporturile pentru copii.

Conținutul profilului de club:
• Nume, localizare, date de contact
• Sporturi oferite și grupele de vârstă acceptate
• Prețuri aproximative (dacă sunt disponibile)
• Fotografii și descrierea clubului
• Statutul de verificare Yuvoo
• O scurtă descriere a antrenorilor (opțional)
• Link-uri externe pentru înscriere sau contact

Filtrare și căutare:
• După sport
• După vârstă
• După zona orașului
• După nivel (începători/avansați)
• După cluburi verificate

Scop în Faza 1: accesul părinților la o listă curată, structurată, ușor de navigat a cluburilor relevante din București.

⸻

3.3 Sistemul de Verificare a Cluburilor

Crearea unui proces minimal, dar credibil, prin care un club poate obține badge-ul „Verificat Yuvoo”.

Elemente incluse:
• Verificarea identității juridice a clubului
• Confirmarea suprafețelor și dotărilor de bază
• Verificarea calificării minime a antrenorilor
• Confirmarea existenței unui protocol minimal de siguranță
• Review intern al echipei Yuvoo

Acesta întărește poziționarea Yuvoo ca platformă „sigură și orientată spre dezvoltarea sănătoasă a copiilor”.

⸻

3.4 Director de Specialiști Pediatri (v1)

Include profilurile a 5–10 specialiști cu rol clar:
• Ortoped pediatru
• Pediatru generalist
• Nutriționist pentru copii
• Psiholog sportiv

Elemente ale profilului specialistului:
• Nume, foto, specializare
• Clinica sau cabinetul
• Experiență relevantă în sportul pentru copii
• Domenii de interes (ex: postura, accidentări, obezitate, anxietate)
• Modalități de contact (telefon, email, link programări)

Integrare cu AI Coach:
Când quiz-ul detectează semnale de risc, părintele primește recomandarea de a consulta un specialist.

⸻

3.5 Cont de Părinte și Profilurile de Copii

Pentru a personaliza experiența:

Permite:
• Crearea unui cont de părinte
• Adăugarea unuia sau mai multor copii
• Salvarea rezultatelor quiz-ului
• Vizualizarea recomandărilor de sport
• Acces la cluburi potrivite pentru fiecare copil

Nu include încă gestionarea programelor (aceasta este faza 2).

⸻

3.6 Landing Page & Onboarding

Elemente incluse:
• Pagină principală cu mesaj clar: „Descoperă sportul potrivit copilului tău”
• Explicarea procesului în 3 pași
• Formular de înscriere
• Redirecționare către quiz
• Micro-copy pentru încredere: badge-uri, verificări, specialiști

⸻

4. 🧱 Arhitectura proiectului în Faza 1

Faza 1 urmărește să creeze fundația tehnică necesară scalării ulterioare.

4.1 Componenta Frontend
• Aplicație web progresivă (PWA)
• Framework modern, rapid, orientat pe UX intuitiv
• Formulare ușor de parcurs, cu validări clare
• Interfețe simple pentru cluburi și specialiști (citire, nu editare completă în MVP)

⸻

4.2 Componenta Backend
• API backend uniform pentru quiz, utilizatori, cluburi și specialiști
• Bază de date pentru toate entitățile MVP
• Sistem de autentificare cu email
• Stocare a rezultatelor recomandărilor și a profilurilor copiilor
• Capacitate de extindere ulterioară pentru sistemul de rezervări

⸻

4.3 Componenta AI / Logică de Recomandare

În Faza 1, AI-ul funcționează pe un model de reguli:
• Corelarea răspunsurilor cu caracteristicile sporturilor din baza de date
• Evaluări de compatibilitate
• Identificarea sporturilor nepotrivite
• Generarea unei explicații lizibile pentru părinți
• Detectarea riscurilor (ex: dureri de spate, anxietate la competiții)

În fazele viitoare, această logică va fi îmbunătățită cu modele ML.

⸻

5. 📌 Fluxul principal al utilizatorului (Faza 1)
   1. Părintele intră pe site / landing page
   2. Creează un cont sau începe direct quiz-ul
   3. Completează AI Coach Quiz
   4. Primește recomandările personalizate
   5. Alege un sport → vede cluburi potrivite
   6. Opțional: vede specialiști dacă există semnale de risc
   7. Salvează rezultatele în cont
   8. Poate adăuga un copil sau repeta quiz-ul

⸻

6. 🔍 KPIs (Indicatori pentru succes în Faza 1)
   • Număr de quiz-uri completate: 1000+
   • Rată de finalizare quiz: >70%
   • Rată de click către cluburi: >40%
   • Număr de cluburi verificate în București: 30+
   • Număr de specialiști în platformă: 5–10
   • Număr de conturi create: 500+
   • Feedback pozitiv: 80% dintre utilizatori declară că ar recomanda produsul

⸻

7. 🧪 Plan de Validare cu Utilizatori

Faza 1 include o componentă importantă de cercetare:

Testare cu părinți
• Minim 20 de interviuri
• Testare UX a quiz-ului
• Evaluarea clarității recomandărilor
• Analiza modului în care părinții aleg un club

Testare cu cluburi
• Înțelegerea modului în care cluburile își doresc să primească lead-uri
• Validarea sistemului de verificare

Testare cu specialiști
• Validarea triggerelor medicale
• Stabilirea protocoalelor de recomandare

⸻

8. 📅 Cronologia Fazei 1

Luna 1
• Finalizarea designului și UX-ului
• Implementarea AI Coach Quiz
• Implementarea sistemului de utilizatori și profiluri
• Construirea structurii de date pentru sporturi

Luna 2
• Implementarea directoriului de cluburi
• Integrarea verificării
• Implementarea profilurilor specialiștilor
• UX pentru recomandările complete
• Landing page & onboarding

Luna 3
• Testare și optimizări
• Onboarding cluburi și specialiști reali
• Beta public în București
• Colectare feedback și iterare rapidă

⸻

9. 🚀 Livrabile finale pentru Faza 1
   • Interfață completă pentru părinți cu AI Coach Quiz
   • Sistem funcțional de recomandări sportive
   • Directorul inițial de cluburi sport din București
   • Sistem minimal de verificare a cluburilor
   • Directorul de specialiști pediatrici
   • Conturi pentru părinți și copii
   • Landing page și micro-copy pentru încredere
   • Dashboard minimal pentru administratori
   • Date reale din primele testări și interviuri

⸻

10. 🧨 Limite ale Fazei 1

Nu sunt incluse în această etapă:
• Rezervări cu plată
• Calendar familial
• Integrare cu Google Calendar
• Dashboard avansat pentru cluburi
• Recenzii publice din partea părinților
• ML avansat pentru recomandări
• Funcționalități pentru activități non-sportive

Acestea se vor implementa în Faza 2 și Faza 3.
