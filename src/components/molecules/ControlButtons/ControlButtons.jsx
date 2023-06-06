import "./ControlButtons.scss"

export default function(props) {
    const { i, label, type, name, first, second, handleChange } = props;

    return (
        <div className={`control`}>
            <label className="control-label">{label}</label>
            <div className={`${type}-buttons`}>
                <div>
                    <input 
                        type={type} 
                        id={`first${type}${i}`}
                        name={name}
                        value={first.value}
                        checked={first.checked} 
                        onChange={(event) => handleChange(event, i)} />
                    <label htmlFor={`first${type}${i}`}>{first.label}</label>
                </div>
                <div>
                    <input 
                        type={type}
                        id={`second${type}${i}`} 
                        value={second.value} 
                        name={name}
                        checked={second.checked} 
                        onChange={(event) => handleChange(event, i)} />
                    <label htmlFor={`second${type}${i}`}>{second.label}</label>
                </div>
            </div>
        </div>
    )
}
