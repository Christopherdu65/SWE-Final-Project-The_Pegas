const LeaderList = (props) => {
    const leaders = props.leaders;
    console.log(leaders)

    return (
        <div className="leaderlist">
           { leaders.map((leader) => (
                <div className="leaderlist-item">
                    <img className="avatar-list" src={'https://avatars.dicebear.com/api/human/'  + leader.username + '.svg'} alt="profile image"/>
                    <h2 className="username-list">{leader.username}</h2>
                    <p className="score-list">{leader.score}</p> 
                </div>
            ))}
        </div>
    );
}

export default LeaderList;
