import { useState, useEffect, useImperativeHandle } from 'react';
import LeaderList from "./LeaderList"
import "./Leaderboard.css";
import Select from 'react-select'

function Leaderboard() {

    const [leaders, setLeaders] = useState();
    const [category, setCategory] = useState();

    useEffect(() => {
        fetch('/api/leaderboard', {})
        .then(response => response.json())
        .then(response => setLeaders(response))
        .catch(error => console.log(error))
    }, []);

    console.log(leaders);
    // to-do: sort users by score beforer listing them out <UserList users={users}/>

    const options = [
        {value: 1, label: 'Cat1'},
        {value: 2, label: 'Cat2'},
        {value: 3, label: 'Cat3'}
    ];

    function handleOnChange(value) {
        console.log(value)
        setCategory(value.value)
    }

    return (
        <div className="board">
            <h1>Leaderboard</h1>
                
            <center><Select 
            className="selectcat"
            options={options} 
            placeholder="Pick a category!" 
            onChange={handleOnChange}
            /></center>

            
            <div className="list">
            </div>
        </div>    

    )
}

export default Leaderboard;