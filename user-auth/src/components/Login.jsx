import React, {useState} from "react";
import axios from "axios"

function Login() {

    const [user,setUser] = useState({
        username:"",
        password:""
    })

    const handleInput = (e) =>{
        setUser({...user,[e.target.name]: e.target.value})
        console.log(user)
    }


    const handleSubmit = (e) =>{
        e.preventDefault();
        axios
        .post("http://localhost:4000/auth/login",user)
        .then(res =>{
            console.log(res);
            // window.localStorage.setItem("token")
            // history.push("/users")
        })
        .catch(err =>{console.log(err.response)})
    }
    
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          onChange={handleInput}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          placeholder="EnterPassword"
          onChange={handleInput}
        />
      </form>
    </div>
  );
}

export default Login;
