# Medical Expert Review – Checklist

Checklist pentru validarea implementării de siguranță medicală a chestionarului AI Coach (copii 4–14 ani). Recomandat: review de către **medic pediatru** sau **specialist în medicină sportivă / cardiologie pediatrică / neurologie pediatrică**.

**Documentație de referință**: [MEDICAL_SAFETY.md](./MEDICAL_SAFETY.md), [QUIZ_MEDICAL_SAFETY_IMPLEMENTATION_PLAN.md](./QUIZ_MEDICAL_SAFETY_IMPLEMENTATION_PLAN.md).

---

## 1. Screening în chestionar

| #   | Verificare                                                                                                    | Notă (da/nu/observații) |
| --- | ------------------------------------------------------------------------------------------------------------- | ----------------------- |
| 1.1 | Întrebările de screening cardiac (simptome la efort, istoric familial) sunt clare și adecvate pentru părinți? |                         |
| 1.2 | Întrebările despre concuzie (recentă, multiple) sunt corecte din punct de vedere medical?                     |                         |
| 1.3 | Opțiunile de severitate pentru astm (ușor/moderat/sever) sunt corecte?                                        |                         |
| 1.4 | Întrebarea despre folosirea inhalatorului înainte de sport este potrivită?                                    |                         |
| 1.5 | Opțiunile de severitate pentru dureri articulare sunt adecvate?                                               |                         |
| 1.6 | Tipurile de accidentare (fractură, placă de creștere, luxație, entorsă, concuzie) acoperă cazurile relevante? |                         |
| 1.7 | Perioadele „când s-a întâmplat” (<1 lună, 1–3 luni, etc.) sunt utile pentru decizie?                          |                         |
| 1.8 | Textul de avertizare afișat la condiții critice este corect și nu induce frică excesivă?                      |                         |

---

## 2. Excludere sporturi

| #   | Verificare                                                                                                    | Notă (da/nu/observații) |
| --- | ------------------------------------------------------------------------------------------------------------- | ----------------------- |
| 2.1 | Excluderea sporturilor de contact / intensitate ridicată la **simptome cardiace** este corectă?               |                         |
| 2.2 | Excluderea la **istoric familial moarte cardiacă sub 50** este adecvată?                                      |                         |
| 2.3 | Excluderea sporturilor de contact la **concuzie recentă** și **concuzii multiple** este corectă?              |                         |
| 2.4 | Regulile pentru **accidentare placă de creștere** (excludere impact/sărituri până la vindecare) sunt corecte? |                         |
| 2.5 | Regulile pentru **astm sever** (evitare endurance/intensitate ridicată) sunt adecvate?                        |                         |
| 2.6 | Regulile pentru **dureri articulare severe/moderate** sunt rezonabile?                                        |                         |
| 2.7 | Recomandarea de sport de siguranță (ex. înot) când toate sunt excluse este acceptabilă?                       |                         |
| 2.8 | Categorizarea sporturilor (contact, high-impact, endurance, low-impact) este corectă pentru România?          |                         |

---

## 3. Detectare semnale de risc și specialiști

| #   | Verificare                                                                                     | Notă (da/nu/observații) |
| --- | ---------------------------------------------------------------------------------------------- | ----------------------- |
| 3.1 | Recomandarea de **cardiolog** la simptome/istoric cardiac este corectă?                        |                         |
| 3.2 | Recomandarea de **neurolog** la concuzie recentă/multiple este corectă?                        |                         |
| 3.3 | Recomandarea de **ortoped** la dureri articulare severe/moderate și accidentări este adecvată? |                         |
| 3.4 | Recomandarea de **pneumolog** la astm sever este potrivită?                                    |                         |
| 3.5 | Prioritatea specialiștilor (cardiolog/neurolog > ortoped > etc.) este rezonabilă?              |                         |
| 3.6 | Textele (motivații) afișate pentru fiecare specialist sunt corecte și în română?               |                         |

---

## 4. Reguli în promptul AI (texte și instrucțiuni)

| #   | Verificare                                                                                              | Notă (da/nu/observații) |
| --- | ------------------------------------------------------------------------------------------------------- | ----------------------- |
| 4.1 | Contraindicațiile absolute descrise în prompt (cardiac, concuzie, placă de creștere) sunt corecte?      |                         |
| 4.2 | Instrucțiunile de severitate (ușor/moderat/sever) pentru condiții medicale sunt adecvate?               |                         |
| 4.3 | Exemplele pentru astm (ușor vs moderat vs sever) sunt corecte?                                          |                         |
| 4.4 | Vârstele minime pentru sporturi competitive/recreative sunt rezonabile (sau ce ajustări sunt necesare)? |                         |
| 4.5 | Mesajul „evaluare medicală înainte de orice sport” în cazuri critice este adecvat?                      |                         |

---

## 5. Limitări și disclaimer

| #   | Verificare                                                                                                                           | Notă (da/nu/observații) |
| --- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| 5.1 | Utilizatorul este suficient de informat că chestionarul **nu înlocuiește** consultul medical?                                        |                         |
| 5.2 | Există risc de interpretare greșită (ex. „am trecut de chestionar, deci pot face orice sport”)? Dacă da, ce text să fie îmbunătățit? |                         |
| 5.3 | Alte condiții pediatrice importante care ar trebui incluse în viitor (ex. diabet, epilepsie, tulburări de vedere)?                   |                         |

---

## 6. Concluzie review

| Câmp                                  | Conținut                                                                                                                  |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Review realizat de**                | (nume, titlu, contact)                                                                                                    |
| **Data**                              |                                                                                                                           |
| **Concluzie generală**                | ☐ Aprobat pentru utilizare în stadiul actual / ☐ Aprobat cu recomandări minore / ☐ Necesită modificări înainte de lansare |
| **Recomandări prioritare**            | (lista scurtă)                                                                                                            |
| **Observații pentru fază ulterioară** | (îmbunătățiri opționale)                                                                                                  |

---

După completare, acest checklist poate fi atașat la issue/PR sau arhivat în `docs/`; bifarea „Medical expert review completed” în [QUIZ_IMPLEMENTATION_CHECKLIST.md](./QUIZ_IMPLEMENTATION_CHECKLIST.md) se face după ce review-ul este finalizat.
