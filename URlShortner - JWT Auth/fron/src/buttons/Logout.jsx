import React from 'react'
import { useNavigate } from "react-router-dom";


function Logout() {
    const navigate = useNavigate();

    
  const handleLogout = () => {

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