import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth, provider } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { selectuser, setactiveuser } from '../../Utils/userSlice';
import { fetchWatchlist } from '../../Utils/watchlistSlice';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';

const Login = ({ closemodal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const dispatch = useDispatch();
  const user = useSelector(selectuser);

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text');
    } else {
      setIcon(eyeOff);
      setType('password');
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchWatchlist(user.user.uid));
    }
  }, [dispatch, user]);

  const handlesubmit = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setactiveuser({ user: result.user }));
      alert('Login Successful! Now you can use the wishlist feature.');
      closemodal();
    } catch (error) {
      alert(error.message);
    }
  };

  const handlegooglesignin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      dispatch(setactiveuser({ user: result.user }));
      alert('Google sign-in successful');
      closemodal();
    } catch (error) {
      
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center w-full p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-blue-600 mb-2">Welcome Back</h2>
      <p className="text-gray-500 mb-4 text-center">Sign in to your account</p>

      <div className="w-full mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="w-full mb-2 relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          placeholder="Enter password"
          type={type}
          name="password"
          value={password}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black pr-10"
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          className="absolute right-3 top-9 cursor-pointer text-gray-500 hover:text-blue-600 transition"
          onClick={handleToggle}
        >
          <Icon icon={icon} size={20} />
        </span>
      </div>

      <button
        className="w-full py-2 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
        onClick={handlesubmit}
      >
        Sign In
      </button>

      <div className="flex items-center w-full my-2">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-gray-400 text-sm">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <button
        onClick={handlegooglesignin}
        tabIndex="0"
        className="flex items-center justify-center w-full py-2 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-50 transition duration-200"
        style={{ outline: 'none' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 48 48"
          className="mr-2"
        >
          <g>
            <path fill="#4285F4" d="M24 9.5c3.54 0 6.73 1.23 9.24 3.25l6.91-6.91C36.53 2.34 30.64 0 24 0 14.64 0 6.27 5.64 1.91 14.02l8.51 6.62C12.89 13.41 17.97 9.5 24 9.5z"/>
            <path fill="#34A853" d="M46.09 24.56c0-1.64-.15-3.22-.44-4.76H24v9.04h12.41c-.54 2.91-2.17 5.38-4.62 7.04l7.19 5.59C43.73 37.36 46.09 31.47 46.09 24.56z"/>
            <path fill="#FBBC05" d="M10.42 28.64c-.56-1.67-.88-3.44-.88-5.29s.32-3.62.88-5.29l-8.51-6.62C.32 15.38 0 19.53 0 24s.32 8.62 1.91 12.56l8.51-6.62z"/>
            <path fill="#EA4335" d="M24 48c6.64 0 12.53-2.19 16.91-5.97l-7.19-5.59c-2.01 1.35-4.59 2.15-7.72 2.15-6.03 0-11.11-3.91-12.89-9.14l-8.51 6.62C6.27 42.36 14.64 48 24 48z"/>
            <path fill="none" d="M0 0h48v48H0z"/>
          </g>
        </svg>
        <span className="text-gray-700 font-medium">Sign in with Google</span>
      </button>
    </div>
  );
};

export default Login;
