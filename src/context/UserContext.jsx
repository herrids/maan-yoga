import { createContext, useState, useContext, useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth'

import Loader from "../components/Loader/Loader";

import { auth } from "../../firebase";

export const Context = createContext()

function getContext() {
    const context = useContext(Context)

    if(!context) {
        throw new Error("needs to be used within Cart Context")
    }
    return context
}

export function useUser() {
    const context = getContext()

    const {loggedInUser, setLoggedInUser} = context

    return {
        loggedInUser,
        setLoggedInUser
    }
}

export default function ContextProvider({children}) {

    const [loggedInUser, setLoggedInUser] = useState("")
    
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        setLoggedInUser(user);
    }, [user]);


    return (
        <Context.Provider
            value={{
                loggedInUser, 
                setLoggedInUser
            }}
        >
            {loading ? <Loader show={loading}/> : children}
        </Context.Provider>
    )
}