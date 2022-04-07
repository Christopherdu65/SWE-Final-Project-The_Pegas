import HappyFace from "./HappyFace.jpeg"
import { useState, useEffect } from 'react';
import UserList from "./UserList"
import "./Components.css";

function Leaderboard() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('users', {})
        .then(response => response.json())
        .then(response => setUsers(response.users))
        .catch(error => console.log(error))
    }, []);


    // to-do: sort users by score beforer listing them out

    return (
        <div className="board">
            <h1>Leaderboard</h1>

            <div className="list">
                <UserList users={users}/>
            </div>
        </div>    

    )
}

export default Leaderboard;