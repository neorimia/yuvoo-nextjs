import React from "react";
import EmailConfirmationForm from "../Form/EmailConfirmationForm";

interface EmailConfirmationMainProps {
  token: string | null;
  verified?: boolean;
  error?: string | null;
}

const EmailConfirmationMain = ({ token, verified, error }: EmailConfirmationMainProps) => {
  return (
    <section className="login__area pt-110 pb-110">
      <div className="container">
        <div className="login__inner p-relative z-index-1">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8 col-md-10">
              <div className="login__wrapper">
                <div className="login__top mb-30 text-center">
                  <h3 className="login__title">Verificare Email</h3>
                  <p>Verificăm adresa ta de email...</p>
                </div>
                <div className="login__form">
                  <EmailConfirmationForm token={token} verified={verified} error={error} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmailConfirmationMain;
