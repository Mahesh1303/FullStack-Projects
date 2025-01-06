import React, { useState ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import UseUserAuth from '../hooks/UseUserAuth';


function Registration() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {isAuthenticated}=UseUserAuth()
 if (isAuthenticated){
  navigate('/url')
 }



  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:500/user", {
        name,
        email,
        password,
      },{withCredentials:true});

      if (response.status === 201) {
        alert("User Created Successfully");
        navigate("/");
      }
      setEmail("");
      setPassword("");
      setName("");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div>
       <Header/>
    <div className="flex justify-center items-center h-screen w-full  ">

      <div className="max-w-md w-full bg-slate-200 p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-semibold text-center text-gray-600 mb-6">
          Registration
        </h1>
        <form onSubmit={handleRegisterSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-600 font-medium mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 rounded-3xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-3xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-600 font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 rounded-3xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-700 text-white py-3 rounded-full hover:bg-red-600 transition duration-300"
          >
            Register
          </button>

          <div className="text-center mt-4">
            <Link to="/" className="text-blue-500 hover:underline">
              Already have an account? Login here.
            </Link>
          </div>
        </form>
      </div>
    </div>


    </div>
     
  );
}

export default Registration;
