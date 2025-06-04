import React from 'react'
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addRequests, removeRequest } from '../utils/requestSlice';
import { useSelector } from "react-redux";

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + '/user/requests/received', {
                withCredentials: true
            });
            dispatch(addRequests(res.data.data));
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL + `/request/review/${status}/${_id}`,
                {}, {
                withCredentials: true
            });
            dispatch(removeRequest(_id));
        } catch (error) {
            console.error(`Error ${status} request:`, error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    if (requests === null) return;

    if (requests.length === 0) return <h1 className="flex justify-center text-2xl my-5 font-bold">No Request Found</h1>;

    return (
        <div className="flex flex-col items-center my-10">
            <h1 className="text-2xl font-bold text-white mb-6">Connection Requests</h1>

            <div className="flex flex-col gap-4 w-1/3 mx-auto">
                {requests.map((request, index) => {
                    const { _id, photoUrl, firstName, lastName, about, age, gender } = request.fromUserId;
                    return (
                        <div
                            key={_id}
                            className="bg-gray-800 text-white p-4 rounded-lg flex items-center"
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
                            <div className="flex gap-2 ml-4">
                                <button className="btn btn-primary"
                                    onClick={() => reviewRequest('rejected', request._id)}>Reject</button>
                                <button className="btn btn-secondary"
                                    onClick={() => reviewRequest('accepted', request._id)}>Accept</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
};

export default Requests;