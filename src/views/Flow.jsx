import { useParams, Navigate, useNavigate, Link } from 'react-router-dom'
import { ReactComponent as BackButton } from '../assets/back.svg';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getFlow } from '../services/supabaseService';

import Flow from '../components/Flow/Flow';
import Loader from "../components/Loader/Loader";

import { useAuth0 } from '@auth0/auth0-react';

export default function() {
    const [flow, setFlow] = useState({})
    const [loading, setLoading] = useState(true)

    const { t } = useTranslation();

    const { id } = useParams();
    const navigate = useNavigate();
    const {user} = useAuth0();
    
    useEffect(()=> {
        const fetchFlow = async () => {
            const result = await getFlow(id);
            setFlow(result);
            setLoading(false)
        };
        fetchFlow();
    }, [id])

    useEffect(()=> {
        if (flow.userEmail !== user.email) {
            (<Navigate to="/" />);
        }
    }, [flow])
    return (
        <>
            {loading === true ? <Loader show={loading} /> :
            <>
            <div className="flow-controls">
                <div className="back-button" onClick={() => navigate(-1)}>
                    <BackButton />
                </div>
                <div>
                    <Link to="/new" 
                    state={{flow, id}}
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
                {<Flow flow={flow}/>}
            </div>
            </>}
        </>
    )
}