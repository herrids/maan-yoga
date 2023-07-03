import { useState } from "react"
import { useTranslation } from 'react-i18next';

import Form from "../molecules/Form/Form"
import AuthRedirectLink from "../AuthRedirectLink/AuthRedirectLink";
import Button from "../atoms/Button/Button";

import { register, googleSSO } from "../../../firebase"

export default function(props) {

    const { t } = useTranslation();

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
            await register(email, name, password);
          } catch (error) {
            setError(t("registerError"));
          }
    }

    const button = {
        text: t("createAccount"),
        type: "primary",
        clickHandler
    }

    const signInWithGoogle = () => {}
    
    return (
        <>
            {error && <div className="error">{error}</div>}
            <Form 
                headline={"Register"}
                textfields={textfields}
                button={button}
            >
                <Button
                type={["ghost", "full-width"]}
                clickHandler={googleSSO}
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