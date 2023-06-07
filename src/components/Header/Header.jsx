import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { auth } from '../../../firebase';

import Button from '../atoms/Button/Button';

import './Header.scss';

export default function Header() {

    const { t, i18n } = useTranslation();

    console.log(i18n.language)

    const handleLogout = async () => {
        try {
          await auth.signOut();
          console.log('User logged out successfully');
        } catch (error) {
          console.log('Error logging out:', error);
        }
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
                <Button 
                    clickHandler={handleLogout}
                    type="transparent"
                    text={t("logout")}
                />
            </div>
        </header>
    );
}
