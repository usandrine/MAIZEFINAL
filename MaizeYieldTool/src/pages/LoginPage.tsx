import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [isLogin, setIsLogin] = useState(false); // Default to signup mode
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameError(''); // Clear error on input change
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError(''); // Clear error on input change
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordError(''); // Clear error on input change
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError(''); // Clear error on input change
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6; // Example: Minimum password length of 6
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let isValid = true;

    if (!isLogin) {
      if (!name.trim()) {
        setNameError('Name is required');
        isValid = false;
      }
    }

    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    if (!isLogin && password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }

    if (isValid) {
      if (isLogin) {
        console.log('Logging in with:', email, password);
        alert('Login functionality will be implemented here. Redirecting to dashboard...');
        // navigate('/dashboard'); // Redirect after successful login
        navigate('/dashboard');
      } else {
        console.log('Signing up with:', name, email, password);
        alert('Signup functionality will be implemented here. Redirecting to dashboard...');
        // navigate('/dashboard'); // Redirect after successful signup
      }
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    // Clear errors when toggling mode
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setNameError('');
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-6">{isLogin ? 'Login' : 'Sign Up for AgriYield'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Your Name
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${nameError ? 'border-red-500' : ''}`}
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={handleNameChange}
                required={!isLogin}
              />
              {nameError && <p className="text-red-500 text-xs italic">{nameError}</p>}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${emailError ? 'border-red-500' : ''}`}
              id="email"
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${passwordError ? 'border-red-500' : ''}`}
              id="password"
              type="password"
              placeholder="Choose a Password (min 6 characters)"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
          </div>
          {!isLogin && (
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${confirmPasswordError ? 'border-red-500' : ''}`}
                id="confirmPassword"
                type="password"
                placeholder="Confirm Your Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required={!isLogin}
              />
              {confirmPasswordError && <p className="text-red-500 text-xs italic">{confirmPasswordError}</p>}
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>
            <button
              className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800"
              type="button"
              onClick={toggleAuthMode}
            >
              {isLogin ? 'Create an Account' : 'Already have an account? Login'}
            </button>
          </div>
          {!isLogin && (
            <p className="text-center text-xs mt-4">
              By creating an account, you agree to our <a href="#" className="text-green-500 hover:underline">Terms of Service</a> and <a href="#" className="text-green-500 hover:underline">Privacy Policy</a>.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;