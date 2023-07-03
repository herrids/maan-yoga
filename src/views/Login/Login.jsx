import LoginForm from "../../components/LoginForm/LoginForm"
import RegisterForm from "../../components/RegisterForm/RegisterForm"

import "./Login.scss"

export default function({register}) {
    return (
        <>
            <div className="login-logo">
                <img src="logo.png" alt="Your Logo" />
            </div>
            {register ? <RegisterForm/> :
            <LoginForm /> }
        </>
    )
}