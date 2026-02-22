import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addCartProducts,
  fetchAllProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} from "../services/firebase.service";

const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Nike Air Max",
    price: "$120",
    img: "https://via.placeholder.com/300?text=Nike",
    gender: "Men",
    category: "Sports",
    description: "Iconic style and comfort.",
  },
];

const Products = () => {
  const navigate = useNavigate();

  // ✅ STATES
  const [productArray, setProductArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [typedPassword, setTypedPassword] = useState("");

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    img: "",
    description: "",
    gender: "Men",
    category: "Sports",
  });

  // ✅ DERIVED FILTERS (Dynamic)
  // Get unique values from products, but keep some defaults if empty
  const uniqueGenders = ["All", ...new Set([...productArray.map(p => p.gender), "Men", "Women", "Kids"])].filter(Boolean);
  const uniqueCategories = ["All", ...new Set([...productArray.map(p => p.category), "Sports", "Casual"])].filter(Boolean);

  // Clean up order (All first)
  const genders = ["All", ...uniqueGenders.filter(g => g !== "All").sort()];
  const categories = ["All", ...uniqueCategories.filter(c => c !== "All").sort()];

  // ✅ FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      setLoading(true);

      // Create a timeout promise that rejects after 5 seconds
      const timeout = new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('Request timed out')), 5000);
      });

      // Race the fetch against the timeout
      const arry = await Promise.race([fetchAllProducts(), timeout]);

      setProductArray(arry && arry.length > 0 ? arry : MOCK_PRODUCTS);

    } catch (error) {
      console.error("Fetch products failed, using mock data:", error);
      // Fallback to mock data on error or timeout so the user sees *something*
      setProductArray(MOCK_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ ADMIN TOGGLE
  const handleAdminAccess = () => {
    if (isAdmin) {
      setIsAdmin(false);
    } else {
      setShowPasswordInput(true);
    }
  };

  const verifyAdmin = () => {
    if (typedPassword === "pratikshapatil") {
      setIsAdmin(true);
      setShowPasswordInput(false);
      setTypedPassword("");
    } else {
      alert("Incorrect password!");
    }
  };

  // ✅ ADD / UPDATE PRODUCT
  const handleAddProductSubmit = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      alert("Name and Price required!");
      return;
    }

    // Exclude ID from the data payload
    const { id, ...rest } = newProduct;

    const productData = {
      ...rest,
      price: String(newProduct.price).includes("$")
        ? newProduct.price
        : `$${newProduct.price}`,
      img: newProduct.img || "https://via.placeholder.com/300",
      category: newProduct.category || "Uncategorized",
      gender: newProduct.gender || "Men",
      description: newProduct.description || "",
      name: newProduct.name || "Untitled"
    };

    let success = false;

    if (editId) {
      success = await updateProduct(editId, productData);
    } else {
      success = await addProduct(productData);
    }

    if (success) {
      alert(editId ? "Updated!" : "Added!");
      setShowAddForm(false);
      setEditId(null);
      setNewProduct({
        name: "",
        price: "",
        img: "",
        description: "",
        gender: "Men",
        category: "Sports",
      });
      fetchProducts();
    } else {
      alert("Operation failed");
    }
  };

  // ✅ DELETE PRODUCT
  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;

    const success = await deleteProduct(id);
    if (success) {
      fetchProducts();
    }
  };

  // ✅ ADD TO CART
  const handleAddToCart = async (id) => {
    const success = await addCartProducts(id);
    if (success) alert("Added to cart!");
  };

  // ✅ FILTER LOGIC
  const filteredProducts = productArray.filter((product) => {
    const genderMatch =
      selectedGender === "All" || product.gender === selectedGender;

    const categoryMatch =
      selectedCategory === "All" || product.category === selectedCategory;

    return genderMatch && categoryMatch;
  });

  // ✅ LOADING
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-500 border-opacity-50"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans selection:bg-pink-500 selection:text-white pb-20 transition-colors duration-300">

      {/* 🔹 HERO HEADER */}
      <div className="relative bg-gray-900 h-[400px] flex items-center justify-center overflow-hidden mb-16 rounded-b-[4rem] shadow-2xl">
        <div className="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" className="w-full h-full object-cover" alt="Products Hero" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>

        <div className="relative z-10 text-center space-y-4 px-6 animate-fade-in-up">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter leading-tight">
            Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Collection</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto">
            Discover the latest trends in footwear fashion. Engineered for comfort, designed for attention.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 🔹 CONTROLS BAR (Admin & Filters) */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-8">

          <div className="flex flex-col md:flex-row gap-6 justify-center md:justify-start w-full lg:w-auto items-center">
            {/* Gender Pills */}
            <div className="bg-white dark:bg-gray-900 p-1.5 rounded-full shadow-md border border-gray-100 dark:border-gray-800 flex flex-wrap justify-center sm:justify-start gap-1 transition-all duration-300 w-full sm:w-auto">
              {genders.map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${selectedGender === g
                    ? "bg-black dark:bg-white text-white dark:text-black shadow-lg transform scale-105"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                >
                  {g}
                </button>
              ))}
            </div>

            {/* Category Pills */}
            <div className="bg-white dark:bg-gray-900 p-1.5 rounded-2xl sm:rounded-full shadow-md border border-gray-100 dark:border-gray-800 flex gap-1 overflow-x-auto max-w-full sm:max-w-[500px] scrollbar-hide transition-all duration-300 w-full sm:w-auto">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap ${selectedCategory === c
                    ? "bg-pink-600 text-white shadow-lg transform scale-105"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
            {showPasswordInput && !isAdmin && (
              <div className="flex items-center gap-2 animate-fade-in bg-white dark:bg-gray-900 p-1 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300">
                <input
                  type="password"
                  placeholder="Admin Password"
                  value={typedPassword}
                  onChange={(e) => setTypedPassword(e.target.value)}
                  className="px-4 py-2 bg-transparent text-sm focus:outline-none dark:text-white w-32 sm:w-48"
                  onKeyDown={(e) => e.key === 'Enter' && verifyAdmin()}
                  autoFocus
                />
                <button
                  onClick={verifyAdmin}
                  className="bg-pink-600 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-pink-700 transition-all shadow-md active:scale-95"
                >
                  Confirm
                </button>
                <button
                  onClick={() => { setShowPasswordInput(false); setTypedPassword(""); }}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            )}

            {!showPasswordInput || isAdmin ? (
              <button
                onClick={handleAdminAccess}
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-md flex items-center gap-2 whitespace-nowrap ${isAdmin
                  ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900"
                  : "bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                  }`}
              >
                {isAdmin ? "🔓 Exit Admin Mode" : "🛡️ Admin Access"}
              </button>
            ) : null}
          </div>
        </div>

        {/* 🔹 ADMIN ADD FORM */}
        {isAdmin && (
          <div className="mb-16 bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-800 animate-fade-in-down w-full max-w-3xl mx-auto relative overflow-hidden transition-colors duration-300">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 to-purple-500"></div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">{editId ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => setShowAddForm(!showAddForm)} className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white underline">
                {showAddForm ? 'Hide Form' : 'Show Form'}
              </button>
            </div>

            {showAddForm && (
              <form onSubmit={handleAddProductSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-2">
                  <label className="block text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1">Product Name</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all font-bold text-gray-900 dark:text-white shadow-inner"
                    placeholder="e.g. Nike Air Max"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1">Price</label>
                  <input
                    type="text"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all font-bold text-gray-900 dark:text-white shadow-inner"
                    placeholder="e.g. $120"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Gender</label>
                  <select
                    value={newProduct.gender}
                    onChange={(e) => setNewProduct({ ...newProduct, gender: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all font-bold appearance-none text-gray-900 dark:text-white"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Category</label>
                  <input
                    type="text"
                    list="category-suggestions"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all font-bold text-gray-900 dark:text-white"
                    placeholder="e.g. Hiking"
                  />
                  <datalist id="category-suggestions">
                    {categories.filter(c => c !== "All").map(c => <option key={c} value={c} />)}
                  </datalist>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Image URL</label>
                  <input
                    type="text"
                    value={newProduct.img}
                    onChange={(e) => setNewProduct({ ...newProduct, img: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all font-medium text-gray-900 dark:text-white"
                    placeholder="https://..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Description</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all font-medium text-gray-900 dark:text-white"
                    rows="3"
                    placeholder="Short description..."
                  />
                </div>

                <div className="md:col-span-2 flex gap-4 mt-2">
                  <button className="flex-1 bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-transform active:scale-95">
                    {editId ? "Update Product" : "Create Product"}
                  </button>
                  {editId && (
                    <button
                      type="button"
                      onClick={() => { setEditId(null); setNewProduct({ name: "", price: "", img: "", description: "", gender: "Men", category: "Sports" }); }}
                      className="px-6 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        )}

        {/* 🔹 PRODUCT GRID */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 transition-colors duration-300">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">No products found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white dark:bg-gray-900 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col overflow-hidden border border-gray-100 dark:border-gray-800"
              >
                {/* Image Area */}
                <div className="relative h-80 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm uppercase tracking-wider">
                      {product.category}
                    </span>
                  </div>

                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => e.target.src = "https://via.placeholder.com/300?text=Shoe"}
                  />

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    {!isAdmin && (
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        className="bg-white text-black p-3 rounded-full hover:bg-pink-500 hover:text-white transition-all transform hover:scale-110 shadow-lg"
                        title="Add to Cart"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      </button>
                    )}

                    <button
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="bg-white text-black p-3 rounded-full hover:bg-white/90 transition-all transform hover:scale-110 shadow-lg"
                      title="View Details"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    </button>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wide mb-1">{product.gender}</p>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">{product.name}</h3>
                    </div>
                    <span className="bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-bold px-3 py-1 rounded-lg shadow-sm">
                      {product.price}
                    </span>
                  </div>

                  <p className="text-gray-400 dark:text-gray-500 text-sm line-clamp-2 mt-2 mb-4 flex-grow font-light">
                    {product.description}
                  </p>

                  {isAdmin && (
                    <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                      <button
                        onClick={() => {
                          setEditId(product.id);
                          setNewProduct(product);
                          setShowAddForm(true);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-2 rounded-lg text-sm font-bold hover:bg-blue-100 dark:hover:bg-blue-900/30"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-3 py-2 rounded-lg text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/30"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
