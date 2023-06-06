import { NavLink } from 'react-router-dom';
import { auth } from '../../../firebase';

import Button from '../atoms/Button/Button';

import './Header.scss';

export default function Header() {

    const handleLogout = async () => {
        try {
          await auth.signOut();
          console.log('User logged out successfully');
        } catch (error) {
          console.log('Error logging out:', error);
        }
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
                            Neuer Flow
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/flows" activeclassname="active">
                            Meine Flows
                        </NavLink>
                    </li>
                </ul>
                </div>
            </nav>
            <div className="logout">
                <Button 
                    clickHandler={handleLogout}
                    type="transparent"
                    text="Logout"
                />
            </div>
        </header>
    );
}
