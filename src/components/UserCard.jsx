import React from 'react'

const UserCard = ({ user }) => {
    const { photoUrl, firstName, lastName, about, age, gender, skills } = user;
    console.log(user);
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
                    <button className="btn btn-primary">Ignore</button>
                    <button className="btn btn-secondary">Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard