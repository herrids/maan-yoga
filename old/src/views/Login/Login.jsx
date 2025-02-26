import LoginForm from "../../components/LoginForm/LoginForm"
import RegisterForm from "../../components/RegisterForm/RegisterForm"
import Logo from "../../components/molecules/Logo/Logo"

import "./Login.scss"

export default function({register}) {
    return (
        <>
            <div className="login-logo">
                <Logo />
            </div>
            <LoginForm />
        </>
    )
}