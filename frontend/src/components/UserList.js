const UserList = (props) => {
    console.log(props);
    const users = props.users;
    console.log(users);

    return (
        <div className="userlist">
           { users.map((user) => (
                <div className="userlist-item">
                    <h2 className="username-list">{user.username}</h2>
                    <p className="score-list">{user.totalPoints}</p> 
                </div>
            ))}
        </div>
    );
}

export default UserList;

//{/* <img className="avatar-list" src={user.avatar} alt=""/> 