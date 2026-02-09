#!/usr/bin/env python3
"""
Generate +1000 unique fine-tuning examples with NO repetition.
Systematically covers every age 4-14 with unique (gender, energy, personality, medical, sports).
Target: 870 training + 130 validation = 1000 new examples.
Run once: python3 data/finetuning/generate_batch4_1000_no_repeat.py
"""
import json
import os

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

ENERGIES = ["Foarte ridicat", "Ridicat", "Mediu", "Scăzut"]
PERSONALITIES = [
    "energic, curios, sociabil", "calm, concentrat, răbdător", "competitiv, determinat, ambițios",
    "creativ, expresiv, sensibil", "timid, blând, empatic", "rebel, independent, curajos",
    "analitic, strategic, focusat", "vesel, prietenos, cooperant", "introvert, gânditor, liniștit",
    "extrovert, lider, comunicativ", "perfectionist, disciplinat, ambițios", "aventuros, curajos, activ",
]

MEDICAL_OPTIONS = [
    "",
    "- Astm ușor (controlat)\n- Folosește inhaler: Ocazional\n",
    "- Dureri ușoare ocazionale\n",
    "- Considerații: Evaluare medicală recomandată înainte de sport\n",
]

N_SPORTS = len(SPORTS)
N_PERSONALITIES = len(PERSONALITIES)
N_ENERGIES = len(ENERGIES)


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


def build_user(age: int, gender: str, energy: str, personality: str, medical: str, tried: str = "Niciunul",
               pref_inside: str = "Da", pref_outside: str = "Da", pref_team: str = "Da", pref_indiv: str = "Da") -> str:
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


def build_example(age: int, gender: str, energy: str, personality: str, medical: str, sport_indices: list) -> dict:
    """Build one unique example. sport_indices must be 3-4 distinct indices into SPORTS."""
    recs = []
    for j, idx in enumerate(sport_indices[:4]):
        sid, sname = SPORTS[idx % N_SPORTS]
        score = 88 - j * 4 + (age % 3) - 1
        recs.append(rec(
            sid, sname, score,
            f"{sname} este potrivit pentru vârsta de {age} ani și profilul indicat. Oferă beneficii fizice și sociale. Recomandat în România.",
            ["Dezvoltare fizică și coordonare", f"Adaptat vârstei {age} ani", "Disponibil în cluburi"],
            ["Verificați disponibilitatea în oraș", "Echipament minim necesar"],
        ))
    user = build_user(age, gender, energy, personality, medical)
    return make_example(user, {"recommendations": recs, "specialistRecommendation": {"needed": False}})


def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    examples_train = []
    examples_val = []
    seen_train = set()  # (age, gender, energy_idx, pers_idx, medical_idx, sport_key) to avoid repeats
    seen_val = set()

    def sport_key(indices):
        return tuple(sorted(i % N_SPORTS for i in indices[:4]))

    # --- Training: systematic coverage, every age 4-14, no repeat ---
    # 11 ages * 2 genders * 4 energies * 10 variants ≈ 880 (we'll trim to 870)
    for age in range(4, 15):
        for g_idx, gender in enumerate(["Băiat", "Fată"]):
            for e_idx in range(N_ENERGIES):
                energy = ENERGIES[e_idx]
                for variant in range(10):  # 10 unique variants per (age, gender, energy)
                    pers_idx = (age + g_idx * 7 + e_idx * 3 + variant) % N_PERSONALITIES
                    personality = PERSONALITIES[pers_idx]
                    medical_idx = variant % len(MEDICAL_OPTIONS)
                    medical = MEDICAL_OPTIONS[medical_idx]
                    # Unique sport combo per variant (no repeat for same age/gender/energy)
                    base = (age * 17 + g_idx * 11 + e_idx * 5 + variant * 2) % N_SPORTS
                    sport_indices = [base, (base + 3) % N_SPORTS, (base + 7) % N_SPORTS, (base + 11) % N_SPORTS]
                    key = (age, gender, e_idx, pers_idx, medical_idx, sport_key(sport_indices))
                    if key in seen_train:
                        continue
                    seen_train.add(key)
                    examples_train.append(build_example(age, gender, energy, personality, medical, sport_indices))
                    if len(examples_train) >= 870:
                        break
                if len(examples_train) >= 870:
                    break
            if len(examples_train) >= 870:
                break
        if len(examples_train) >= 870:
            break

    # Cap at 870
    examples_train = examples_train[:870]

    # --- Validation: 130 examples, every age 4-14, no repeat ---
    # 11 ages * 2 genders * 6 variants = 132 (cap 130)
    for age in range(4, 15):
        for g_idx, gender in enumerate(["Băiat", "Fată"]):
            for v in range(6):
                e_idx = (age + g_idx + v) % N_ENERGIES
                pers_idx = (age * 2 + g_idx + v * 2) % N_PERSONALITIES
                energy = ENERGIES[e_idx]
                personality = PERSONALITIES[pers_idx]
                medical = MEDICAL_OPTIONS[v % len(MEDICAL_OPTIONS)]
                base = (age * 13 + g_idx * 7 + v) % N_SPORTS
                sport_indices = [base, (base + 5) % N_SPORTS, (base + 9) % N_SPORTS]
                key = (age, gender, e_idx, pers_idx, v % len(MEDICAL_OPTIONS), sport_key(sport_indices))
                if key in seen_val:
                    continue
                seen_val.add(key)
                examples_val.append(build_example(age, gender, energy, personality, medical, sport_indices))
                if len(examples_val) >= 130:
                    break
            if len(examples_val) >= 130:
                break
        if len(examples_val) >= 130:
            break

    examples_val = examples_val[:130]

    # --- Write: append ---
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

    # Age coverage report
    age_counts_train = {}
    for ex in examples_train:
        content = ex["messages"][1]["content"]
        if "Vârstă: " in content:
            line = [l for l in content.split("\n") if l.strip().startswith("Vârstă:")][0]
            age = int(line.split(":")[1].strip().replace(" ani", ""))
            age_counts_train[age] = age_counts_train.get(age, 0) + 1

    print(f"Appended: {len(examples_train)} training + {len(examples_val)} validation = {len(examples_train) + len(examples_val)} new examples (no repeat).")
    print("Training age coverage: " + ", ".join(f"{a} ani: {age_counts_train[a]}" for a in sorted(age_counts_train.keys())))
    print(f"Training: {training_path}")
    print(f"Validation: {validation_path}")


if __name__ == "__main__":
    main()
