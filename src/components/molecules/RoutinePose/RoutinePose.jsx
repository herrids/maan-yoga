import { useTranslation } from 'react-i18next';

import ControlButtons from "../ControlButtons/ControlButtons"

export default function ({pose, index, handleChange, handleRemoval}) {
    const { t } = useTranslation();
    
    return (
        <div className="pose-image">
            <img src={`poses/${pose.name}.svg`} alt={pose.name} />
            <div className="pose-controls">
                <ControlButtons
                    label={t("breathing")}
                    type="checkbox"
                    name="breath"
                    i={index}
                    handleChange={handleChange}
                    first={{value:"Einamten", checked: pose.breath === "Einamten", label: t("in")}}
                    second={{value:"Ausatmen",checked: pose.breath === "Ausatmen",label: t("out")}}
                />
                <ControlButtons
                    label={t("equipment")}
                    type="checkbox"
                    name="assistiveEquipment"
                    i={index}
                    handleChange={handleChange}
                    first={{value:"Klotz", checked: pose.assistiveEquipment === 'Klotz',label: t("block")}}
                    second={{value:"Gurt", checked: pose.assistiveEquipment === 'Gurt',label: t("strap")}}
                />
                <button className="remove-pose" onClick={() => handleRemoval(index)}>{t("delete")}</button>
            </div>
        </div>
    )
}