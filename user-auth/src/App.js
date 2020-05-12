import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Users from "./components/Users";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path = "/" component = {SignUp}/>
          <Route exact path = "/" component = {Login}/>
          <PrivateRoute  exact path = "/users" component = {Users}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
