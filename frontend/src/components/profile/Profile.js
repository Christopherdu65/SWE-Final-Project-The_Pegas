import { useState, useEffect } from 'react';
import "./Profile.css";

function Profile() {

    const [user, setUser] = useState([]);
    const [avatar, setAvatar] = useState();

    // to-do: fetch current user logged in
    useEffect(() => {
        fetch('api/me', {})
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
                <p><b>{user.totalPoints}</b></p>
            </div>

            <div className="quizzes">
                <h3>Recently Played Quizzes</h3>
                // to-do, list recently played quizzes
            </div>

        </div>
    );
}

export default Profile;