import { createContext, useEffect } from "react";
import { useState } from "react";

export let UserToken = createContext(null);

export default function UserTokenProvider({ children }) {
    const [login, setLogin] = useState(null);
    useEffect(()=>{
        if(localStorage.getItem('token'))
        setLogin(localStorage.getItem('token'));
    },[])
    

    return (
        <UserToken.Provider value={{ login, setLogin }}>
            {children}
        </UserToken.Provider>
    );
}
