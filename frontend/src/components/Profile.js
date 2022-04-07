import { useState, useEffect } from 'react';
import "./Components.css";
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-human-sprites';

function Profile() {

    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch('users/1', {})
        .then(response => response.json())
        .then(response => setUser(response))
        .catch(error => console.log(error))
    }, []);

    return (
        <div className="Profile">
            <div className="userinfo">
                <h1>{user.username}</h1>
                <img className="avatar" src={ createAvatar(style, { seed: user.username }) } alt="profile image"/>
                <p>{user.totalPoints}</p>
            </div>

            <div className="bio">
                // info for user {user.id} to-do, maybe editable bio?
            </div>

            <div className="quizzes">
                // to-do, list recently played quizzes
            </div>

        </div>
    );
}

export default Profile;