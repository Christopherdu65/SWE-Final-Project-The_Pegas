import HappyFace from "./HappyFace.jpeg"
import { useState } from 'react';
import "./Components.css";

function Profile() {

    // later: remove this data and fetch current user and their info from database
    const [username, setUsername] = useState('user1')
    const [image, setImage] = useState(HappyFace)
    const [ranking, setRanking] = useState(1)
    const [bio, setBio] = useState("words")
    const [quizzes, setQuizzes] = useState(["quiz1", "quiz2"])

    /*useEffect(() => {
        fetch('profile') 
    }*/

    return (
        <div className="Profile">
            <div className="userinfo">
                <h1>{username}</h1>
                <img className="avatar" src={image} alt="profile image"/>
                <p>{ranking}</p>
            </div>

            <div className="bio">
                {bio}
            </div>

            <div className="quizzes">
                {quizzes.map(quiz => (
                    <li>{quiz}</li>
                ))}
            </div>

        </div>
    );
}

export default Profile;