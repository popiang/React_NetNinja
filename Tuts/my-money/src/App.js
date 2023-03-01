import { BrowserRouter, Route, Switch } from "react-router-dom";

// components
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

// styles
import "./App.css";

function App() {
    return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/signup">
						<Signup />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
 