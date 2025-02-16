import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth0 } from '@auth0/auth0-react';

import Button from '../atoms/Button/Button';

import './Header.scss';

export default function Header() {

    const { t, i18n } = useTranslation();
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

    const handleLogin = () => {
        loginWithRedirect();
    };

    const handleLogout = () => {
        logout({ logoutParams: { returnTo: window.location.origin } });
    };

    const handleLanguageChange = () => {
        const newLanguage = i18n.language.startsWith('de') ? 'en' : 'de';
        i18n.changeLanguage(newLanguage);
    };

    return (
        <header>
            <div className="logo">
                <img src="logo.png" alt="Your Logo" />
            </div>
            <nav>
                <div className="nav-container">
                <ul>
                    <li>
                        <NavLink exact="true" to="/new" activeclassname="active">
                            {t("new")}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/flows" activeclassname="active">
                            {t("list")}
                        </NavLink>
                    </li>
                </ul>
                </div>
            </nav>
            <div className="controls">
                <Button 
                    clickHandler={handleLanguageChange}
                    type="transparent"
                    text={i18n.language.startsWith('de') ? "English" : "Deutsch"}
                />
                {isAuthenticated ? (
                    <>
                        <Button 
                            clickHandler={handleLogout}
                            type="transparent"
                            text={t("logout")}
                        />
                    </>
                ) : (
                    <Button 
                        clickHandler={handleLogin}
                        type="transparent"
                        text={t("login")}
                    />
                )}
            </div>
        </header>
    );
}
