import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth"
import useAxiosPrivate from "./useAxiosPrivate";

const url = 'auth/logout'
const useLogout = () => {
    const { auth, setAuth, setPersist } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            setAuth({});
            setPersist(false);
            const response = await axiosPrivate.get(url);
            if(response?.status === 204){
                navigate('/login');
            }
        } catch (error) {

        }
    }

    return logout;

}

export default useLogout;