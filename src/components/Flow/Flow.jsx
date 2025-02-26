import "./Flow.scss"
import { formatDate } from "../../util/dateFormat"
import { useTranslation } from 'react-i18next';

export default function (props) {
    const {name, created_at, poses} = props.flow
    const { t, i18n } = useTranslation();
    return (
        <div className="yoga-flow">
            <h2 className="yoga-flow__name">{name}</h2>
            <p className="yoga-flow__date">{formatDate(created_at)}</p>
            <div className="yoga-flow__poses">
            {poses && poses.map((pose, index) => (
                <div key={index} className="yoga-flow__poses__pose">
                    { pose.type == "text" ? (
                        <>
                            <p className="yoga-flow__poses__pose-text">{pose.text}</p>
                        </>
                    ) : (
                        <>
                            <img 
                                src={`/poses/${pose.pose_id}.svg`} 
                                alt={pose.pose_id}
                                /* onLoad={handleImageLoad} */
                            />
                            <div className="yoga-flow__poses__pose-details">
                                <p className="yoga-flow__poses__pose-name">{i18n.language === 'de' ? pose.name_german : pose.name_english}</p>
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
