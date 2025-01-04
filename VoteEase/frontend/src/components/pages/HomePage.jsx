import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardFooter, CardTitle, CardContent } from '../ui/Card';
import { Vote, HelpCircle, Facebook, Twitter, Instagram } from 'lucide-react';
import LoginForm from './login/Loginform';
import RegisterForm from './login/RegistrationForm';
import { Alert, AlertDescription } from '../ui/Alert';

const ProcessStep = ({ number, title, description }) => (
  <div className="flex items-start space-x-4 border border-gray-300 rounded-lg p-4 shadow-sm">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold">
      {number}
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default function HomePage() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-white to-gray-200">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 shadow-md border-b-4 border-indigo-700">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Vote className="text-white w-10 h-10" />
            <span className="text-3xl font-bold">VoteEase</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#how-it-works" className="text-white hover:text-gray-300 transition">
              How It Works
            </a>
            <a href="#faq" className="text-white hover:text-gray-300 transition">
              FAQ
            </a>
            <a href="#contact" className="text-white hover:text-gray-300 transition">
              Contact Us
            </a>
          </nav>

          <button className="md:hidden text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between ">
        {/* Left-side Image */}
        <motion.div
          className="w-full md:w-1/2 mb-8 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="/Digital-Vote.jpg"
            alt="Voting Illustration"
            className="rounded-lg  w-full h-auto object-cover border  border-gray-200"
          />
        </motion.div>

        {/* Login/Register Form */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Card className="w-full max-w-md bg-gradient-to-r from-white to-gray-100 shadow-lg rounded-lg p-6 border border-gray-300">
            <CardHeader className="mb-4 border-b pb-4">
              <CardTitle className="text-2xl font-bold text-center text-gray-800">
                {isLogin ? 'Login to Vote' : 'Create an Account'}
              </CardTitle>
            </CardHeader>

            {isLogin ? (
              <LoginForm setError={setError} toggleForm={toggleForm} />
            ) : (
              <RegisterForm setIsLogin={setIsLogin} toggleForm={toggleForm} />
            )}

            {error && (
              <Alert variant="destructive" className="mt-4 border-t border-red-400">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <CardFooter className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <button
                  type="button"
                  onClick={toggleForm}
                  className="text-indigo-500 hover:underline"
                >
                  {isLogin ? 'Register here' : 'Login here'}
                </button>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </main>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gradient-to-br from-pink-50 to-yellow-100">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">How It Works</h2>
        <div className="container mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <ProcessStep
            number="1"
            title="Register"
            description="Create an account with your valid voter ID and set up your secure login credentials."
          />
          <ProcessStep
            number="2"
            title="Verify"
            description="Complete the verification process to ensure the integrity of your vote."
          />
          <ProcessStep
            number="3"
            title="Vote"
            description="Cast your vote securely from anywhere, at any time during the election period."
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-gradient-to-r from-green-100 to-blue-50">
        <h2 className="text-3xl font-bold text-center text-teal-700 mb-8">Frequently Asked Questions</h2>
        <div className="container mx-auto grid gap-8 md:grid-cols-2">
          <Card className="bg-white shadow-md rounded-lg border border-gray-300">
            <CardHeader className="flex items-center space-x-2 p-4 border-b">
              <HelpCircle className="w-5 h-5 text-indigo-500" />
              <CardTitle>Is my vote really secure?</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p>
                Yes, we use advanced encryption techniques to ensure the security and anonymity of your vote. Our system is regularly audited by independent security experts.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md rounded-lg border border-gray-300">
            <CardHeader className="flex items-center space-x-2 p-4 border-b">
              <HelpCircle className="w-5 h-5 text-indigo-500" />
              <CardTitle>What if I need help while voting?</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p>
                Our platform provides step-by-step guidance throughout the voting process. If you need additional assistance, our support team is available 24/7 via chat or phone.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-12 border-t-4 border-indigo-700">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul>
              <li>
                <a href="#how-it-works" className="hover:underline">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:underline">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">About VoteEase</h3>
            <p className="text-sm">
              VoteEase is dedicated to ensuring fair and accessible elections through secure online voting. Our platform makes it easy to cast your vote from anywhere.
            </p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-gray-300">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" className="hover:text-gray-300">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" className="hover:text-gray-300">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm">
          &copy; 2024 VoteEase. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
