#!/usr/bin/env python3
"""
Generate +5000 unique fine-tuning examples with NO repetition.
Systematically covers every age 4-14 with unique (gender, energy, personality, medical, sports).
Target: 4350 training + 650 validation = 5000 new examples.
Run once: python3 data/finetuning/generate_batch5_5000_no_repeat.py
"""
import json
import os
import sys

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
N_MEDICAL = len(MEDICAL_OPTIONS)

TARGET_TRAIN = 4350
TARGET_VAL = 650


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


def sport_key(indices):
    return tuple(sorted(i % N_SPORTS for i in indices[:4]))


def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    # Offset so multiple runs don't repeat: python3 generate_batch5_5000_no_repeat.py 50
    offset = int(sys.argv[1]) if len(sys.argv) > 1 else 0
    examples_train = []
    examples_val = []
    seen_train = set()
    seen_val = set()

    # --- Training: 4350 unique. Use (v+offset) in formulas so each run uses different key space ---
    variants_per_cell = (TARGET_TRAIN + 500) // (11 * 2 * N_ENERGIES)  # ~50
    for age in range(4, 15):
        for g_idx, gender in enumerate(["Băiat", "Fată"]):
            for e_idx in range(N_ENERGIES):
                energy = ENERGIES[e_idx]
                for v in range(variants_per_cell):
                    if len(examples_train) >= TARGET_TRAIN:
                        break
                    vo = v + offset
                    pers_idx = (age * 7 + g_idx * 11 + e_idx * 5 + vo) % N_PERSONALITIES
                    personality = PERSONALITIES[pers_idx]
                    medical_idx = (age + g_idx + e_idx + vo) % N_MEDICAL
                    medical = MEDICAL_OPTIONS[medical_idx]
                    base = (age * 17 + g_idx * 13 + e_idx * 7 + vo * 2) % N_SPORTS
                    sport_indices = [base, (base + 3) % N_SPORTS, (base + 7) % N_SPORTS, (base + 11) % N_SPORTS]
                    key = (age, gender, e_idx, pers_idx, medical_idx, sport_key(sport_indices))
                    if key in seen_train:
                        continue
                    seen_train.add(key)
                    examples_train.append(build_example(age, gender, energy, personality, medical, sport_indices))
            if len(examples_train) >= TARGET_TRAIN:
                break
        if len(examples_train) >= TARGET_TRAIN:
            break

    examples_train = examples_train[:TARGET_TRAIN]

    # --- Validation: 650 unique. Use (v+offset) so each run uses different key space ---
    val_variants = (TARGET_VAL + 50) // (11 * 2)  # ~30
    for age in range(4, 15):
        for g_idx, gender in enumerate(["Băiat", "Fată"]):
            for v in range(val_variants):
                if len(examples_val) >= TARGET_VAL:
                    break
                vo = v + offset
                e_idx = (age * 3 + g_idx * 2 + vo) % N_ENERGIES
                pers_idx = (age * 5 + g_idx * 3 + vo * 7) % N_PERSONALITIES
                energy = ENERGIES[e_idx]
                personality = PERSONALITIES[pers_idx]
                medical_idx = (age + g_idx + vo * 11) % N_MEDICAL
                medical = MEDICAL_OPTIONS[medical_idx]
                base = (age * 19 + g_idx * 17 + vo * 13) % N_SPORTS
                sport_indices = [base, (base + 5) % N_SPORTS, (base + 9) % N_SPORTS]
                key = (age, gender, vo, e_idx, pers_idx, medical_idx, sport_key(sport_indices))  # vo in key = unique per run
                if key in seen_val:
                    continue
                seen_val.add(key)
                examples_val.append(build_example(age, gender, energy, personality, medical, sport_indices))
        if len(examples_val) >= TARGET_VAL:
            break

    examples_val = examples_val[:TARGET_VAL]

    # --- Age coverage ---
    age_counts = {}
    for ex in examples_train:
        content = ex["messages"][1]["content"]
        for line in content.split("\n"):
            if line.strip().startswith("Vârstă:"):
                age = int(line.split(":")[1].strip().replace(" ani", ""))
                age_counts[age] = age_counts.get(age, 0) + 1
                break

    # --- Write ---
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

    total = len(examples_train) + len(examples_val)
    print(f"Appended (offset={offset}): {len(examples_train)} training + {len(examples_val)} validation = {total} new examples (no repeat).")
    print("Training age coverage: " + ", ".join(f"{a} ani: {age_counts.get(a, 0)}" for a in sorted(age_counts.keys())))
    print(f"Training: {training_path}")
    print(f"Validation: {validation_path}")


if __name__ == "__main__":
    main()
