import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import Create from "./Create";
import useLogout from "../hooks/useLogout";
import DeleteCompleted from "./DeleteCompleted";

const url = 'task/';
const Home = () => {

    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [refresh, setRefresh] = useState(false);
    const logout = useLogout();
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
    }, [refresh])

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
                if (newStatus === 'completed') {
                    document.querySelector(`#label${taskId}`).classList.add('completed');
                    e.target.checked = true;
                } else {
                    document.querySelector(`#label${taskId}`).classList.remove('completed');
                    e.target.checked = false;
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
                    <Create setTasks={setTasks} />
                    <ul className="lists">
                        {tasks.map(task => (
                            <li key={task._id}>
                                <label htmlFor="status" id={`label${task._id}`} className={task.status === 'completed' ? 'completed' : ''}>{task.task}</label>
                                <input type="checkbox" name="status" checked={task.status === 'completed' ? true : false} onChange={e => changeStatus(e, task._id)} />
                            </li>
                        ))}
                    </ul>
                    <DeleteCompleted setRefresh={setRefresh} />
                    <button onClick={e => logout()}>Logout</button>
                </>
            )
    )
}

export default Home;