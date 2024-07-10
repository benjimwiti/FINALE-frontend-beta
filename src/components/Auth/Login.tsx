import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../app/api/apiSlice';
import {  useDispatch} from 'react-redux';
import { setUser } from '../../app/store/slices/userSlice';
import { AppDispatch } from '../../app/store/store';


type FormData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch:AppDispatch = useDispatch()
  
  const [loginUser] = useLoginUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
//Handle Form Submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(formData);

      if (data) {
        dispatch(setUser(data.user));
        console.log('Login successful:', data.user);
        navigate('/');
      }
    } catch (err:any) {
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-left font-semibold my-7'>Sign In</h1>
    <div className='flex gap-2 mt-5 justify-center'>
      <p>Don't have an account?</p>
      <Link to='/signup'>
        <span className='text-blue-500'>Create now</span>
      </Link>
    </div>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>      
      <div className='flex flex-col'>
        <label htmlFor='email' className='mb-1'>Email</label>
        <input
          type='email'
          placeholder='Email'
          id='email'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
          value={formData.email}
          required
        />
      </div>
      <div className='flex flex-col'>
        <label htmlFor='password' className='mb-1'>Password</label>
        <input
          type='password'
          placeholder='Password'
          id='password'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
          value={formData.password}
          required
        />
      </div>      
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button
          type='submit'
          className={`bg-blue-500 text-white p-3 rounded-lg mt-9 w-80 mx-auto ${(!formData.email || !formData.password) ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!formData.email || !formData.password}
        >
          Sign In
        </button>
    </form>
  </div>
  );
};

export default Login;
