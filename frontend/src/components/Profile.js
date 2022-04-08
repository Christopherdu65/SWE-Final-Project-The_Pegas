import { useState, useEffect } from 'react';
import "./Components.css";

function Profile() {

    const [user, setUser] = useState([]);
    const [avatar, setAvatar] = useState();

    useEffect(() => {
        fetch('users/2', {})
        .then(response => response.json())
        .then(response => { 
            setUser(response)
            setAvatar('https://avatars.dicebear.com/api/human/'  + response.username + '.svg')
        })
        .catch(error => console.log(error))
       
    }, []);

    return (
        <div className="Profile">
            <div className="userinfo">
                <h1>{user.username}</h1>
                <img className="avatar" src={avatar} alt="profile image"/>
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