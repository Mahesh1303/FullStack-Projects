// LoginForm.js

"use client";

import React, { useState } from "react";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { Label } from "../../ui/Label";
import { CardContent, CardFooter, CardTitle } from "../../ui/Card";
import { Alert, AlertDescription } from "../../ui/Alert";
import { LogIn, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { useState } from 'react';
import axios from "axios";

export default function LoginForm() {
  const [voterId, setVoterId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (voterId === "admin" && password === "admin") {
      navigate("/admin-dashboard");
      setError(""); 
      return;
    } else {
      const response = await axios.post(
        "http://localhost:3030/api/auth/login",
        {
          voterId: voterId,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      if(response){
        navigate("/user-dashboard");
        console.log(response);
      } else {
        alert("Invalid VoterId or Password")
        return;
      }
    }
  };

  

  return (
    <CardContent>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="voterId" className="text-blue-800">
            Voter ID
          </Label>
          <Input
            id="voterId"
            type="text"
            placeholder="Enter your Voter ID"
            value={voterId}
            onChange={(e) => setVoterId(e.target.value)}
            required
            className="border-blue-300 focus:border-blue-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-blue-800">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-blue-300 focus:border-blue-500"
          />
        </div>
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Login
        </Button>
      </form>
    </CardContent>
  );
}
