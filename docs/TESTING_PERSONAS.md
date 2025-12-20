# Personaje de Testare - Înregistrare și Onboarding

Acest document conține personaje de testare pentru fiecare rol din platforma Yuvoo. Fiecare persona include toate informațiile necesare pentru testarea completă a procesului de înregistrare și onboarding.

---

## 1. Persona Părinte (Parent)

### Informații de Autentificare

- **Email**: `maria.popescu.test@yuvoo.ro`
- **Parolă**: `TestParola123!`
- **Rol**: `parent`

### Informații Personale

- **Prenume**: Maria
- **Nume**: Popescu
- **Telefon**: `+40721234567`
- **Oraș**: București
- **Sector**: Sector 2

### Informații Copil (pentru onboarding)

- **Prenume copil**: Andrei
- **Nume copil**: Popescu
- **Data nașterii**: `2018-03-15` (6 ani)
- **Gen**: Băiat

### Context de Utilizare

- **Scop**: Caută un sport potrivit pentru fiul ei de 6 ani
- **Nivel de experiență**: Utilizator nou, prima dată folosește platforma
- **Disponibilitate**: După-amiază, după ce îl ia pe copil de la grădiniță
- **Așteptări**: Vrea recomandări rapide și clare, preferă cluburi verificate

### Pași de Testare

1. Accesează `/auth/register`
2. Selectează rolul "Părinte"
3. Completează formularul de înregistrare:
   - Email: `maria.popescu.test@yuvoo.ro`
   - Parolă: `TestParola123!`
   - Confirmă parola
   - Acceptă termenii și condițiile GDPR
4. Verifică email-ul pentru confirmare
5. Completează onboarding-ul părinte:
   - Pas 1: Welcome screen
   - Pas 2: Adaugă copil (Andrei Popescu, 2018-03-15, Băiat)
   - Pas 3: Tour dashboard
   - Pas 4: Introducere quiz
   - Pas 5: Finalizare onboarding
6. Verifică redirecționarea către dashboard-ul părinte

---

## 2. Persona Administrator Club (Club Admin)

### Informații de Autentificare

- **Email**: `admin@clubul-sportiv-test.ro`
- **Parolă**: `ClubAdmin2024!`
- **Rol**: `club_admin`

### Informații Personale

- **Prenume**: Alexandru
- **Nume**: Ionescu
- **Telefon**: `+40722345678`
- **Funcție**: Administrator Club

### Informații Club (pentru onboarding)

- **Nume club**: Clubul Sportiv "Steaua Junior"
- **Tip sport**: `fotbal`
- **Oraș**: București
- **Sector**: Sector 1
- **Adresă**: Strada Sportului, Nr. 10, Sector 1, București
- **Telefon club**: `+40212345678`
- **Email club**: `contact@clubul-sportiv-test.ro`
- **Website**: `https://www.clubul-sportiv-test.ro`
- **Descriere**: Club de fotbal pentru copii cu programe pentru toate nivelurile, de la începători la avansați. Instalții moderne și antrenori certificați.

### Program (JSONB)

```json
[
  {
    "day": "Luni",
    "startTime": "16:00",
    "endTime": "18:00",
    "ageGroup": "6-8 ani",
    "level": "Începători"
  },
  {
    "day": "Miercuri",
    "startTime": "16:00",
    "endTime": "18:00",
    "ageGroup": "6-8 ani",
    "level": "Începători"
  },
  {
    "day": "Vineri",
    "startTime": "17:00",
    "endTime": "19:00",
    "ageGroup": "9-12 ani",
    "level": "Intermediari"
  }
]
```

### Prețuri (JSONB)

```json
[
  {
    "type": "Lunar",
    "amount": 250,
    "currency": "RON",
    "description": "Abonament lunar - 3 antrenamente/săptămână"
  },
  {
    "type": "Trimestrial",
    "amount": 650,
    "currency": "RON",
    "description": "Abonament trimestrial - reducere 15%"
  },
  {
    "type": "Anual",
    "amount": 2200,
    "currency": "RON",
    "description": "Abonament anual - reducere 25%"
  }
]
```

### Grupuri de Vârstă

- `[6, 7, 8, 9, 10, 11, 12]`

### Niveluri de Experiență

- `["Începători", "Intermediari", "Avansați"]`

### Documente de Verificare (pentru upload)

- Certificat de înregistrare (CUI)
- Autorizație funcționare
- Certificat antrenori
- Asigurare responsabilitate civilă
- Foto instalții

### Context de Utilizare

- **Scop**: Înregistrează clubul pe platformă pentru a primi lead-uri de la părinți
- **Nivel de experiență**: Utilizator nou, dar familiar cu procesele de verificare
- **Disponibilitate**: Dimineața, când are timp pentru documentație
- **Așteptări**: Vrea proces rapid de verificare, claritate asupra cerințelor

### Pași de Testare

1. Accesează `/auth/register`
2. Selectează rolul "Administrator Club"
3. Completează formularul de înregistrare:
   - Email: `admin@clubul-sportiv-test.ro`
   - Parolă: `ClubAdmin2024!`
   - Confirmă parola
   - Acceptă termenii și condițiile GDPR
4. Verifică email-ul pentru confirmare
5. Completează onboarding-ul club:
   - Pas 1: Welcome screen
   - Pas 2: Informații de bază despre club
     - Nume: "Clubul Sportiv Steaua Junior"
     - Tip sport: Fotbal
     - Descriere
   - Pas 3: Locație și contact
     - Oraș: București
     - Sector: Sector 1
     - Adresă completă
     - Telefon, email, website
   - Pas 4: Program și prețuri
     - Adaugă programul săptămânal
     - Configurează prețurile
   - Pas 5: Grupuri de vârstă și niveluri
   - Pas 6: Upload documente de verificare
   - Pas 7: Finalizare și trimitere pentru verificare
6. Verifică redirecționarea către dashboard-ul club
7. Verifică statusul de verificare: `pending` → `in_review` → `approved`

---

## 3. Persona Doctor (Doctor)

### Informații de Autentificare

- **Email**: `dr.ana.constantinescu.test@yuvoo.ro`
- **Parolă**: `DoctorTest2024!`
- **Rol**: `doctor`

### Informații Personale

- **Titlu**: Dr.
- **Prenume**: Ana
- **Nume**: Constantinescu
- **Telefon**: `+40723456789`
- **Funcție**: Specialist Ortopedie Pediatrică

### Informații Profesionale (pentru onboarding)

- **Specialitate principală**: `Ortopedie pediatrică`
- **Sub-specialități**:
  - `Traumatologie sportivă pediatrică`
  - `Corecție postură`
- **Credențiale**:
  - `MD - Medicină Generală`
  - `Specialist Ortopedie Pediatrică`
  - `Certificat Traumatologie Sportivă`
- **Ani de experiență**: `12`
- **Biografie**: Specialist în ortopedie pediatrică cu experiență în tratarea problemelor posturale și a accidentărilor sportive la copii. Colaborează cu numeroase cluburi sportive din București pentru evaluări medicale periodice.
- **Limbi vorbite**: `["Română", "Engleză", "Franceză"]`

### Locație

- **Oraș**: București
- **Sector**: Sector 2
- **Adresă**: Bulevardul Aviatorilor, Nr. 45, Sector 2, București

### Contact

- **Telefon cabinet**: `+40212345679`
- **Email cabinet**: `cabinet@dr-constantinescu.ro`
- **Website**: `https://www.dr-constantinescu.ro`

### Disponibilitate

- **Acceptă pacienți noi**: `true`
- **Consultații online**: `true`

### Program (JSONB)

```json
[
  {
    "day": "Luni",
    "startTime": "09:00",
    "endTime": "13:00",
    "type": "Consultatie"
  },
  {
    "day": "Luni",
    "startTime": "14:00",
    "endTime": "18:00",
    "type": "Consultatie"
  },
  {
    "day": "Miercuri",
    "startTime": "09:00",
    "endTime": "13:00",
    "type": "Consultatie"
  },
  {
    "day": "Miercuri",
    "startTime": "14:00",
    "endTime": "18:00",
    "type": "Consultatie"
  },
  {
    "day": "Vineri",
    "startTime": "09:00",
    "endTime": "13:00",
    "type": "Consultatie"
  }
]
```

### Documente de Verificare (pentru upload)

- Certificat de specializare
- Autorizație de funcționare cabinet
- Asigurare malpraxis
- Certificat colegiu medic
- Foto cabinet (opțional)

### Context de Utilizare

- **Scop**: Înregistrează profilul profesional pentru a primi referințe de la părinți
- **Nivel de experiență**: Utilizator nou, dar familiar cu platformele digitale
- **Disponibilitate**: Dimineața, înainte de consultații
- **Așteptări**: Vrea proces simplu, claritate asupra tipului de pacienți care vor fi direcționați

### Pași de Testare

1. Accesează `/auth/register`
2. Selectează rolul "Doctor"
3. Completează formularul de înregistrare:
   - Email: `dr.ana.constantinescu.test@yuvoo.ro`
   - Parolă: `DoctorTest2024!`
   - Confirmă parola
   - Acceptă termenii și condițiile GDPR
4. Verifică email-ul pentru confirmare
5. Completează onboarding-ul doctor:
   - Pas 1: Welcome screen
   - Pas 2: Informații personale
     - Titlu: Dr.
     - Prenume: Ana
     - Nume: Constantinescu
   - Pas 3: Informații profesionale
     - Specialitate: Ortopedie pediatrică
     - Sub-specialități
     - Credențiale
     - Ani de experiență: 12
     - Biografie
     - Limbi vorbite
   - Pas 4: Locație și contact
     - Oraș: București
     - Sector: Sector 2
     - Adresă completă
     - Telefon, email, website
   - Pas 5: Disponibilitate
     - Acceptă pacienți noi: Da
     - Consultații online: Da
     - Program
   - Pas 6: Upload documente de verificare
   - Pas 7: Finalizare și trimitere pentru verificare
6. Verifică redirecționarea către dashboard-ul doctor
7. Verifică statusul de verificare: `pending` → `in_review` → `approved`

---

## 4. Persona Părinte - Caz Complex (Multiple Copii)

### Informații de Autentificare

- **Email**: `familia.radu.test@yuvoo.ro`
- **Parolă**: `FamilieTest2024!`
- **Rol**: `parent`

### Informații Personale

- **Prenume**: Radu
- **Nume**: Georgescu
- **Telefon**: `+40724567890`
- **Oraș**: București
- **Sector**: Sector 3

### Informații Copii (pentru onboarding)

#### Copil 1

- **Prenume**: Elena
- **Nume**: Georgescu
- **Data nașterii**: `2015-07-20` (9 ani)
- **Gen**: Fată

#### Copil 2

- **Prenume**: David
- **Nume**: Georgescu
- **Data nașterii**: `2019-11-10` (5 ani)
- **Gen**: Băiat

### Context de Utilizare

- **Scop**: Caută sporturi pentru ambii copii, cu nevoi diferite
- **Nivel de experiență**: Utilizator intermediar, a mai folosit platforme similare
- **Disponibilitate**: Seara, după ce copiii se culcă
- **Așteptări**: Vrea să gestioneze ambii copii dintr-un singur cont, recomandări diferite pentru fiecare

### Pași de Testare

1. Accesează `/auth/register`
2. Selectează rolul "Părinte"
3. Completează formularul de înregistrare
4. Verifică email-ul pentru confirmare
5. Completează onboarding-ul:
   - Adaugă primul copil (Elena, 9 ani)
   - Completează quiz pentru Elena
   - Adaugă al doilea copil (David, 5 ani)
   - Completează quiz pentru David
6. Verifică că poate gestiona ambii copii din dashboard
7. Verifică că recomandările sunt diferite pentru fiecare copil

---

## Note de Testare

### Scenarii de Erori de Testat

1. **Email deja înregistrat**
   - Încearcă să se înregistreze cu un email existent
   - Verifică mesajul de eroare în română

2. **Parolă slabă**
   - Încearcă parolă fără majuscule, cifre sau caractere speciale
   - Verifică validarea parolei

3. **Câmpuri obligatorii**
   - Lasă câmpuri obligatorii goale
   - Verifică mesajele de validare

4. **Onboarding incomplet**
   - Încearcă să acceseze dashboard fără să completeze onboarding-ul
   - Verifică redirecționarea către onboarding

5. **Verificare documente**
   - Upload fișiere invalide (prea mari, format greșit)
   - Verifică mesajele de eroare

### Verificări Post-Onboarding

Pentru fiecare persona, după completarea onboarding-ului, verifică:

- [ ] Utilizatorul este redirecționat către dashboard-ul corect
- [ ] `onboardingCompleted` este setat pe `true` în baza de date
- [ ] `profileCompletionPercentage` este 100%
- [ ] Datele sunt salvate corect în baza de date
- [ ] Email-ul de confirmare a fost trimis
- [ ] Toate câmpurile obligatorii sunt completate
- [ ] Documentele (pentru club/doctor) sunt încărcate corect
- [ ] Statusul de verificare este setat corect (`pending` pentru club/doctor)

### Date de Test Suplimentare

Dacă ai nevoie de mai multe personaje pentru testare, poți crea variante folosind același format:

- Schimbă email-ul (ex: `maria.popescu.test2@yuvoo.ro`)
- Schimbă numele și prenumele
- Schimbă detaliile specifice (nume club, specialitate doctor, etc.)

---

**Ultima actualizare**: 2025-01-XX
**Versiune**: 1.0
