import HappyFace from "./HappyFace.jpeg"
import { useState } from 'react';
import UserList from "./UserList"
import "./Components.css";

function Leaderboard() {

    // later: remove this data and fetch users from the database their info
    const [users, setUsers] = useState([
        {username: "user1", avatar: HappyFace, score: 1440},
        {username: "user2", avatar: HappyFace, score: 1000},
        {username: "user3", avatar: HappyFace, score: 2300},
        {username: "user4", avatar: HappyFace, score: 1140},
        {username: "user5", avatar: HappyFace, score: 1100}
    ]);

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