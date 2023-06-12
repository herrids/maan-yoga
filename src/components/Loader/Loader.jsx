import "./Loader.scss"
import {ReactComponent as Animation} from "../../assets/animation.svg"

export default function Loader({show}) {
    return show && 
        (
            <div className="loader-container">
                {/*<div className="loader"></div>*/}
                <Animation />
            </div> 
        )
}