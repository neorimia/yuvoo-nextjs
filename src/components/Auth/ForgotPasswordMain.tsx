import Link from "next/link";
import React from "react";
import ForgotForm from "../Form/ForgotForm";
import { routes } from "@/lib/routes";

const ForgotPasswordMain = () => {
  return (
    <section className="login__area pt-110 pb-110">
      <div className="container">
        <div className="login__inner p-relative z-index-1">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8 col-md-10">
              <div className="login__wrapper">
                <div className="login__top mb-30 text-center">
                  <h3 className="login__title">Ai uitat parola?</h3>
                  <p>Introdu adresa de email pentru a solicita resetarea parolei.</p>
                </div>
                <div className="login__form">
                  <ForgotForm />
                  <div className="login__register-now">
                    <p>
                      Ți-ai amintit parola? <Link href={routes.login}>Autentificare</Link>
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

export default ForgotPasswordMain;
