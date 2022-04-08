import { useState, useEffect } from 'react';
import UserList from "./UserList"
import "./Leaderboard.css";

function Leaderboard() {

    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        fetch('/api/leaderboard', {})
        .then(response => response.json())
        .then(response => setLeaders(response))
        .catch(error => console.log(error))
    }, []);

    console.log(leaders)
    // to-do: sort users by score beforer listing them out <UserList users={users}/>

    return (
        <div className="board">
            <h1>Leaderboard</h1>
                
            <div className="list">
                
            </div>
        </div>    

    )
}

export default Leaderboard;