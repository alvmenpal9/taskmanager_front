import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

const RequireAuth = () => {

    const { auth } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        auth?.accessToken ? setIsLoading(true) : navigate('/login')
    })

    return (
        isLoading
            ? <main className="main">
                <Outlet />
            </main>
            : navigate('/login')
    )
}

export default RequireAuth;