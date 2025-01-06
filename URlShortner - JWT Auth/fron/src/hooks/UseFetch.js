import axios from "axios";
import React, { useEffect, useState } from "react";

function UseFetch(urllink) {
  const [data, setData] = useState([]);
  const [err, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUrl = async () => {
    setLoading(true);
    try {
      const response = await axios.get(urllink, {
        withCredentials: true, 
      });
  
      if (response) {
        setData(response.data);
        setError("");
      } else {
        setError("Error in fetching");
      }
    } catch (e) {
      console.log(e);
      setError("An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchUrl();
  }, [urllink]); 

  return {
    data,
    err,
    loading,
    refetch: fetchUrl, 
  };
}

export default UseFetch;
