import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { formatDate } from "../../util/dateFormat";

import "./RoutineCard.scss"

export default function (props) {
    const { name, date, poses, id } = props.routine;

    const { t } = useTranslation();

    return (
        <Link to={`/flows/${id}`}>
            <div className="routine-card">
                <h2>{name}</h2>
                <p>{formatDate(date)}</p>
                <p>{poses.length} {t("poses")}</p>
            </div>
        </Link>
    );
}