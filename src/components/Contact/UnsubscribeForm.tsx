"use client";

import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { unsubscribeAction } from "@/app/actions/email";
import { BootstrapButton } from "@/components/UI/BootstrapButton";
import { BootstrapInput } from "@/components/UI/BootstrapInput";

/**
 * Unsubscribe Form Component
 *
 * Client component for email unsubscription.
 * Handles form submission and displays success/error messages.
 */
interface UnsubscribeFormProps {
  initialEmail?: string;
}

export default function UnsubscribeForm({ initialEmail }: UnsubscribeFormProps) {
  const [state, formAction] = useFormState(unsubscribeAction, null);
  const [email, setEmail] = useState(initialEmail || "");

  return (
    <form action={formAction} className="bd-contact-form">
      <div className="row">
        <div className="col-md-12">
          <div className="bd-contact-input">
            <BootstrapInput
              type="email"
              name="email"
              placeholder="Adresa ta de email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              aria-label="Adresa de email pentru dezabonare"
            />
          </div>
        </div>

        {state?.error && (
          <div className="col-md-12">
            <div className="alert alert-danger" role="alert">
              {state.error}
            </div>
          </div>
        )}

        {state?.success && (
          <div className="col-md-12">
            <div className="alert alert-success" role="alert">
              <strong>Dezabonare reușită!</strong>
              <br />
              {state.message || "Te-ai dezabonat cu succes de la emailurile Yuvoo."}
            </div>
          </div>
        )}

        <div className="col-md-12">
          <div className="bd-contact-btn">
            <SubmitButton />
          </div>
        </div>
      </div>
    </form>
  );
}

/**
 * Submit Button Component
 *
 * Uses useFormStatus to show loading state during form submission.
 */
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <BootstrapButton type="submit" variant="primary" disabled={pending} className="bd-btn bd-btn-2">
      {pending ? "Se procesează..." : "Dezabonează-mă"}
    </BootstrapButton>
  );
}
