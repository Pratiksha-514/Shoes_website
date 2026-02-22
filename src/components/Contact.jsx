import React, { useState } from 'react';
import { saveContactedUser } from '../services/firebase.service';

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", contact: "", comments: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    saveContactedUser(formData.name, formData.email, formData.contact, formData.comments);
    alert("Your data saved successfully");
    setFormData({ name: "", email: "", contact: "", comments: "" });
  };

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row transform transition-all duration-300 hover:shadow-2xl hover:translate-y-[-2px]">

        {/* Contact Info Section */}
        <div className="md:w-1/3 bg-gray-900 dark:bg-gray-800 p-8 text-white flex flex-col justify-between transition-colors duration-300">
          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
            <p className="text-gray-400 dark:text-gray-300 mb-8 text-sm leading-relaxed">
              We'd love to hear from you. Fill out the form or reach out directly.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <span className="text-sm">+01 2000 800 9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <span className="text-sm">info@myshop.com</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex space-x-4">
            {/* Social Icons Placeholder */}
            <div className="w-8 h-8 bg-gray-700 dark:bg-gray-600 rounded-full hover:bg-pink-600 transition cursor-pointer transform hover:scale-110 hover:rotate-12"></div>
            <div className="w-8 h-8 bg-gray-700 dark:bg-gray-600 rounded-full hover:bg-pink-600 transition cursor-pointer transform hover:scale-110 hover:-rotate-12"></div>
            <div className="w-8 h-8 bg-gray-700 dark:bg-gray-600 rounded-full hover:bg-pink-600 transition cursor-pointer transform hover:scale-110 hover:rotate-12"></div>
          </div>
        </div>

        {/* Form Section */}
        <div className="md:w-2/3 p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition outline-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">Email Address</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition outline-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="john@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">Contact Number</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition outline-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="123-456-7890"
                  minLength={10}
                  maxLength={10}
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">Message</label>
              <textarea
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition outline-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 h-32 resize-none"
                placeholder="How can we help you?"
                required
                value={formData.comments}
                onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-pink-600 text-white font-bold py-3 rounded-lg hover:bg-pink-700 transition shadow-lg hover:shadow-pink-500/30 transform hover:-translate-y-0.5"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
