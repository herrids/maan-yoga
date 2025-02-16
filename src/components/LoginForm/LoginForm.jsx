import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useAuth0 } from '@auth0/auth0-react';

import Form from "../molecules/Form/Form"
import AuthRedirectLink from "../AuthRedirectLink/AuthRedirectLink";
import Button from "../atoms/Button/Button";

import "./LoginForm.scss"

export default function () {
    const [error, setError] = useState(null);

    const { t } = useTranslation();
    const { loginWithPopup } = useAuth0();

    const clickHandler = (e) => {
        e.preventDefault();
        try {
          loginWithPopup();
        } catch (error) {
            setError(t("loginError"));
        }
    };
    return (
        <>
            {error && <div className="login-error">{error}</div>}
            <Button
                type={["center", "secondary"]}
                clickHandler={clickHandler}
                text={"Login"}
            />
        </>
    )
}