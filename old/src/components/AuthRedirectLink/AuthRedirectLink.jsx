import { Link } from "react-router-dom"

import "./AuthRedirectLink.scss"

export default function({text, linkDestination, linkText}) {
    return (
        <div className="redirect-link">
            <p>
                {text} {'\u00A0'}
                <Link to={linkDestination} className="redirect-link__link">
                    {linkText}
                </Link>
            </p>
        </div>
    )
}