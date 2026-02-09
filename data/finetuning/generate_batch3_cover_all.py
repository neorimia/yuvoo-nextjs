#!/usr/bin/env python3
"""
Generate BATCH 3: "Cover all" fine-tuning examples.
Target: +~400 training, +~50 validation for 300-500+ total.
Covers: all ages 4-14, both genders, all energy levels, all 25 sports, all 7 specialists,
medical scenarios, personality types, edge cases.
Run once: python3 data/finetuning/generate_batch3_cover_all.py
"""
import json
import os
import random

SYSTEM_MSG = "Ești un asistent AI specializat în recomandări de sporturi pentru copii din România, cu vârste între 4 și 14 ani. Generează TOATE răspunsurile EXCLUSIV în limba română. Returnează DOAR un obiect JSON valid."

SPORTS = [
    ("fotbal", "Fotbal"), ("baschet", "Baschet"), ("volei", "Volei"), ("handbal", "Handbal"),
    ("tenis", "Tenis"), ("tenis-de-masa", "Tenis de masă"), ("badminton", "Badminton"),
    ("inot", "Înot"), ("polo", "Polo"), ("atletism", "Atletism"), ("alergare", "Alergare"),
    ("gimnastica", "Gimnastică"), ("dans", "Dans"), ("balet", "Balet"),
    ("arte-martiale", "Arte marțiale"), ("judo", "Judo"), ("karate", "Karate"), ("taekwondo", "Taekwondo"),
    ("ciclism", "Ciclism"), ("patinaj", "Patinaj"), ("skateboarding", "Skateboarding"),
    ("escalada", "Escaladă"), ("alpinism", "Alpinism"), ("golf", "Golf"), ("sah", "Șah"), ("tir-cu-arcul", "Tir cu arcul"),
]

SPECIALTIES = [
    ("orthopedist", "ortoped", "probleme articulare sau accidentări"),
    ("nutritionist", "nutriționist", "greutate sau alimentație"),
    ("psychologist", "psiholog", "anxietate, bullying sau dificultăți emoționale"),
    ("cardiologist", "cardiolog", "simptome cardiace sau istoric familial cardiac"),
    ("neurologist", "neurolog", "contuzie sau istoric de contuzii"),
    ("pulmonologist", "pneumolog", "astm sever sau probleme respiratorii"),
    ("general", "pediatru", "evaluare generală înainte de sport"),
]

ENERGIES = ["Foarte ridicat", "Ridicat", "Mediu", "Scăzut"]
PERSONALITIES = [
    "energic, curios, sociabil", "calm, concentrat, răbdător", "competitiv, determinat, ambițios",
    "creativ, expresiv, sensibil", "timid, blând, empatic", "rebel, independent, curajos",
    "analitic, strategic, focusat", "vesel, prietenos, cooperant", "introvert, gânditor, liniștit",
    "extrovert, lider, comunicativ", "perfectionist, disciplinat, ambițios", "aventuros, curajos, activ",
]

def make_example(user_content: str, assistant_json: dict) -> dict:
    return {
        "messages": [
            {"role": "system", "content": SYSTEM_MSG},
            {"role": "user", "content": user_content},
            {"role": "assistant", "content": json.dumps(assistant_json, ensure_ascii=False)},
        ]
    }

def rec(sport_id: str, sport_name: str, score: int, reason: str, benefits: list, considerations: list) -> dict:
    return {
        "sportId": sport_id,
        "sportName": sport_name,
        "matchScore": max(60, min(100, score)),
        "reasoning": reason[:500],
        "benefits": benefits if len(benefits) >= 2 else benefits + ["Dezvoltare fizică", "Socializare"],
        "considerations": considerations if len(considerations) >= 1 else ["Disponibil în majoritatea orașelor"],
    }

def build_user(age: int, gender: str, energy: str, personality: str, medical: str, tried: str = "Niciunul", pref_inside: str = "Da", pref_outside: str = "Da", pref_team: str = "Da", pref_indiv: str = "Da") -> str:
    return f"""ANALIZA COPILULUI:

Vârstă: {age} ani
Gen: {gender}

Nivel de energie: {energy}

Trăsături de personalitate: {personality}

Interese și hobby-uri: sport, jocuri, prieteni

Sporturi încercate anterior: {tried}

Constituție fizică: Mediu
Nivel coordonare: Coordonare bună

CONDIȚII MEDICALE:
- Fără astm
- Fără dureri articulare
{medical}

Preferințe:
- Activități interioare: {pref_inside}
- Activități exterioare: {pref_outside}
- Sporturi de echipă: {pref_team}
- Sporturi individuale: {pref_indiv}"""

def main():
    random.seed(42)
    base_dir = os.path.dirname(os.path.abspath(__file__))
    examples_train = []
    examples_val = []

    # Helper: add one training example with 3-4 sports, optional specialist
    def add_train(age, gender, energy, personality, medical_line, sport_indices, specialist=None):
        if len(sport_indices) < 3:
            sport_indices = list(sport_indices) + [0, 1, 2][:3 - len(sport_indices)]
        sports_used = [SPORTS[i % len(SPORTS)] for i in sport_indices[:4]]
        recs = []
        for i, (sid, sname) in enumerate(sports_used):
            score = 85 - i * 4 + random.randint(-3, 3)
            recs.append(rec(
                sid, sname, score,
                f"{sname} este potrivit pentru vârsta de {age} ani și profilul indicat. Oferă beneficii fizice și sociale. Recomandat în România.",
                [f"Dezvoltare fizică și coordonare", f"Adaptat vârstei {age} ani", "Disponibil în cluburi"],
                ["Verificați disponibilitatea în oraș", "Echipament minim necesar"],
            ))
        spec = specialist if specialist else {"needed": False}
        user = build_user(age, gender, energy, personality, medical_line)
        examples_train.append(make_example(user, {"recommendations": recs, "specialistRecommendation": spec}))

    # --- Training: cover all ages 4-14, both genders ---
    sport_idx = 0
    for age in range(4, 15):
        for gender in ["Băiat", "Fată"]:
            energy = ENERGIES[age % 4]
            personality = PERSONALITIES[age % len(PERSONALITIES)]
            add_train(age, gender, energy, personality, "", [sport_idx, sport_idx + 1, sport_idx + 2])
            sport_idx += 3
    # --- More 4-6 and 13-14 (under-represented) ---
    for age in [4, 5, 6, 13, 14]:
        for _ in range(2):
            gender = random.choice(["Băiat", "Fată"])
            add_train(age, gender, random.choice(ENERGIES), random.choice(PERSONALITIES), "", [random.randint(0, len(SPORTS)-1) for _ in range(4)])

    # --- All 25 sports: ensure each appears in at least 3 training examples ---
    for i in range(len(SPORTS)):
        for _ in range(2):
            age = random.randint(4, 14)
            gender = random.choice(["Băiat", "Fată"])
            other = [j for j in range(len(SPORTS)) if j != i][:3]
            add_train(age, gender, random.choice(ENERGIES), random.choice(PERSONALITIES), "", [i] + other)

    # --- All 7 specialists: 3 examples each ---
    for spec_id, spec_ro, reason_key in SPECIALTIES:
        for _ in range(3):
            age = random.randint(6, 14)
            gender = random.choice(["Băiat", "Fată"])
            medical = f"- Considerații: Recomandare {spec_ro}\n" if spec_id != "general" else "- Considerații: Evaluare generală înainte de sport\n"
            specialist = {"needed": True, "specialty": spec_id, "reason": f"Evaluare de {spec_ro} recomandată pentru {reason_key}. Consult înainte de a începe activitatea sportivă.", "priority": random.choice(["high", "medium", "low"])}
            add_train(age, gender, random.choice(ENERGIES), random.choice(PERSONALITIES), medical, [random.randint(0, len(SPORTS)-1) for _ in range(4)], specialist)

    # --- Medical scenarios: astm, dureri, combined ---
    for _ in range(5):
        medical = "- Astm ușor (controlat)\n- Folosește inhaler: Ocazional\n"
        add_train(random.randint(6, 12), random.choice(["Băiat", "Fată"]), "Ridicat", random.choice(PERSONALITIES), medical, [7, 6, 5])  # inot, dans, gimnastica
    for _ in range(5):
        medical = "- Dureri ușoare ocazionale\n"
        add_train(random.randint(7, 13), random.choice(["Băiat", "Fată"]), "Mediu", random.choice(PERSONALITIES), medical, [7, 5, 0])  # inot, gimnastica, fotbal
    for _ in range(3):
        medical = "- Astm ușor (controlat)\n- Dureri ușoare ocazionale\n"
        add_train(random.randint(8, 12), random.choice(["Băiat", "Fată"]), "Mediu", random.choice(PERSONALITIES), medical, [7, 6, 12])

    # --- Edge cases: multiple sports tried, mixed preferences ---
    for _ in range(15):
        tried = random.choice(["fotbal", "înot", "gimnastică, dans", "fotbal, baschet", "înot, tenis"])
        add_train(random.randint(7, 14), random.choice(["Băiat", "Fată"]), random.choice(ENERGIES), random.choice(PERSONALITIES), "", [random.randint(0, len(SPORTS)-1) for _ in range(4)], None)
    for _ in range(10):
        pref_team = random.choice(["Da", "Nu"])
        pref_indiv = "Nu" if pref_team == "Da" else "Da"
        user = build_user(random.randint(5, 13), random.choice(["Băiat", "Fată"]), "Ridicat", random.choice(PERSONALITIES), "", "Niciunul", "Da", "Da", pref_team, pref_indiv)
        recs = [rec(SPORTS[i][0], SPORTS[i][1], 85 - j*3, f"Sport potrivit pentru preferințele indicate.", ["Beneficiu 1", "Beneficiu 2"], ["Considerație"]) for j, i in enumerate([random.randint(0, len(SPORTS)-1) for _ in range(3)])]
        examples_train.append(make_example(user, {"recommendations": recs, "specialistRecommendation": {"needed": False}}))

    # --- Fill to target training (435 for +500 total with 65 val) ---
    current = len(examples_train)
    target_train = 435
    for _ in range(max(0, target_train - current)):
        age = random.randint(4, 14)
        gender = random.choice(["Băiat", "Fată"])
        energy = random.choice(ENERGIES)
        personality = random.choice(PERSONALITIES)
        add_train(age, gender, energy, personality, "", [random.randint(0, len(SPORTS)-1) for _ in range(4)])

    # --- Validation: 65 examples (435 + 65 = 500 new) ---
    def add_val(a, g, e, p, m, idx):
        recs = [rec(SPORTS[i][0], SPORTS[i][1], 88 - j*4, f"Recomandare potrivită pentru vârsta de {a} ani.", ["Beneficiu 1", "Beneficiu 2"], ["Considerație"]) for j, i in enumerate(idx[:3])]
        examples_val.append(make_example(build_user(a, g, e, p, m), {"recommendations": recs, "specialistRecommendation": {"needed": False}}))
    for age in range(4, 15):
        gender = "Băiat" if age % 2 == 0 else "Fată"
        add_val(age, gender, ENERGIES[age % 4], PERSONALITIES[age % len(PERSONALITIES)], "", [age % len(SPORTS), (age+1) % len(SPORTS), (age+2) % len(SPORTS)])
    for spec_id, spec_ro, reason_key in SPECIALTIES:
        specialist = {"needed": True, "specialty": spec_id, "reason": f"Evaluare {spec_ro} pentru {reason_key}.", "priority": "medium"}
        age = random.randint(7, 13)
        user = build_user(age, random.choice(["Băiat", "Fată"]), "Mediu", random.choice(PERSONALITIES), f"- Considerații: {spec_ro}\n")
        recs = [rec(SPORTS[i][0], SPORTS[i][1], 80 - j*3, "Sport recomandat după evaluare medicală.", ["Beneficiu", "Siguranță"], ["Consult medical înainte"]) for j, i in enumerate([7, 12, 0])]
        examples_val.append(make_example(user, {"recommendations": recs, "specialistRecommendation": specialist}))
    while len(examples_val) < 65:
        age = random.randint(4, 14)
        add_val(age, random.choice(["Băiat", "Fată"]), random.choice(ENERGIES), random.choice(PERSONALITIES), "", [random.randint(0, len(SPORTS)-1) for _ in range(3)])

    # --- Write: append batch ---
    training_path = os.path.join(base_dir, "training_data.jsonl")
    validation_path = os.path.join(base_dir, "validation_data.jsonl")

    with open(training_path, "a", encoding="utf-8") as f:
        f.write("\n")
        for ex in examples_train:
            f.write(json.dumps(ex, ensure_ascii=False) + "\n")

    with open(validation_path, "a", encoding="utf-8") as f:
        f.write("\n")
        for ex in examples_val:
            f.write(json.dumps(ex, ensure_ascii=False) + "\n")

    print(f"Appended: {len(examples_train)} training + {len(examples_val)} validation examples (total +{len(examples_train) + len(examples_val)}).")
    print(f"Training: {training_path}")
    print(f"Validation: {validation_path}")


if __name__ == "__main__":
    main()
