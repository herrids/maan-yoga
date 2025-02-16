import "./Routine.scss"
import { formatDate } from "../../util/dateFormat"
import { useTranslation } from 'react-i18next';

export default function (props) {
    const {name, created_at, poses} = props.routine
    const { t } = useTranslation();
    
    return (
        <div className="yoga-routine">
            <h2 className="yoga-routine__name">{name}</h2>
            <p className="yoga-routine__date">{formatDate(created_at)}</p>
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
                                src={`/poses/${pose.pose_id}.svg`} 
                                alt={pose.pose_id}
                                /* onLoad={handleImageLoad} */
                            />
                            <div className="yoga-routine__poses__pose-details">
                                <p>{pose.breath} </p>
                                {pose.equipment && pose.equipment.length ? (
                                    <>
                                        <p>{t("equipment")}:</p>
                                        <p>{pose.equipment}</p>
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
