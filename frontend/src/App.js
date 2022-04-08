import { React } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Profile from "./components/profile/Profile";
import Leaderboard from "./components/leaderboard/Leaderboard";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {

    return (
            <div className="App">
                <Router>
                    <Navbar/>
                    <Switch>
                        <Route path="/leaderboard">
                            <Leaderboard/>
                        </Route>

                        <Route path="/profile">
                            <Profile/>
                        </Route>
                    </Switch>
                </Router>
            </div>
    );
}

export default App;
