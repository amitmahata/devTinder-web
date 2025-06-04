import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { use, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import { useSelector } from 'react-redux';
import UserCard from './UserCard';

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + '/user/connections', {
                withCredentials: true
            });
            dispatch(addConnections(res.data.data));
        } catch (error) {
            console.error('Error fetching connections:', error);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    if (connections === null) return;

    if (connections.length === 0) return <h1 className="text-2xl font-bold">No Connections Found</h1>;

    return (
        <div className="flex flex-col items-center my-10">
            <h1 className="text-2xl font-bold text-white mb-6">Connections</h1>

            <div className="flex flex-col gap-4 w-full max-w-md">
                {connections.map((connection, index) => {
                    const { photoUrl, firstName, lastName, about, age, gender } = connection;
                    return (
                        <div
                            key={index}
                            className="bg-gray-800 text-white p-4 rounded-lg flex items-center shadow-md"
                        >
                            <img
                                src={photoUrl}
                                alt={`${firstName}'s avatar`}
                                className="w-14 h-14 rounded-full mr-4 object-cover"
                            />
                            <div>
                                <h2 className="font-semibold text-lg">{firstName} {lastName}</h2>
                                <p className="text-sm">{age}, {gender}</p>
                                <p className="text-sm mt-1">{about}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Connections