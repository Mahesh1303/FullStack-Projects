import React from 'react';
import Logout from '../buttons/Logout';
import UseUserAuth from '../hooks/UseUserAuth';

function Header() {
  const {isAuthenticated}=UseUserAuth()
 
  return (
    <header className="w-full flex items-center justify-between bg-amber-400 p-4 rounded-full">
      <div className="flex-1 flex justify-center">
        <h1 className="text-2xl text-white font-semibold">URL Shortener</h1>
      </div>

      {isAuthenticated && (
        <div className="flex items-center">
          <Logout />
        </div>
      )}
    </header>
  );
}

export default Header;
