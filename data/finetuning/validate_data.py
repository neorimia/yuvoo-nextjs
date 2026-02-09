#!/usr/bin/env python3
"""
Validate JSONL training data for Yuvoo AI Coach Quiz fine-tuning.

Usage:
    python3 data/finetuning/validate_data.py

Validates:
- JSONL format (each line is valid JSON)
- Message structure (system, user, assistant roles in order)
- Assistant responses are valid JSON with correct schema
- Sport IDs are from the allowed list
- Match scores are in valid range (60-100)
- Specialist recommendations have valid fields
"""

import json
import sys
import os

VALID_SPORT_IDS = {
    "fotbal", "baschet", "volei", "handbal",
    "tenis", "tenis-de-masa", "badminton",
    "inot", "polo",
    "atletism", "alergare",
    "gimnastica", "dans", "balet",
    "arte-martiale", "judo", "karate", "taekwondo",
    "ciclism", "patinaj", "skateboarding",
    "escalada", "alpinism",
    "golf", "sah", "tir-cu-arcul",
}

VALID_SPECIALTIES = {
    "orthopedist", "nutritionist", "psychologist",
    "cardiologist", "neurologist", "pulmonologist", "general",
}

VALID_PRIORITIES = {"high", "medium", "low"}


def validate_file(filepath: str) -> tuple[int, int]:
    """Validate a JSONL file. Returns (valid_count, error_count)."""
    valid = 0
    errors = 0
    filename = os.path.basename(filepath)

    with open(filepath, "r", encoding="utf-8") as f:
        for i, line in enumerate(f, 1):
            line = line.strip()
            if not line:
                continue

            try:
                data = json.loads(line)
            except json.JSONDecodeError as e:
                print(f"  ERROR [{filename}:{i}] Invalid JSON: {e}")
                errors += 1
                continue

            # Check message structure
            if "messages" not in data:
                print(f"  ERROR [{filename}:{i}] Missing 'messages' key")
                errors += 1
                continue

            msgs = data["messages"]
            if len(msgs) != 3:
                print(f"  ERROR [{filename}:{i}] Expected 3 messages, got {len(msgs)}")
                errors += 1
                continue

            roles = [m["role"] for m in msgs]
            if roles != ["system", "user", "assistant"]:
                print(f"  ERROR [{filename}:{i}] Wrong role order: {roles}")
                errors += 1
                continue

            # Validate assistant response is valid JSON
            try:
                response = json.loads(msgs[2]["content"])
            except json.JSONDecodeError as e:
                print(f"  ERROR [{filename}:{i}] Assistant content is not valid JSON: {e}")
                errors += 1
                continue

            # Validate recommendations
            if "recommendations" not in response:
                print(f"  ERROR [{filename}:{i}] Missing 'recommendations' in response")
                errors += 1
                continue

            recs = response["recommendations"]
            if not isinstance(recs, list) or len(recs) == 0:
                print(f"  ERROR [{filename}:{i}] 'recommendations' must be a non-empty list")
                errors += 1
                continue

            line_valid = True
            for j, rec in enumerate(recs):
                # Check required fields
                for field in ["sportId", "sportName", "matchScore", "reasoning", "benefits", "considerations"]:
                    if field not in rec:
                        print(f"  ERROR [{filename}:{i}] Recommendation {j+1} missing '{field}'")
                        line_valid = False

                if not line_valid:
                    break

                # Check sport ID
                if rec["sportId"] not in VALID_SPORT_IDS:
                    print(f"  WARN  [{filename}:{i}] Unknown sportId: '{rec['sportId']}'")

                # Check match score range
                if not (60 <= rec["matchScore"] <= 100):
                    print(f"  ERROR [{filename}:{i}] matchScore {rec['matchScore']} out of range [60-100]")
                    line_valid = False

                # Check benefits and considerations are lists
                if not isinstance(rec["benefits"], list) or len(rec["benefits"]) < 2:
                    print(f"  WARN  [{filename}:{i}] Recommendation {j+1}: benefits should have 2+ items")

                if not isinstance(rec["considerations"], list) or len(rec["considerations"]) < 1:
                    print(f"  WARN  [{filename}:{i}] Recommendation {j+1}: considerations should have 1+ items")

            # Validate specialist recommendation if present
            spec = response.get("specialistRecommendation", {})
            if spec and spec.get("needed"):
                if "specialty" not in spec:
                    print(f"  ERROR [{filename}:{i}] Specialist recommendation missing 'specialty'")
                    line_valid = False
                elif spec["specialty"] not in VALID_SPECIALTIES:
                    print(f"  ERROR [{filename}:{i}] Invalid specialty: '{spec['specialty']}'")
                    line_valid = False

                if "reason" not in spec or not spec["reason"]:
                    print(f"  ERROR [{filename}:{i}] Specialist recommendation missing 'reason'")
                    line_valid = False

                if "priority" in spec and spec["priority"] not in VALID_PRIORITIES:
                    print(f"  WARN  [{filename}:{i}] Invalid priority: '{spec['priority']}'")

            if line_valid:
                valid += 1
            else:
                errors += 1

    return valid, errors


def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    training_file = os.path.join(base_dir, "training_data.jsonl")
    validation_file = os.path.join(base_dir, "validation_data.jsonl")

    print("=" * 60)
    print("Yuvoo Fine-Tuning Data Validator")
    print("=" * 60)

    total_valid = 0
    total_errors = 0

    for filepath in [training_file, validation_file]:
        if not os.path.exists(filepath):
            print(f"\n  SKIP  {os.path.basename(filepath)} — file not found")
            continue

        print(f"\nValidating: {os.path.basename(filepath)}")
        print("-" * 40)
        v, e = validate_file(filepath)
        total_valid += v
        total_errors += e
        print(f"  Result: {v} valid, {e} errors")

    print("\n" + "=" * 60)
    print(f"TOTAL: {total_valid} valid examples, {total_errors} errors")

    if total_errors > 0:
        print("FIX errors before uploading to OpenAI.")
        sys.exit(1)
    else:
        print("All examples valid. Ready for upload.")
        print(f"\nTraining: {training_file}")
        print(f"Validation: {validation_file}")
        sys.exit(0)


if __name__ == "__main__":
    main()