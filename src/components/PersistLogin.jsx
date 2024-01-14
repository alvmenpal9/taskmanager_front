import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth"
import useRefreshToken from "../hooks/useRefreshToken";
import { Outlet } from "react-router-dom";

const PersistLogin = () => {
    const { auth, persist } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        !auth.accessToken ? verifyRefreshToken() : setIsLoading(false);

    }, [])

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )

}

export default PersistLogin;