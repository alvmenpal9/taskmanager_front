import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

const create_url = 'task';
const Create = ({ setTasks }) => {

    const { auth } = useAuth();
    const [task, setTask] = useState('');
    const axiosPrivate = useAxiosPrivate();

    const createTask = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPrivate.post(create_url, { task: task }, {
                headers: {
                    Authorization: auth.accessToken
                }
            });
            if(response?.data?.status === 200){
                setTasks(tasks => [...tasks, response?.data?.task]);
                e.target.task.value = '';
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={createTask}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                <input type="text" name="task" placeholder="Create new task" onChange={e => setTask(e.target.value)} />
                <input type="submit" value="Create" style={{ width: '25%' }} />
            </div>
        </form>
    )
}

export default Create;