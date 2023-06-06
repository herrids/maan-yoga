import { Link } from "react-router-dom";
import { formatDate } from "../../util/dateFormat";

import "./RoutineCard.scss"

export default function (props) {
    const { name, date, poses, id } = props.routine;

    return (
        <Link to={`/flows/${id}`}>
            <div className="routine-card">
                <h2>{name}</h2>
                <p>{formatDate(date)}</p>
                <p>{poses.length} Posen</p>
            </div>
        </Link>
    );
}