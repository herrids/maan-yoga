import { signIn } from "../../../firebase"
import { useState } from "react";
import { useTranslation } from 'react-i18next';

import TextField from "../atoms/TextField/TextField";
import Button from "../atoms/Button/Button";


import "./LoginForm.scss"

export default function () {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState('');

    const { t } = useTranslation();

    const handleLogin = async (e) => {
      try {
        await signIn(email, password);
      } catch (error) {
        setError(t("loginError"));
      }
    };

    return (
      <>
        {error && <div className="login-error">{error}</div>}
        <div className="login-container">
          <h3>Login</h3>
          <TextField
            label="Email"
            value={email} 
            changeHandler={setEmail} 
            enterHandler={handleLogin}
            type="email" 
          />
          <TextField 
            label="Password"
            value={password} 
            changeHandler={setPassword}
            enterHandler={handleLogin}
            type="password" 
          />
          <Button 
            clickHandler={handleLogin}
            type="primary"
            text={t("loginButton")}
          />
        </div>
      </>
    )
  }