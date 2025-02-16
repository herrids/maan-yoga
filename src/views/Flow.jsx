import { useParams, Navigate, useNavigate, Link } from 'react-router-dom'
import { ReactComponent as BackButton } from '../assets/back.svg';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getRoutine } from '../services/supabaseService';

import Routine from '../components/Routine/Routine';
import Loader from "../components/Loader/Loader";

import { useAuth0 } from '@auth0/auth0-react';

export default function() {
    const [routine, setRoutine] = useState({})
    const [loading, setLoading] = useState(true)

    const { t } = useTranslation();

    const { id } = useParams();
    const navigate = useNavigate();
    const {user} = useAuth0();
    
    useEffect(()=> {
        const fetchRoutine = async () => {
            const result = await getRoutine(id);
            setRoutine(result);
            setLoading(false)
        };
        fetchRoutine();
    }, [id])

    useEffect(()=> {
        if (routine.userEmail !== user.email) {
            (<Navigate to="/" />);
        }
    }, [routine])
    return (
        <>
            {loading === true ? <Loader show={loading} /> :
            <>
            <div className="routine-controls">
                <div className="back-button" onClick={() => navigate(-1)}>
                    <BackButton />
                </div>
                <div>
                    <Link to="/new" 
                    state={{routine, id}}
                    >
                <button>
                    {t("edit")}
                </button>
                </Link>
                <button onClick={() => window.print()}>
                    {t("print")}
                </button>
                </div>
            </div>
            <div id="print-content">
                {<Routine routine={routine}/>}
            </div>
            </>}
        </>
    )
}