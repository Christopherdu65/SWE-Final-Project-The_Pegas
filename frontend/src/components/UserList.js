const UserList = (props) => {
    console.log(props);
    const users = props.users;

    return (
        <div className="userlist">
            {users.map((user) => (
                <div className="userlist-item">
                    <img className="avatar-list" src={user.avatar} alt=""/>
                    <h2 className="username-list">{user.username}</h2>
                    <p className="score-list">{user.score}</p> 
                </div>
            ))}
        </div>
    );
}

export default UserList;