import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

import { getUserFlows } from "../services/supabaseService";

import FlowCard from "../components/FlowCard/FlowCard";
import Loader from "../components/Loader/Loader";

import { useAuth0 } from '@auth0/auth0-react';

export default function FlowOverview() {
    const [flows, setFlows] = useState([])
    const [loading, setLoading] = useState(true)
    const {user} = useAuth0();

    const { t } = useTranslation();

    useEffect(()=>{
        getUserFlows(user.email)
            .then( flowList => {
                setFlows(flowList)
                setLoading(false)
            })
    }, [user])

    return (
        <>
        <main>
            {loading == false ? 
                <div className="flow-overview">
                    {flows.length ? flows.map((flow, index) => (
                    <FlowCard
                        key={index}
                        flow={flow}
                    />
                    )) : <p>{t("noFlow")}</p>}
                </div>
            : <Loader show={loading}/>}
        </main>
        </>
    );
}
