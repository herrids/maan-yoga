import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

import { getUserRoutines } from "../../firebase";
import { useUser } from "../context/UserContext";

import RoutineCard from "../components/RoutineCard/RoutineCard";

export default function RoutineOverview() {
    const [routines, setRoutines] = useState([])
    const {loggedInUser} = useUser()

    const { t } = useTranslation();

    useEffect(()=>{
        getUserRoutines(loggedInUser.email)
            .then( routineList => {
                setRoutines(routineList)
            })
    }, [loggedInUser])
    
    return (
        <>
        <main>
            <div className="routine-overview">
                {routines.length ? routines.map((routine, index) => (
                <RoutineCard
                    key={index}
                    routine={routine}
                />
                )) : <p>{t("noFlow")}</p>}
            </div>
        </main>
        </>
    );
}
