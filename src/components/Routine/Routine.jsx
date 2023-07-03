import "./Routine.scss"
import { formatDate } from "../../util/dateFormat"

import { useTranslation } from 'react-i18next';

export default function (props) {
    const {name, date, poses} = props.routine

    const { t } = useTranslation();

    return (
        <div className="yoga-routine">
            <h2 className="yoga-routine__name">{name}</h2>
            <p className="yoga-routine__date">{formatDate(date)}</p>
            <div className="yoga-routine__poses">
            {poses && poses.map((pose, index) => (
                <div key={index} className="yoga-routine__poses__pose">
                    { pose.type == "text" ? (
                        <>
                            <p className="yoga-routine__poses__pose-text">{pose.text}</p>
                        </>
                    ) : (
                        <>
                            <img 
                                src={`/poses/${pose.name}.svg`} 
                                alt={pose.name}
                                onLoad={handleImageLoad}
                            />
                            <div className="yoga-routine__poses__pose-details">
                                <p>{pose.breath} </p>
                                {pose.assistiveEquipment && pose.assistiveEquipment.length ? (
                                    <>
                                        <p>{t("equipment")}:</p>
                                        <p>{pose.assistiveEquipment}</p>
                                    </>
                                ): null}
                            </div>
                        </>
                    )}
                </div>
            ))}
            </div>
        </div>
    )
}
