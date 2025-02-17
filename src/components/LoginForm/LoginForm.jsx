import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useAuth0 } from '@auth0/auth0-react';

import Button from "../atoms/Button/Button";
import Loader from "../Loader/Loader";

import "./LoginForm.scss"

export default function () {
    const [error, setError] = useState(null);

    const { t } = useTranslation();
    const { loginWithPopup, isLoading } = useAuth0();

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
            <Loader show={isLoading} />
            {!isLoading && (
                <>
                    {error && <div className="login-error">{error}</div>}
                    <Button
                        type={["center", "secondary"]}
                        clickHandler={clickHandler}
                        text={"Login"}
                    />
                </>
            )}
        </>
    )
}