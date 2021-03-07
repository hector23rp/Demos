import React from "react";
import Form from "../form";
import { AuthService } from "../services/auth.service";
import "./style.scss";

const Auth: React.FC = () => {
  const authServiceLogin = new AuthService("/login");
  const authServiceRegister = new AuthService("/signup");

  return (
    <section className="login-page">
      <div className="login-container">
        <div className="login-title text-center">
          <span className="hide-xs">JWT</span>
          <img className="login-logo" src="logo.svg" alt="Squirrel Banking Logo" />
          <span className="hide-xs">Login</span>
        </div>
        <div className="login-content">
          <h2>Login</h2>
          <Form authService={authServiceLogin} hasConfirmPassword={false} />
          <p className="login-separator text-center">
            <span>OR</span>
          </p>
          <h2>Register</h2>
          <Form authService={authServiceRegister} hasConfirmPassword={true} />
        </div>
      </div>
    </section>
  );
};

export default Auth;
