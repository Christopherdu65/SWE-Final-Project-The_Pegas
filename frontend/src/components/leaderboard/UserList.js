const UserList = (props) => {
    const users = props.users;

    return (
        <div className="userlist">
           { users.map((user) => (
                <div className="userlist-item">
                    <img className="avatar-list" src={'https://avatars.dicebear.com/api/human/'  + user.username + '.svg'} alt="profile image"/>
                    <h2 className="username-list">{user.username}</h2>
                    <p className="score-list">{user.totalPoints}</p> 
                </div>
            ))}
        </div>
    );
}

export default UserList;
