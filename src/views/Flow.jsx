import { useParams, Navigate, useNavigate, Link } from 'react-router-dom'
import { ReactComponent as BackButton } from '../assets/back.svg';
import { useEffect, useState } from 'react';

import { useUser } from '../context/UserContext';
import { getRoutine } from '../../firebase';

import Routine from '../components/Routine/Routine';

export default function() {
    const [routine, setRoutine] = useState({})

    const { id } = useParams();
    const navigate = useNavigate();
    const {loggedInUser} = useUser()
    
    useEffect(()=> {
        const fetchRoutine = async () => {
            const result = await getRoutine(id);
            setRoutine(result);
            console.log(result)
        };
        fetchRoutine();
    }, [id])

    useEffect(()=> {
        if (routine.userEmail !== loggedInUser.email) {
            (<Navigate to="/" />);
        }
    }, [routine])
    console.log(routine)
    return (
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
                    Bearbeiten
                </button>
                </Link>
                <button onClick={() => window.print()}>
                    Drucken
                </button>
                </div>
            </div>
            <div id="print-content">
                {<Routine routine={routine}/>}
            </div>
        </>
    )
}