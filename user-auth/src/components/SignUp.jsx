import React,{ useState,useEffect} from "react";
import {useHistory} from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import axios from "axios";

function SignUp() {

    const history = useHistory();

    const [user,setUser] = useState({
        username:"",
        password:"",
        department:""
    })

    const handleInput = (e) =>{
        setUser({...user,[e.target.name]: e.target.value})
        console.log(user)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios
        .post("http://localhost:4000/auth/register",user)
        .then(res =>{
            console.log(res);
            history.push("/login")
        })
        .catch(err =>{console.log(err.response)})
    }
  return (
    <div>
      <form onSubmit = {handleSubmit}>
          <label htmlFor ="username" >Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter Desired Username"
          onChange = {handleInput}
        />
        <br/>
        <label htmlFor ="password" >Password</label>
         <input
          type="text"
          name="password"
          placeholder="Enter Desired Password"
          onChange = {handleInput}
        />
        <br/>
        <label htmlFor ="department" >Department</label>
         <input
          type="text"
          name="department"
          placeholder="Enter Department"
          onChange = {handleInput}
        />
        <input type = "submit"/>
      </form>
    </div>
  );
}

export default SignUp;
