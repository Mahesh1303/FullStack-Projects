import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup";
import { Label } from "../ui/Label";
import { Alert, AlertDescription, AlertTitle } from "../ui/Alert";
import { CheckCircle, AlertCircle, Vote, Download } from "lucide-react";
import axios from "axios";
import { useNomineeContext } from "../../NomineeContext"; // Adjust the path accordingly
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

export default function UserDashboard() {
  const { nominees } = useNomineeContext(); // Access nominees from context
  const [selectedNominee, setSelectedNominee] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState("");
  const [voterId, setVoterId] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    axios
      .get("http://localhost:3030/api/userData", {
        withCredentials: true,
      })
      .then((res) => {
        return res.data.userData;
      })
      .then((data) => {
        console.log(data);
        setVoterId(data.voterId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // Ensure this runs only once on mount

  const handleVote = () => {
    if (selectedNominee !== null) {
      setHasVoted(true);
      setError("");
    } else {
      setError("Please select a nominee before casting your vote.");
    }
  };

  const handleGoToHomePage = () => {
    navigate("/"); // Redirect to homepage
  };

  const VoteReceipt = ({ nominee }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mt-8 bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-green-800">
            Vote Receipt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-700">
            Thank you for voting! Here's your receipt:
          </p>
          <ul className="mt-2 space-y-2">
            <li>
              <strong>Voter ID:</strong> {voterId}
            </li>
            <li>
              <strong>Candidate:</strong> {nominee.name}
            </li>
            <li>
              <strong>Party:</strong> {nominee.party}
            </li>
            <li>
              <strong>Timestamp:</strong> {new Date().toLocaleString()}
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="bg-green-600 hover:bg-green-700">
            <Download className="mr-2 h-4 w-4" /> Download Receipt
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/voting-background-2.jpg')" }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white/90 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center flex items-center justify-center text-blue-800">
                <Vote className="mr-2" /> Cast Your Vote
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {!hasVoted ? (
                  <motion.div
                    key="voting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <RadioGroup
                      onValueChange={(value) =>
                        setSelectedNominee(
                          nominees.find((n) => n.id === Number(value))
                        )
                      }
                      className="space-y-4"
                    >
                      {nominees.map((nominee) => (
                        <motion.div
                          key={nominee.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <RadioGroupItem
                            value={nominee.id.toString()}
                            id={`nominee-${nominee.id}`}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={`nominee-${nominee.id}`}
                            className={`flex items-center space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-colors 
                              ${
                                selectedNominee?.id === nominee.id
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-blue-200"
                              }`}
                          >
                            <img
                              src={nominee.avatar}
                              alt={nominee.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                              <h3 className="font-semibold text-lg">
                                {nominee.name}
                              </h3>
                              <p className="text-gray-600">{nominee.party}</p>
                            </div>
                          </Label>
                        </motion.div>
                      ))}
                    </RadioGroup>
                    {error && (
                      <Alert variant="destructive" className="mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="voted"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Alert className="bg-green-100 border-green-300">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <AlertTitle className="text-green-800 font-semibold">
                        Success
                      </AlertTitle>
                      <AlertDescription className="text-green-700">
                        Your vote has been recorded successfully. Thank you for
                        participating!
                      </AlertDescription>
                    </Alert>
                    <VoteReceipt nominee={selectedNominee} />
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Button
                onClick={handleGoToHomePage} // Updated to navigate to homepage
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-lg font-semibold transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                Go to Homepage
              </Button>
              {!hasVoted ? (
                <Button
                  onClick={handleVote}
                  disabled={selectedNominee === null}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-200 ease-in-out transform hover:scale-105"
                >
                  Cast Vote
                </Button>
              ) : null /* Removed Return to Home button */}
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
