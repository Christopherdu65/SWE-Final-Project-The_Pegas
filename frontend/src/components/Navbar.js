const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Trivia App</h1>
            <div className="links">
                <li>
                    home
                </li>

                <li>
                    quizzes
                </li>

                <li>
                    leaderboard
                </li>

                <li>
                    current user's profile
                </li>

                <li>
                    logout
                </li>
            </div>
        </nav>
    )
}

export default Navbar;