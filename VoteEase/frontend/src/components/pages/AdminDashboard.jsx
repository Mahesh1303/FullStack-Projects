import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/Table";
import { Alert, AlertDescription, AlertTitle } from '../ui/Alert';
import { UserPlus, AlertCircle, BarChart, Trash2, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNomineeContext } from '../../NomineeContext'; // Import the context

export default function AdminDashboard() {
    const { nominees, setNominees } = useNomineeContext(); // Use context
    const [newNomineeName, setNewNomineeName] = useState('');
    const [newNomineeParty, setNewNomineeParty] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // Handle adding a new nominee
    const handleAddNominee = () => {
        if (newNomineeName && newNomineeParty) {
            const newNominee = {
                id: nominees.length + 1,
                name: newNomineeName,
                party: newNomineeParty,
                votes: 0,
            };
            setNominees([...nominees, newNominee]);
            setNewNomineeName('');
            setNewNomineeParty('');
            setError('');
        } else {
            setError('Please fill in both name and party for the new nominee.');
        }
    };

    // Handle deleting a nominee
    const handleDeleteNominee = (id) => {
        setNominees(nominees.filter((nominee) => nominee.id !== id));
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Logout Button */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-end"
                >
                    <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 flex items-center">
                        <LogOut className="mr-2" /> Logout
                    </Button>
                </motion.div>

                {/* Add New Nominee Section */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="bg-white/80 backdrop-blur-md">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold flex items-center text-blue-800">
                                <UserPlus className="mr-2" /> Add New Nominee
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nomineeName">Nominee Name</Label>
                                    <Input
                                        id="nomineeName"
                                        value={newNomineeName}
                                        onChange={(e) => setNewNomineeName(e.target.value)}
                                        placeholder="Enter nominee name"
                                        className="border-blue-300 focus:border-blue-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nomineeParty">Nominee Party</Label>
                                    <Input
                                        id="nomineeParty"
                                        value={newNomineeParty}
                                        onChange={(e) => setNewNomineeParty(e.target.value)}
                                        placeholder="Enter nominee party"
                                        className="border-blue-300 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            {error && (
                                <Alert variant="destructive" className="mt-4">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleAddNominee} className="bg-blue-600 hover:bg-blue-700">
                                Add Nominee
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>

                {/* Nominees Table Section */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card className="bg-white/80 backdrop-blur-md">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold flex items-center text-blue-800">
                                <BarChart className="mr-2" /> Vote Count
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Party</TableHead>
                                        <TableHead>Votes</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <AnimatePresence>
                                        {nominees.map((nominee) => (
                                            <motion.tr
                                                key={nominee.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <TableCell className="font-medium">{nominee.name}</TableCell>
                                                <TableCell>{nominee.party}</TableCell>
                                                <TableCell>{nominee.votes}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDeleteNominee(nominee.id)}
                                                        className="text-red-600 hover:text-red-800 hover:bg-red-100"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </motion.div>
                
            </div>
        </div>
    );
}
