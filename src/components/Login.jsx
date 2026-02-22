import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../environment';
import { useNavigate, Link } from 'react-router-dom';

import loginBg from '../assets/login-bg-vibrant.png';

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            console.log(user);
            localStorage.setItem("uid", user.user.uid);
            // alert("User logged in successfully"); // Removed alert for smoother UX, can add toast later
            setFormData({ email: "", password: "" });
            navigate('/');
        } catch (error) {
            console.log(error);
            alert("Login failed. Please check your credentials.");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            {/* Background Overlay */}
            <div className="absolute inset-0 z-0">
                <img src={loginBg} alt="Background" className="w-full h-full object-cover opacity-20 dark:opacity-60 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-white/30 dark:bg-black/50 transition-colors duration-300"></div>
            </div>

            {/* Glass Card */}
            <div className="relative z-10 max-w-md w-full bg-white/90 dark:bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50 dark:border-white/20 p-8 sm:p-10 transition-colors duration-300">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Welcome Back</h2>
                    <p className="text-gray-500 dark:text-gray-300 transition-colors duration-300">Sign in to continue to MyShop</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors duration-300"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors duration-300"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-pink-600 bg-transparent border-gray-300 dark:border-gray-500 rounded focus:ring-pink-500 transition-colors duration-300" />
                            <span className="ml-2">Remember me</span>
                        </label>
                        <Link to="#" className="hover:text-pink-500 transition">Forgot Password?</Link>
                    </div>

                    <button
                        type='submit'
                        className="w-full py-3 px-4 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-pink-500/30 transition duration-300 transform hover:-translate-y-0.5"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                    <p>
                        Don't have an account?{' '}
                        <Link to="/register" className="font-bold text-pink-500 hover:text-pink-400 transition">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
