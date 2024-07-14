import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome,  FaPlus} from 'react-icons/fa';
import { AiOutlineAppstore } from "react-icons/ai";

const Footer: React.FC = () => {
  return (
    <div className='footer'>
    <div className="container mx-auto flex justify-center">
    <Link to="/" className="flex flex-col items-center justify-center w-1/3 py-2 px-4 rounded-md text-gray-900 hover:bg-[#E2EDF8] hover:text-blue-500 transition duration-300">
          <FaHome className=" text-gray-900 hover:text-blue-500 mr-2 size-9" />
          Home
        </Link>
        <Link to="/all" className="flex flex-col items-center justify-center w-1/3 py-2 px-4 rounded-md  text-gray-900 hover:text-blue-500 hover:bg-[#E2EDF8]  transition duration-300">
          <AiOutlineAppstore className=" text-gray-900 hover:text-blue-500 size-9" />
          All
        </Link>
        <Link to="/create" className="flex flex-col items-center justify-center w-1/3 py-2 px-4 rounded-md text-gray-900 hover:text-blue-500 hover:bg-[#E2EDF8]  transition duration-300">
          <FaPlus className="text-gray-900 hover:text-blue-500 mr-2 size-9" />
          Create
        </Link>
    </div>
  </div>
  );
};

export default Footer;
