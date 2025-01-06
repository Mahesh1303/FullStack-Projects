import axios from 'axios';
import React from 'react'
import { useNavigate } from "react-router-dom";
import { Backendurl } from '../config';
import UseUserAuth from '../hooks/UseUserAuth';


function Logout() {
    const navigate = useNavigate();
    const{Logout}=UseUserAuth()
    
  const handleLogout = () => {
    Logout()
    navigate("/");
    
  };
  return ( 
    <button
    className="bg-red-600 place-content-center p-4 rounded-3xl text-white"
    onClick={handleLogout}
  >
    Logout
  </button>
  )
}

export default Logout