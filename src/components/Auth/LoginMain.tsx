import Link from "next/link";
import React from "react";
import SignInForm from "../Form/SignInForm";
import { routes } from "@/lib/routes";

interface LoginMainProps {
  redirectUrl?: string;
}

const LoginMain: React.FC<LoginMainProps> = ({ redirectUrl }) => {
  return (
    <section className="login__area pt-110 pb-110">
      <div className="container">
        <div className="login__inner p-relative z-index-1">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8 col-md-10">
              <div className="login__wrapper">
                <div className="login__top mb-30 text-center">
                  <h3 className="login__title">Bună din nou</h3>
                  <p>Introdu datele de autentificare pentru a accesa contul tău.</p>
                </div>
                <div className="login__form">
                  <SignInForm redirectUrl={redirectUrl} />
                  <div className="login__register-now">
                    <p>
                      Nu ai cont? <Link href={routes.register}>Înregistrează-te acum</Link>
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

export default LoginMain;
