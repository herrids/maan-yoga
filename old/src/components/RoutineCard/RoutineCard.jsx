import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { formatDate } from "../../util/dateFormat";

import "./RoutineCard.scss"

export default function (props) {
    const { name, created_at, id } = props.routine;

    const { t } = useTranslation();

    return (
        <Link to={`/flows/${id}`}>
            <div className="routine-card">
                <h2>{name}</h2>
                <p>{formatDate(created_at)}</p>
            </div>
        </Link>
    );
}