import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-human-sprites';

const UserList = (props) => {
    console.log(props);
    const users = props.users;
    console.log(users);

    return (
        <div className="userlist">
           { users.map((user) => (
                <div className="userlist-item">
                    <img className="avatar" src={ createAvatar(style, { seed: user.username }) } alt="profile image"/>
                    <h2 className="username-list">{user.username}</h2>
                    <p className="score-list">{user.totalPoints}</p> 
                </div>
            ))}
        </div>
    );
}

export default UserList;
