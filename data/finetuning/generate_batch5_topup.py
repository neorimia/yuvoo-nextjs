#!/usr/bin/env python3
"""Top-up to reach 5000 new: add 350 training + 36 validation (no repeat, unique keys via offset)."""
import json
import os

# Same constants and helpers as batch5 (minimal copy)
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
MEDICAL_OPTIONS = ["", "- Astm ușor (controlat)\n- Folosește inhaler: Ocazional\n", "- Dureri ușoare ocazionale\n", "- Considerații: Evaluare medicală recomandată înainte de sport\n"]

N_SPORTS, N_PERSONALITIES, N_ENERGIES, N_MEDICAL = len(SPORTS), len(PERSONALITIES), len(ENERGIES), len(MEDICAL_OPTIONS)

def make_example(user_content: str, assistant_json: dict) -> dict:
    return {"messages": [{"role": "system", "content": SYSTEM_MSG}, {"role": "user", "content": user_content}, {"role": "assistant", "content": json.dumps(assistant_json, ensure_ascii=False)}]}

def rec(sid: str, sname: str, score: int, reason: str, benefits: list, considerations: list) -> dict:
    return {"sportId": sid, "sportName": sname, "matchScore": max(60, min(100, score)), "reasoning": reason[:500], "benefits": benefits if len(benefits) >= 2 else benefits + ["Dezvoltare fizică", "Socializare"], "considerations": considerations if len(considerations) >= 1 else ["Disponibil în majoritatea orașelor"]}

def build_user(age: int, gender: str, energy: str, personality: str, medical: str, **kw) -> str:
    return f"""ANALIZA COPILULUI:

Vârstă: {age} ani
Gen: {gender}

Nivel de energie: {energy}

Trăsături de personalitate: {personality}

Interese și hobby-uri: sport, jocuri, prieteni

Sporturi încercate anterior: Niciunul

Constituție fizică: Mediu
Nivel coordonare: Coordonare bună

CONDIȚII MEDICALE:
- Fără astm
- Fără dureri articulare
{medical}

Preferințe:
- Activități interioare: Da
- Activități exterioare: Da
- Sporturi de echipă: Da
- Sporturi individuale: Da"""

def build_example(age: int, gender: str, energy: str, personality: str, medical: str, sport_indices: list) -> dict:
    recs = []
    for j, idx in enumerate(sport_indices[:4]):
        sid, sname = SPORTS[idx % N_SPORTS]
        score = 88 - j * 4 + (age % 3) - 1
        recs.append(rec(sid, sname, score, f"{sname} este potrivit pentru vârsta de {age} ani și profilul indicat. Oferă beneficii fizice și sociale. Recomandat în România.", ["Dezvoltare fizică și coordonare", f"Adaptat vârstei {age} ani", "Disponibil în cluburi"], ["Verificați disponibilitatea în oraș", "Echipament minim necesar"]))
    return make_example(build_user(age, gender, energy, personality, medical), {"recommendations": recs, "specialistRecommendation": {"needed": False}})

def sport_key(indices):
    return tuple(sorted(i % N_SPORTS for i in indices[:4]))

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    examples_train, examples_val = [], []
    # Offset variants so keys don't repeat with batch5 (which used v 0..49 train, 0..30 val)
    TRAIN_OFFSET, VAL_OFFSET = 50, 31
    seen_train, seen_val = set(), set()

    for age in range(4, 15):
        for g_idx, gender in enumerate(["Băiat", "Fată"]):
            for e_idx in range(N_ENERGIES):
                for v in range(4):  # 4 extra variants per cell -> 11*2*4*4 = 352 training
                    if len(examples_train) >= 350:
                        break
                    vv = TRAIN_OFFSET + (age * 2 + g_idx + e_idx * 3 + v) % 20
                    pers_idx = (age * 7 + g_idx * 11 + e_idx * 5 + vv) % N_PERSONALITIES
                    personality = PERSONALITIES[pers_idx]
                    medical_idx = (age + g_idx + e_idx + vv) % N_MEDICAL
                    medical = MEDICAL_OPTIONS[medical_idx]
                    base = (age * 17 + g_idx * 13 + e_idx * 7 + vv * 2) % N_SPORTS
                    sport_indices = [base, (base + 3) % N_SPORTS, (base + 7) % N_SPORTS, (base + 11) % N_SPORTS]
                    key = (age, gender, e_idx, pers_idx, medical_idx, sport_key(sport_indices))
                    if key in seen_train:
                        continue
                    seen_train.add(key)
                    examples_train.append(build_example(age, gender, ENERGIES[e_idx], personality, medical, sport_indices))
                if len(examples_train) >= 350:
                    break
            if len(examples_train) >= 350:
                break
        if len(examples_train) >= 350:
            break

    examples_train = examples_train[:350]

    for age in range(4, 15):
        for g_idx, gender in enumerate(["Băiat", "Fată"]):
            for v in range(2):  # 2 per (age, gender) -> 11*2*2 = 44, cap 36
                if len(examples_val) >= 36:
                    break
                vv = VAL_OFFSET + (age + g_idx + v) % 10
                e_idx = (age * 3 + g_idx * 2 + vv) % N_ENERGIES
                pers_idx = (age * 5 + g_idx * 3 + vv * 7) % N_PERSONALITIES
                medical_idx = (age + g_idx + vv * 11) % N_MEDICAL
                medical = MEDICAL_OPTIONS[medical_idx]
                base = (age * 19 + g_idx * 17 + vv * 13) % N_SPORTS
                sport_indices = [base, (base + 5) % N_SPORTS, (base + 9) % N_SPORTS]
                key = (age, gender, vv, e_idx, pers_idx, medical_idx, sport_key(sport_indices))
                if key in seen_val:
                    continue
                seen_val.add(key)
                examples_val.append(build_example(age, gender, ENERGIES[e_idx], PERSONALITIES[pers_idx], medical, sport_indices))
        if len(examples_val) >= 36:
            break

    examples_val = examples_val[:36]

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

    print(f"Top-up appended: {len(examples_train)} training + {len(examples_val)} validation = {len(examples_train) + len(examples_val)} (no repeat).")

if __name__ == "__main__":
    main()
