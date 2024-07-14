import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaBars } from 'react-icons/fa';
import Profile from '../Profile/Profile';


const Navbar: React.FC = () => {
  return (
    <div className='navbar'>
    <div className="container mx-auto flex justify-between items-center">
    <Link to="/" className="text-black text-lg font-bold">
    ✔️ Checked
        </Link>
<div className='flex justify-between items-center '>
  <div className="pt-3 hover:text-gray-300">
  <Profile />
  </div>

          <Link to="/notifications" className="text-black px-5 hover:text-gray-300">
            <FaBell className="text-xl  " />
          </Link>
          <FaBars className="text-black text-2xl hover:text-gray-300" />
</div>
    </div>
   </div>
  );
};

export default Navbar;
