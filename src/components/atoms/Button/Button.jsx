import "./Button.scss"

export default function(props) {
    return (
        <button 
            className={`button ${props.type && `button__${props.type}`}`} 
            onClick={props.clickHandler}
        >
            {props.text}
        </button>
    )
}