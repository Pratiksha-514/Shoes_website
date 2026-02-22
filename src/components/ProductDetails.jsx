import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore/lite';
import { db } from '../../environment';
import { addCartProducts } from '../services/firebase.service';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // UI States
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);

    // Mock data for colors since DB might not have them
    const colors = [
        { name: 'Black', class: 'bg-black' },
        { name: 'Grey', class: 'bg-gray-500' },
        { name: 'Navy', class: 'bg-blue-900' }
    ];

    // Mock sizes
    const sizes = ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '11'];

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, 'product', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProduct({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log("No such product!");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        if (!selectedSize) {
            alert("Please select a size");
            return;
        }
        if (!selectedColor) {
            alert("Please select a color");
            return;
        }

        // In a real app, you'd pass size/color/qty to the cart
        await addCartProducts(id); // Existing function might need updates to support options, but for now we keep it compatible
        alert(`Added ${quantity} item(s) to bag!`);
    };

    const resolveImage = (img) => {
        if (!img) return "https://via.placeholder.com/300?text=No+Image";
        if (typeof img !== 'string') return "https://via.placeholder.com/300?text=Invalid+Image";
        if (img.startsWith('src/')) {
            return `/${img}`;
        }
        return img;
    };

    // Calculate total price for button
    const getPriceValue = () => {
        if (!product || !product.price) return 0;
        return parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0;
    };

    const totalPrice = (getPriceValue() * quantity).toFixed(2);

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div></div>;

    if (!product) return <div className="min-h-screen flex items-center justify-center text-xl dark:text-white bg-white dark:bg-gray-950 transition-colors duration-300">Product not found.</div>;

    return (
        <div className="bg-white dark:bg-gray-950 min-h-screen py-6 md:py-16 font-sans transition-colors duration-300">
            {/* Close / Back Button equivalent */}
            <div className="max-w-6xl mx-auto px-4 relative">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-0 right-4 z-10 md:-right-8 text-gray-400 hover:text-black dark:hover:text-white text-2xl transition bg-white/50 dark:bg-black/50 rounded-full p-2 md:bg-transparent"
                >
                    ✕
                </button>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                    {/* Image Section */}
                    <div className="lg:w-3/5">
                        <div className="rounded-[2.5rem] overflow-hidden bg-gray-100 dark:bg-gray-800 relative aspect-square group transition-all duration-500 shadow-2xl border border-gray-100 dark:border-gray-800">
                            <span className="absolute top-6 left-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md text-gray-900 dark:text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] z-10 shadow-sm border border-black/5 dark:border-white/5">
                                {product.category || 'Premium Collection'}
                            </span>
                            <img
                                src={resolveImage(product.img)}
                                alt={product.name}
                                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="lg:w-2/5 flex flex-col pt-4 lg:pt-0">
                        <div className="mb-8">
                            <span className="text-pink-600 dark:text-pink-500 font-black text-xs uppercase tracking-[0.3em] mb-2 block">{product.gender || 'Unisex'}</span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-4 uppercase leading-[0.9] tracking-tighter">{product.name}</h1>

                            <div className="flex items-center gap-4 mb-6 text-sm">
                                <div className="flex text-yellow-400 text-lg">
                                    {[1, 2, 3, 4, 5].map(i => <span key={i}>★</span>)}
                                </div>
                                <span className="text-gray-400 dark:text-gray-500 font-bold tracking-wider">(4.9/5.0)</span>
                            </div>

                            <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-8 tracking-tighter leading-none">
                                {product.price}
                            </div>

                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-base md:text-lg font-light max-w-xl">
                                {product.description || "Crafted for those who demand excellence. This iconic silhouette features premium materials and responsive cushioning for an unmatched experience in every step."}
                            </p>
                        </div>

                        {/* Color Selector */}
                        <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 transition-colors duration-300 shadow-sm">
                            <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-4">
                                SELECT COLOR: <span className="text-gray-900 dark:text-white font-black ml-1 uppercase">{selectedColor ? selectedColor.name : ''}</span>
                            </h3>
                            <div className="flex gap-4">
                                {colors.map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-12 h-12 rounded-full ${color.class} transition-all duration-300 ring-offset-4 dark:ring-offset-gray-900 shadow-lg ${selectedColor?.name === color.name ? 'ring-2 ring-pink-600 scale-110' : 'ring-1 ring-transparent hover:scale-105 hover:ring-gray-300 dark:hover:ring-gray-600'
                                            }`}
                                        aria-label={color.name}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Size Selector */}
                        <div className="mb-8">
                            <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-3">
                                Size: <span className="text-gray-500 font-normal">{selectedSize ? selectedSize : 'Select a Size'}</span>
                            </h3>
                            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`py-3 text-sm font-bold rounded-xl transition-all duration-200 border-2 ${selectedSize === size
                                            ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-lg transform scale-105'
                                            : 'bg-transparent border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
                            <div className="flex items-center border-2 border-gray-200 dark:border-gray-700 rounded-xl">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 text-black dark:text-white transition font-bold text-lg"
                                >-</button>
                                <span className="px-4 py-3 font-bold min-w-[3rem] text-center text-black dark:text-white">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 text-black dark:text-white transition font-bold text-lg"
                                >+</button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-black dark:bg-pink-600 text-white py-4 rounded-xl font-black uppercase tracking-wider text-sm hover:bg-gray-800 dark:hover:bg-pink-700 transition shadow-xl transform active:scale-95"
                            >
                                Add to Bag — ${totalPrice}
                            </button>

                            <button className="border-2 border-gray-200 dark:border-gray-700 p-3 rounded-xl hover:border-black dark:hover:border-white transition flex items-center justify-center text-gray-400 hover:text-red-500">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
