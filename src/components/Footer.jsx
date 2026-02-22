import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 transition-colors duration-300 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* About Section */}
                    <div>
                        <h3 className="text-gray-900 dark:text-white text-lg font-bold mb-4 tracking-wider">ABOUT US</h3>
                        <div className="w-12 h-1 bg-pink-600 mb-6"></div>
                        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                            At MyShop, we believe that the right pair of shoes can take you anywhere. We're dedicated to bringing you a curated collection of stylish, comfortable, and high-quality footwear for every occasion.
                        </p>
                    </div>

                    {/* Opening Hours */}
                    <div>
                        <h3 className="text-gray-900 dark:text-white text-lg font-bold mb-4 tracking-wider">OPENING HOURS</h3>
                        <div className="w-12 h-1 bg-pink-600 mb-6"></div>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li className="flex justify-between"><span>Monday:</span> <span>Closed</span></li>
                            <li className="flex justify-between"><span>Tue-Wed:</span> <span>09am - 10pm</span></li>
                            <li className="flex justify-between"><span>Thu-Fri:</span> <span>09am - 10pm</span></li>
                            <li className="flex justify-between"><span>Sat-Sun:</span> <span>09am - 10pm</span></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-gray-900 dark:text-white text-lg font-bold mb-4 tracking-wider">CONTACT US</h3>
                        <div className="w-12 h-1 bg-pink-600 mb-6"></div>
                        <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                            <li className="flex items-start">
                                <svg className="w-5 h-5 mr-3 text-pink-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                <span>Ipsum Street, Lorem Tower,<br />MO, Columbia, 508000</span>
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-3 text-pink-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                <span>+01 2000 800 9999</span>
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-3 text-pink-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                <span>info@myshop.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-gray-900 dark:text-white text-lg font-bold mb-4 tracking-wider">NEWSLETTER</h3>
                        <div className="w-12 h-1 bg-pink-600 mb-6"></div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
                        <form className="flex flex-col space-y-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-pink-600 border border-gray-200 dark:border-gray-700 transition-colors"
                            />
                            <button
                                type="button"
                                className="bg-pink-600 text-white px-4 py-3 rounded font-bold hover:bg-pink-700 transition duration-300 transform hover:scale-105 shadow-md hover:shadow-pink-600/50"
                            >
                                SUBSCRIBE
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; 2025 MyShop. All Rights Reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <Link to="#" className="hover:text-pink-600 transition">Privacy Policy</Link>
                        <Link to="#" className="hover:text-pink-600 transition">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
