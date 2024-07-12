import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store/store'; // Update with your store setup
import { useUpdateUserByIdMutation } from '../app/api/apiSlice'; // Replace with your actual action
import { setUser } from '../app/store/slices/userSlice';
import { FaUserCircle } from "react-icons/fa";
import Sidebar from '../components/Common/SideBar';

const ProfilePage: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ _id:currentUser?._id, name: currentUser?.name, email: currentUser?.email, password: currentUser?.password}); // Initialize with current user data
  const [error, setError] = useState<string | null>(null);
  const [updateUser] = useUpdateUserByIdMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Update user details
      if(currentUser){
        const { data } =await updateUser({id:currentUser._id,  updatedUser: formData })
        if(data){
            dispatch(setUser(data));
            localStorage.setItem('user', JSON.stringify(data));
            console.log('User details updated successfully:', formData);
        }
        
      }      
      
    } catch (err) {
      setError('Failed to update details. Please try again.');
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar /> 
      <div className="p-3 max-w-lg mx-auto">        
        <h1 className="text-3xl text-left font-semibold my-7">Edit Profile</h1>
        <div className="flex justify-center mb-4">
          <FaUserCircle size={100} />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1">
              Change Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-slate-100 p-3 rounded-lg mb-9"
              required
            />
            <label htmlFor="email" className="mb-1">
              Change Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-slate-100 p-3 rounded-lg mb-9"
              required
            />
            <label htmlFor="password" className="mb-1">
              Change Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-slate-100 p-3 rounded-lg mb-9"
            />
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg mt-4 w-80 mx-auto">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
