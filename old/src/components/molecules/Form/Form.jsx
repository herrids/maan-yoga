import TextField from "../../atoms/TextField/TextField"
import Button from "../../atoms/Button/Button"

import "./Form.scss"

export default function({ headline, textfields, button, children }) {

    return (
        <div className="form-container">
            <h3>{ headline }</h3>
            {textfields && textfields.map((t, i)=> (
                <TextField
                    label={t.label}
                    value={t.value} 
                    changeHandler={t.changeHandler} 
                    type={t.type}
                    key={i}
                />
            ))}
            { button &&
            <Button 
                clickHandler={button.clickHandler}
                type={button.type}
                text={button.text}
            />
            }
            { children &&
                <div className="form-extras-container">
                    {children}
                </div>
            }
        </div>
    )
}