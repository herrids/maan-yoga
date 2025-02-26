import "./TextField.scss"

export default function(props){
    return (
        <>
        <label className="textfield__label">{props.label}</label>
        <input
            className="textfield__input"
            value={props.value}
            onChange={e => props.changeHandler(e.target.value)}
            type={props.type}
            onKeyDown={props.enterHandler && (e => {
              if (e.key === 'Enter') {
                props.enterHandler();
              }
            })}
        />
        </>
    )
}