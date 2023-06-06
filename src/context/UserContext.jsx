import { createContext, useState, useContext, useEffect } from "react";

import { auth } from "../../firebase";
import { useAuthState } from 'react-firebase-hooks/auth'

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
    
    const [user] = useAuthState(auth);

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
            {children}
        </Context.Provider>
    )
}