import { useState } from "react"
import { useTranslation } from 'react-i18next';
import { useAuth0 } from '@auth0/auth0-react';

import Form from "../molecules/Form/Form"
import AuthRedirectLink from "../AuthRedirectLink/AuthRedirectLink";
import Button from "../atoms/Button/Button";

export default function(props) {

    const { t } = useTranslation();
    const { loginWithPopup, loginWithRedirect } = useAuth0();

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const textfields = [
        {
            label: "Email",
            value: email,
            changeHandler: setEmail,
            type: "email"
        },{
            label: "Name",
            value: name,
            changeHandler: setName,
            type: "text"
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
            await loginWithPopup({
                screen_hint: 'signup',
                login_hint: email
            });
        } catch (error) {
            setError(t("registerError"));
        }
    }

    const button = {
        text: t("createAccount"),
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
            {error && <div className="error">{error}</div>}
            <button onClick={() => loginWithRedirect()}>Log In</button>
            <Form 
                headline={"Register"}
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
                text={t("yesAccount")}
                linkDestination={"/login"}
                linkText={t("signUpNow")}
            />
        </>
    )
}