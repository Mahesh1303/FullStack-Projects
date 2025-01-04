import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Backendurl } from '../config';

function UseUserAuth() {
  const [isAuthenticated, SetisAuthenticated] = useState(false);
  const [loading, SetLoading] = useState(true); 

  useEffect(() => {
    const CheckAuth = async () => {
      try {
        const response = await axios.get(`${Backendurl}/secure/user`, { withCredentials: true });
        if (response.status === 202) {
          SetisAuthenticated(true);
        }
      } catch (error) {
        SetisAuthenticated(false); 
      } finally {
        SetLoading(false); 
      }
    };

    CheckAuth();
  }, []);

  return { isAuthenticated, loading }; 
}

export default UseUserAuth;
