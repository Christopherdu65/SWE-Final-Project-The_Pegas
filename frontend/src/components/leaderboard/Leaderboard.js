import { useState, useEffect, useImperativeHandle } from 'react';
import LeaderList from "./LeaderList"
import "./Leaderboard.css";
import Select from 'react-select'

function Leaderboard() {

    const [leaders, setLeaders] = useState([]);
    const [category, setCategory] = useState(0);
    const [url, setUrl] = useState('/api/leaderboard')

    useEffect(() => {
        fetch(url, {})
        .then(response => response.json())
        .then(response => setLeaders(response.results))
        .then(response => console.log(response.results))
        .catch(error => console.log(error))
    }, []);

    console.log(leaders);

    const options = [
        {value: 0, label: 'Cat0'},
        {value: 1, label: 'Cat1'},
        {value: 20, label: 'Cat20'}
    ];

    function handleOnChange(value) {
        setCategory(value.value)
        setUrl('/api/leaderboard?category=' + category)
        console.log(url)
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
                <LeaderList leaders={leaders}/>
            </div>
        </div>    

    )
}

export default Leaderboard;