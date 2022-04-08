import { useState, useEffect } from 'react';
import QuizList from "./QuizList"
import "./Profile.css";

function Profile() {

    const [user, setUser] = useState([]);
    const [avatar, setAvatar] = useState();

    // to-do: fetch current user logged in
    useEffect(() => {
        fetch('api/me', {})
        .then(response => response.json())
        .then(response => { 
            setUser(response.user_info)
            setAvatar('https://avatars.dicebear.com/api/human/'  + response.user_info.username + '.svg')
        })
        .catch(error => console.log(error))
       
    }, []);

    return (
        <div className="Profile">
            <div className="userinfo">
                <h1>{user.username}</h1>
                <img className="avatar" src={avatar} alt="profile image"/>
                <p><b>{user.points}</b></p>
            </div>

            <div className="quizzes">
                <h3>Recently Played Quizzes</h3>
                <p><b>{user.plays} plays!</b></p>
                <QuizList quizzes={user.recents}/>
            </div>

        </div>
    );
}

export default Profile;