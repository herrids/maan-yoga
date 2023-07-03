import "./Button.scss"

export default function(props) {
    let classNames = ['button'];

    if (props.type) {
        if (Array.isArray(props.type)) {
            classNames = classNames.concat(props.type.map(type => `button__${type}`));
        } else {
            classNames.push(`button__${props.type}`);
        }
    }

    if (props.active) {
        classNames.push("button__active");
    }

    return (
        <button 
            className={classNames.join(' ')} 
            onClick={props.clickHandler}
        >
            {props.image && 
                <img 
                    src={props.image.src} 
                    alt={props.image.alt || ""} 
                    className="button__image" 
                />
            }
            <span>{props.text}</span>
        </button>
    )
}