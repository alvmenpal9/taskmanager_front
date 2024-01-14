import axios from "../api/axios";
import useAuth from "./useAuth"

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('auth/refresh', {
            withCredentials: true
        });
        setAuth(response?.data);

        return response?.data?.accessToken;
    }

    return refresh;
}

export default useRefreshToken;