import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

import { getUserRoutines } from "../services/supabaseService";

import RoutineCard from "../components/RoutineCard/RoutineCard";
import Loader from "../components/Loader/Loader";

import { useAuth0 } from '@auth0/auth0-react';

export default function RoutineOverview() {
    const [routines, setRoutines] = useState([])
    const [loading, setLoading] = useState(true)
    const {user} = useAuth0();

    const { t } = useTranslation();

    useEffect(()=>{
        getUserRoutines(user.email)
            .then( routineList => {
                setRoutines(routineList)
                setLoading(false)
            })
    }, [user])

    return (
        <>
        <main>
            {loading == false ? 
                <div className="routine-overview">
                    {routines.length ? routines.map((routine, index) => (
                    <RoutineCard
                        key={index}
                        routine={routine}
                    />
                    )) : <p>{t("noFlow")}</p>}
                </div>
            : <Loader show={loading}/>}
        </main>
        </>
    );
}
