import Link from "next/link";
import React, { Suspense } from "react";
import SignUpForm from "../Form/SignUpMain";
import { routes } from "@/lib/routes";

const RegisterMain = () => {
  return (
    <section className="login__area pt-110 pb-110">
      <div className="container">
        <div className="login__inner p-relative z-index-1">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8 col-md-10">
              <div className="login__wrapper">
                <div className="login__top mb-30 text-center">
                  <h3 className="login__title">Înregistrează-te acum!</h3>
                  <p>Poți crea un cont aici</p>
                </div>
                <div className="login__form">
                  <Suspense fallback={<p className="text-center text-muted">Se încarcă...</p>}>
                    <SignUpForm />
                  </Suspense>
                  <div className="login__register-now">
                    <p>
                      Ai deja un cont? <Link href={routes.login}>Autentificare</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterMain;
