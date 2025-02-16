import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useAuth0 } from '@auth0/auth0-react';

import Form from "../molecules/Form/Form"
import AuthRedirectLink from "../AuthRedirectLink/AuthRedirectLink";
import Button from "../atoms/Button/Button";

import "./LoginForm.scss"

export default function () {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null);

    const { t } = useTranslation();
    const { loginWithPopup } = useAuth0();

    const textfields = [
      {
          label: "Email",
          value: email,
          changeHandler: setEmail,
          type: "email"
      },{
          label: "Password",
          value: password,
          changeHandler: setPassword,
          type: "password"
      }
    ]

    const clickHandler = async (e) => {
        e.preventDefault();
        try {
            await loginWithPopup();
        } catch (error) {
            setError(t("loginError"));
        }
    };

    const button = {
        text: t("loginButton"),
        type: "primary",
        clickHandler
    }

    const signInWithGoogle = () => {
        loginWithPopup({
            connection: 'google-oauth2'
        });
    }

    return (
        <>
            {error && <div className="login-error">{error}</div>}
            <Form 
                headline={"Login"}
                textfields={textfields}
                button={button}
            >
                <Button
                    type={["ghost", "full-width"]}
                    clickHandler={signInWithGoogle}
                    text={t("continueGoogle")}
                    image={{src: "google_logo.svg"}}
                />
            </Form>
            <AuthRedirectLink 
                text={t("noAccount")}
                linkDestination={"/register"}
                linkText={t("registerNow")}
            />
        </>
    )
}