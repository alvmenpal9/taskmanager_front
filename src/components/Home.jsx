import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

const url = 'task/';
const Home = () => {

    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axiosPrivate.get(`${url}${auth.username}`, {
                    headers: {
                        Authorization: auth.accessToken,
                    }
                });
                if (response?.status === 200) {
                    setTasks(response?.data);
                    setIsLoading(false);
                }
            } catch (error) {
                if (error?.response?.status === 401) {
                    navigate('/login');
                }
            }
        };

        getData();

        return () => {
            setIsLoading(true);
            setTasks([]);
        }
    }, [])

    const changeStatus = async (e, taskId) => {
        const newStatus = e.target.checked ? 'completed' : 'pending';
        try {
            const response = await axiosPrivate.put(`${url}${taskId}`, {
                status: newStatus
            }, {
                headers: {
                    Authorization: auth.accessToken
                }
            });

            if (response?.data?.status === 200) {
                if (e.target.checked) {
                    document.querySelector(`#label${taskId}`).classList.add('completed');
                } else {
                    document.querySelector(`#label${taskId}`).classList.remove('completed');
                }
            }

        } catch (error) {
            if (error?.response?.status === 401) {
                navigate('/login');
            }
        }
    }

    return (
        isLoading
            ? 'Loading'
            : (
                <>
                    <h1>My Tasks</h1>
                    <form>
                        <div style={{display:'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px'}}>
                            <input type="text" name="newTask" />
                            <input type="submit" value="Create" style={{ width: '25%' }} />
                        </div>
                    </form>
                    <ul className="lists">
                        {tasks.map(task => (
                            <li key={task._id}>
                                <label htmlFor="status" id={`label${task._id}`} className={task.status === 'completed' ? 'completed' : ''}>{task.task}</label>
                                <input type="checkbox" name="status" onChange={e => changeStatus(e, task._id)} />
                            </li>
                        ))}
                    </ul>
                </>
            )
    )
}

export default Home;