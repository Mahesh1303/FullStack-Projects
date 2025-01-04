import React, { useState } from "react";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { Label } from "../../ui/Label";
import { CardContent } from "../../ui/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterForm({ toggleForm }) { // Accept toggleForm as a prop
  const [name, setName] = useState("");
  const [voterId, setVoterId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      console.log("Registering with:", voterId, password);
      try {
        const response = await axios.post(
          "http://localhost:3030/api/auth/register",
          {
            username: name,
            voterId: voterId,
            password: password,
          }
        );
        if (response) {
          setMessage("You are logging into the Portal");
          setError(false);
          setTimeout(() => {
            toggleForm(); // Call toggleForm to switch to login form
            navigate("/"); // Redirect after successful registration
          }, 1000);
        }
      } catch (error) {
        console.log(error);
        setMessage("Registration failed. Please try again."); // Optional: Set error message
        setError(true);
      }
    } else {
      setMessage("Passwords do not match.");
      setError(true);
    }
  };

  return (
    <CardContent>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-blue-800">
            Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border-blue-300 focus:border-blue-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="voterId" className="text-blue-800">
            Choose Voter ID
          </Label>
          <Input
            id="voterId"
            type="text"
            placeholder="Choose a Voter ID"
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
            placeholder="Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-blue-300 focus:border-blue-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-blue-800">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="border-blue-300 focus:border-blue-500"
          />
        </div>
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Register
        </Button>
      </form>
    </CardContent>
  );
}
