import React, { useEffect, useState } from 'react';
import { getCartProducts, removeCartProduct } from '../services/firebase.service';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getProductsFromCart = async () => {
    try {
      setLoading(true);
      let userId = localStorage.getItem("uid");
      if (userId) {
        const prods = await getCartProducts(userId);
        setProducts(prods);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProductsFromCart();
  }, [])

  const handleRemove = async (productId) => {
    if (confirm("Are you sure you want to remove this item?")) {
      const success = await removeCartProduct(productId);
      if (success) {
        // Optimistically update UI or Refetch
        getProductsFromCart();
      } else {
        alert("Failed to remove item. Please try again.");
      }
    }
  };

  // Calculate total price (safe handling for missing/invalid price data)
  const calculateTotal = () => {
    return products.reduce((total, product) => {
      // Ensure price is a string; handle undefined/null/numbers
      const priceStr = String(product.price || '0');
      // Remove non-numeric characters except dot
      const price = parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
      return total + price;
    }, 0).toFixed(2);
  };

  // Helper to ensure images render correctly whether they are local or remote
  const resolveImage = (img) => {
    if (!img) return "https://via.placeholder.com/300?text=No+Image";
    // If it's not a string (e.g. object/number), force a fallback
    if (typeof img !== 'string') return "https://via.placeholder.com/300?text=Invalid+Image";

    if (img.startsWith('src/')) {
      return `/${img}`;
    }
    return img;
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 transition-colors duration-300"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div></div>;
  }

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>

        {products.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-12 text-center transition-colors duration-300">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-6">Your cart is currently empty.</p>
            <button onClick={() => navigate('/product')} className="bg-pink-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-pink-700 transition">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items List */}
            {/* Cart Items List */}
            <div className="lg:w-2/3">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors duration-300">
                {products.map((product, index) => (
                  <div key={index} className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-800 flex flex-row items-center gap-4 sm:gap-6 transition-colors duration-300">
                    <div className="h-20 w-20 sm:h-32 sm:w-32 flex-shrink-0 overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm bg-gray-50 dark:bg-gray-800">
                      <img
                        src={resolveImage(product.img)}
                        alt={product.name}
                        className="h-full w-full object-cover object-center"
                        onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between h-20 sm:h-32 py-1">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h3 className="text-sm sm:text-lg font-black text-gray-900 dark:text-white uppercase tracking-tighter line-clamp-1">{product.name}</h3>
                          <p className="mt-0.5 text-xs sm:text-sm text-gray-400 dark:text-gray-500 font-medium">Qty: 1</p>
                        </div>
                        <p className="text-sm sm:text-lg font-black text-pink-600 dark:text-pink-500 whitespace-nowrap">{product.price || '$0.00'}</p>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <button
                          type="button"
                          onClick={() => handleRemove(product.id)}
                          className="text-[10px] sm:text-xs font-black text-gray-400 dark:text-gray-500 hover:text-red-500 transition uppercase tracking-widest flex items-center gap-1.5"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Remove
                        </button>

                        <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-full border border-gray-100 dark:border-gray-700 p-0.5">
                          <button className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-gray-400 hover:text-black dark:hover:text-white transition group">
                            <span className="group-active:scale-125 transition-transform">-</span>
                          </button>
                          <span className="px-2 sm:px-3 text-xs sm:text-sm font-black text-gray-900 dark:text-white">1</span>
                          <button className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-gray-400 hover:text-black dark:hover:text-white transition group">
                            <span className="group-active:scale-125 transition-transform">+</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 transition-colors duration-300">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Order Summary</h2>
                <div className="flow-root">
                  <div className="-my-4 divide-y divide-gray-200 dark:divide-gray-800">
                    <div className="py-4 flex items-center justify-between">
                      <dt className="text-gray-600 dark:text-gray-400">Subtotal</dt>
                      <dd className="font-medium text-gray-900 dark:text-white">${calculateTotal()}</dd>
                    </div>
                    <div className="py-4 flex items-center justify-between">
                      <dt className="text-gray-600 dark:text-gray-400">Shipping</dt>
                      <dd className="font-medium text-gray-900 dark:text-white">Calculated at checkout</dd>
                    </div>
                    <div className="py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-800">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                      <dd className="text-base font-bold text-gray-900 dark:text-white">${calculateTotal()}</dd>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-gray-900 dark:bg-white border border-transparent rounded-lg shadow-sm py-3 px-4 text-base font-bold text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-white transition-all transform hover:scale-[1.02]"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
