import React from "react";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";

export const metadata: Metadata = {
  title: "Resetare Parolă - Yuvoo",
  description: "Resetează parola contului tău Yuvoo.",
};

/**
 * Reset Password Page
 *
 * Authentication page for password reset.
 * Route: /auth/reset-password
 */
export default function ResetPasswordPage() {
  return (
    <>
      <BreadcrumbOne title="Resetare Parolă" subTitle="Resetare Parolă" />
      <section className="bd-reset-password-area pt-120 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8">
              <div className="bd-reset-password-content">
                <h1 className="bd-section-title mb-30">Resetare Parolă</h1>
                {/* TODO: Add reset password form component */}
                <div className="bd-reset-password-placeholder">
                  <p>Formularul de resetare parolă va fi adăugat aici.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
