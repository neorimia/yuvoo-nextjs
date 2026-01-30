/**
 * Child Selection Question Component (Step 0)
 *
 * For authenticated users with existing children: Select a child or add new.
 * For guests or users without children: This step is skipped.
 */

"use client";

import React, { memo, useState, useTransition } from "react";
import QuestionWrapper from "../QuestionWrapper";
import type { Child } from "@/modules/children/children.types";
import { createChildForQuizAction } from "@/app/actions/quiz-child";

interface ChildSelectionQuestionProps {
  childProfiles: Child[];
  onChildSelected: (childId: string) => void;
}

const ChildSelectionQuestion = memo(function ChildSelectionQuestion({
  childProfiles,
  onChildSelected,
}: ChildSelectionQuestionProps) {
  const [showAddForm, setShowAddForm] = useState(childProfiles.length === 0);
  const [isPending, startTransition] = useTransition();
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelectChild = (childId: string) => {
    setSelectedChildId(childId);
    setError(null);
    onChildSelected(childId);
  };

  const handleAddChildSubmit = async (formData: FormData) => {
    setError(null);

    startTransition(async () => {
      try {
        const result = await createChildForQuizAction(formData);
        if (result.success === false && result.error) {
          setError(result.error);
        }
        // Note: createChildForQuizAction redirects on success, but we handle
        // the case where it returns for inline flow
      } catch (err) {
        // Redirect errors are expected and handled by Next.js
        if (err instanceof Error && err.message.includes("NEXT_REDIRECT")) {
          return;
        }
        console.error("Error creating child:", err);
        setError("A apărut o eroare. Te rugăm să încerci din nou.");
      }
    });
  };

  const getGenderIcon = (gender: string) => {
    switch (gender) {
      case "male":
        return "bi-person";
      case "female":
        return "bi-person-dress";
      default:
        return "bi-person-circle";
    }
  };

  const getGenderLabel = (gender: string) => {
    switch (gender) {
      case "male":
        return "Băiat";
      case "female":
        return "Fată";
      default:
        return "";
    }
  };

  return (
    <QuestionWrapper
      title="Pentru cine este chestionarul?"
      description={
        childProfiles.length > 0
          ? "Selectează copilul pentru care dorești să completezi chestionarul sau adaugă unul nou."
          : "Adaugă primul copil pentru a începe chestionarul."
      }
      error={error || undefined}
    >
      {/* Existing Children List */}
      {childProfiles.length > 0 && !showAddForm && (
        <div className="children-list mb-4">
          <div className="row g-3">
            {childProfiles.map((child) => (
              <div key={child.id} className="col-md-6">
                <button
                  type="button"
                  className={`btn w-100 text-start p-3 border-2 rounded-3 ${
                    selectedChildId === child.id
                      ? "btn-yuvoo-primary border-primary"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => handleSelectChild(child.id)}
                  disabled={isPending}
                  aria-pressed={selectedChildId === child.id}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className={`rounded-circle d-flex align-items-center justify-content-center ${
                        selectedChildId === child.id
                          ? "bg-white text-yuvoo-primary"
                          : "bg-light text-secondary"
                      }`}
                      style={{ width: "48px", height: "48px" }}
                    >
                      <i className={`bi ${getGenderIcon(child.gender)} fs-4`}></i>
                    </div>
                    <div className="flex-grow-1">
                      <div className="fw-semibold">
                        {child.firstName}{" "}
                        {child.lastName !== "Copil" && child.lastName !== "Temporar"
                          ? child.lastName
                          : ""}
                      </div>
                      <small
                        className={selectedChildId === child.id ? "text-white-50" : "text-muted"}
                      >
                        {child.age} ani
                        {getGenderLabel(child.gender) && ` • ${getGenderLabel(child.gender)}`}
                      </small>
                    </div>
                    {selectedChildId === child.id && <i className="bi bi-check-circle-fill"></i>}
                  </div>
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <button
              type="button"
              className="btn btn-link text-decoration-none"
              onClick={() => setShowAddForm(true)}
              disabled={isPending}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Adaugă un copil nou
            </button>
          </div>
        </div>
      )}

      {/* Add Child Form */}
      {showAddForm && (
        <div className="add-child-form">
          <form action={handleAddChildSubmit}>
            {childProfiles.length > 0 && (
              <button
                type="button"
                className="btn btn-link p-0 mb-3 text-decoration-none"
                onClick={() => setShowAddForm(false)}
                disabled={isPending}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Înapoi la lista de copii
              </button>
            )}

            <div className="mb-3">
              <label htmlFor="firstName" className="form-label fw-semibold">
                Prenumele copilului <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder="Ex: Maria, Andrei"
                maxLength={50}
                required
                disabled={isPending}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label fw-semibold">
                Numele de familie <span className="text-muted fw-normal">(opțional)</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                placeholder="Ex: Popescu"
                maxLength={50}
                disabled={isPending}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="age" className="form-label fw-semibold">
                Vârsta copilului <span className="text-danger">*</span>
              </label>
              <select className="form-select" id="age" name="age" required disabled={isPending}>
                <option value="">Selectează vârsta</option>
                {Array.from({ length: 11 }, (_, i) => i + 4).map((age) => (
                  <option key={age} value={age}>
                    {age} ani
                  </option>
                ))}
              </select>
              <div className="form-text">Vârsta trebuie să fie între 4 și 14 ani</div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">
                Gen <span className="text-muted fw-normal">(opțional)</span>
              </label>
              <div className="d-flex gap-2 flex-wrap">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    const input = document.querySelector(
                      'input[name="gender"][value="male"]'
                    ) as HTMLInputElement;
                    if (input) input.checked = true;
                  }}
                  disabled={isPending}
                >
                  <i className="bi bi-person me-2"></i>
                  Băiat
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    const input = document.querySelector(
                      'input[name="gender"][value="female"]'
                    ) as HTMLInputElement;
                    if (input) input.checked = true;
                  }}
                  disabled={isPending}
                >
                  <i className="bi bi-person-dress me-2"></i>
                  Fată
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    const input = document.querySelector(
                      'input[name="gender"][value="other"]'
                    ) as HTMLInputElement;
                    if (input) input.checked = true;
                  }}
                  disabled={isPending}
                >
                  <i className="bi bi-person-circle me-2"></i>
                  Altul
                </button>
                {/* Hidden radio inputs for form submission */}
                <input type="radio" name="gender" value="male" className="d-none" />
                <input type="radio" name="gender" value="female" className="d-none" />
                <input type="radio" name="gender" value="other" className="d-none" />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-yuvoo-primary btn-lg w-100"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Se procesează...
                </>
              ) : (
                <>
                  Continuă
                  <i className="bi bi-arrow-right ms-2"></i>
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </QuestionWrapper>
  );
});

export default ChildSelectionQuestion;
