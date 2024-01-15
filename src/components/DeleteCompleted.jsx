import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const url = 'task/removeCompleted';
const DeleteCompleted = ({ setRefresh }) => {

    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    const deleteCompleted = async (e) => {
        try {
            const response = await axiosPrivate.delete(url, {
                headers: {
                    Authorization: auth.accessToken
                }
            });

            if (response?.status === 200) {
                setRefresh(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <p style={{ marginBottom: '5px', color: '#090d79', cursor: 'pointer' }} onClick={deleteCompleted}>Delete all completed tasks</p>
    )
};

export default DeleteCompleted;