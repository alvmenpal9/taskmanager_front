import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('trust')) || false);

    return (
        <AuthContext.Provider value={{
            auth,
            setAuth,
            persist,
            setPersist
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;