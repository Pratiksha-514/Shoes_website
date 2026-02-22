import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCartProducts, placeOrder } from '../services/firebase.service';

const Checkout = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Form, 2: Success
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const items = await getCartProducts();
    setCartItems(items);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, product) => {
      const price = parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0;
      return total + price;
    }, 0).toFixed(2);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userId = localStorage.getItem("uid");
    const total = calculateTotal();

    if (!userId) {
      alert("Please login first.");
      navigate('/login');
      return;
    }

    // Simulate network delay for payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const success = await placeOrder(userId, formData, cartItems, total);

    if (success) {
      setStep(2); // Show success screen
    } else {
      alert("Order failed. Please try again.");
    }
    setLoading(false);
  };

  if (step === 2) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 text-center px-4 transition-colors duration-300">
        <div className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-xl max-w-lg w-full transform animate-fade-in-up transition-colors duration-300">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Order Placed!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Thank you, {formData.fullName.split(' ')[0]}! <br />
            Your order for <span className="font-bold">{cartItems.length} items</span> has been confirmed.
          </p>
          <Link
            to="/"
            className="inline-block w-full bg-pink-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-pink-700 transition shadow-lg hover:shadow-pink-500/30"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Checkout</h1>

        <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row transition-colors duration-300">
          {/* Main Form */}
          <div className="p-6 sm:p-8 md:w-2/3 order-1 md:order-1 bg-white dark:bg-gray-900 transition-colors duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Shipping Information</h3>
                <div className="grid grid-cols-1 gap-4">
                  <input required name="fullName" placeholder="Full Name" onChange={handleInputChange} className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-pink-500 outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors" />
                  <input required name="email" type="email" placeholder="Email Address" onChange={handleInputChange} className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-pink-500 outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors" />
                  <input required name="address" placeholder="Street Address" onChange={handleInputChange} className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-pink-500 outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors" />
                  <div className="grid grid-cols-2 gap-4">
                    <input required name="city" placeholder="City" onChange={handleInputChange} className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-pink-500 outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors" />
                    <input required name="zipCode" placeholder="ZIP Code" onChange={handleInputChange} className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-pink-500 outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Payment Details</h3>
                <div className="grid grid-cols-1 gap-4">
                  <input required name="cardNumber" placeholder="Card Number" maxLength="19" onChange={handleInputChange} className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-pink-500 outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors" />
                  <div className="grid grid-cols-2 gap-4">
                    <input required name="expiry" placeholder="MM/YY" maxLength="5" onChange={handleInputChange} className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-pink-500 outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors" />
                    <input required name="cvv" placeholder="CVV" maxLength="3" type="password" onChange={handleInputChange} className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-pink-500 outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || cartItems.length === 0}
                className="w-full bg-gray-900 dark:bg-white text-white dark:text-black font-bold py-4 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition transform hover:scale-[1.01] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center"
              >
                {loading ? <div className="animate-spin h-6 w-6 border-2 border-white dark:border-black rounded-full border-t-transparent"></div> : `Pay $${calculateTotal()}`}
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 sm:p-8 md:w-1/3 border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-700 md:order-2 transition-colors duration-300">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300 truncate w-32">{item.name}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{item.price}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex justify-between items-center font-bold text-xl text-gray-900 dark:text-white">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
