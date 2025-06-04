import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
    const dispatch = useDispatch();
    const {_id, photoUrl, firstName, lastName, about, age, gender, skills } = user;

    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(BASE_URL + `/request/send/${status}/${userId}`, {},
                {
                    withCredentials: true
                });
            dispatch(removeUserFromFeed(userId));
        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img src={photoUrl} alt="Photo"/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName} {lastName}</h2>
                <p>{age} , {gender}</p>
                <p>{about}</p>
                <div className="card-actions justify-center">
                    <button className="btn btn-primary"
                        onClick={() => handleSendRequest('ignored', _id)}>Ignore</button>
                    <button className="btn btn-secondary"
                        onClick={() => handleSendRequest('interested', _id)}>Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard