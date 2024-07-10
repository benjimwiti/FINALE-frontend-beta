import React from 'react'
import { useSelector} from 'react-redux'
import { RootState } from '../../app/store/store'
import { Link } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";

const Profile: React.FC= () => {
    //const currentUser = useSelector((state: RootState) => state.user.currentUser);
     const currentUser = useSelector((state: RootState) => state.user.currentUser)

     return (
      <div className="flex items-center p-3 mb-4">
      <Link to="/profile" className="flex items-center space-x-2">
        <FaUserCircle size={32} /> {/* Increase the size of the icon */}
        {currentUser && <p className="ml-2">{currentUser.name}</p>}
      </Link>
    </div>
    );
}

export default Profile