import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import shoeBg from '../assets/shoes10.jpg';
import { fetchAllProducts } from '../services/firebase.service';

const Home = () => {
    const navigate = useNavigate();
    const [trendingProducts, setTrendingProducts] = useState([]);

    // Mock Data for Trending Fallback
    const MOCK_TRENDING_PRODUCTS = [
        {
            id: 1,
            name: "Nike Air Zoom",
            price: "$120",
            img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Running"
        },
        {
            id: 2,
            name: "Adidas Ultraboost",
            price: "$140",
            img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Training"
        },
        {
            id: 3,
            name: "Puma RS-X",
            price: "$110",
            img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Casual"
        },
        {
            id: 4,
            name: "New Balance 574",
            price: "$95",
            img: "https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Classic"
        },
        {
            id: 5,
            name: "Jordan Retro High",
            price: "$180",
            img: "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Basketball"
        }
    ];

    // Scroll Reveal Logic - Updated to depend on trendingProducts
    useEffect(() => {
        const revealElements = document.querySelectorAll('.reveal');

        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            const elementVisible = 50; // Reduced to ensure they trigger earlier

            revealElements.forEach((reveal) => {
                const elementTop = reveal.getBoundingClientRect().top;
                if (elementTop < windowHeight - elementVisible) {
                    reveal.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        // Trigger once on load and every time products update
        setTimeout(revealOnScroll, 100);

        return () => window.removeEventListener('scroll', revealOnScroll);
    }, [trendingProducts]);

    // Fetch Trending Products (Real Data)
    useEffect(() => {
        const loadTrending = async () => {
            try {
                const products = await fetchAllProducts();
                if (products && products.length > 0) {
                    // Take first 5 products for the layout
                    setTrendingProducts(products.slice(0, 5));
                } else {
                    console.log("No products found, implementing fallback mock data");
                    setTrendingProducts(MOCK_TRENDING_PRODUCTS);
                }
            } catch (error) {
                console.error("Failed to fetch trending products", error);
                setTrendingProducts(MOCK_TRENDING_PRODUCTS);
            }
        };
        loadTrending();
    }, []);

    // Mock Data for Categories - Updated with more reliable URLs
    const categories = [
        {
            id: 1,
            title: "Men's Collection",
            // Running shoes / active wear
            image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            link: "/product?category=Men"
        },
        {
            id: 2,
            title: "Women's Collection",
            // Stylish sneakers
            image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            link: "/product?category=Women"
        },
        {
            id: 3,
            title: "Kids' Formal Collection",
            // Elegant formal kids shoes
            image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            link: "/product?category=Kids"
        }
    ];

    return (
        <div className="bg-gray-50 dark:bg-gray-950 overflow-x-hidden transition-colors duration-300">

            {/* HERO SECTION */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={shoeBg}
                        alt="Background"
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1556906781-9a412961d289?ixlib=rb-4.0.3&auto=format&fit=crop&w=2600&q=80" }}
                    />
                    <div className="absolute inset-0 bg-gray-900/60 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20 md:mt-16">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-pink-400 text-[10px] md:text-sm font-bold tracking-[0.2em] mb-6 animate-fade-in-up shadow-lg">
                        NEW ARRIVALS 2026
                    </span>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-black text-white italic tracking-tighter leading-[0.9] mb-8 animate-fade-in-up animation-delay-200">
                        UNLEASH YOUR <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">POTENTIAL</span>
                    </h1>
                    <p className="text-gray-300 text-base sm:text-lg md:text-2xl max-w-2xl mx-auto mb-12 font-light animate-fade-in-up animation-delay-400 leading-relaxed px-4">
                        Engineered for speed, designed for style. Discover the footwear that powers champions and trendsetters worldwide.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
                        <Link
                            to="/product"
                            className="px-8 py-4 bg-pink-600 hover:bg-pink-700 text-white rounded-full font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-pink-600/40"
                        >
                            Shop Now
                        </Link>
                        <Link
                            to="/product"
                            className="px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 rounded-full font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg"
                        >
                            View Collection
                        </Link>
                    </div>
                </div>

                {/* Decorative Blobs */}
                <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            </section>

            {/* BRANDS SECTION */}
            <div className="bg-black py-8 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 overflow-hidden">
                    <p className="text-center text-gray-500 text-sm tracking-widest mb-6">TRUSTED BY ATHLETES WORLDWIDE</p>
                    <div className="flex justify-between items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500 flex-wrap gap-8 md:gap-0">
                        {/* Simple Text Logos for Demo */}
                        <h3 className="text-2xl font-black text-white italic tracking-tighter">NIKE</h3>
                        <h3 className="text-2xl font-black text-white italic tracking-tighter">ADIDAS</h3>
                        <h3 className="text-2xl font-black text-white italic tracking-tighter">PUMA</h3>
                        <h3 className="text-2xl font-black text-white italic tracking-tighter">REEBOK</h3>
                        <h3 className="text-2xl font-black text-white italic tracking-tighter">NEW BALANCE</h3>
                    </div>
                </div>
            </div>

            {/* CATEGORIES SECTION */}
            <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 reveal">
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">SHOP BY CATEGORY</h2>
                        <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {categories.map((cat, index) => (
                            <Link
                                to={cat.link}
                                key={cat.id}
                                className={`group block relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-lg reveal transition-all duration-500 delay-${index * 100}`}
                            >
                                {cat.image.startsWith('http') || cat.image.startsWith('/') ? (
                                    <img
                                        src={cat.image}
                                        alt={cat.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.onerror = null; // Prevent infinite loop
                                            e.target.src = `https://via.placeholder.com/600x400?text=${cat.title.replace(' ', '+')}`;
                                        }}
                                    />
                                ) : (
                                    <div
                                        className="w-full h-full transition-transform duration-700 group-hover:scale-110"
                                        style={{ background: cat.image }}
                                    ></div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                                <div className="absolute bottom-8 left-8">
                                    <h3 className="text-2xl font-bold text-white mb-2">{cat.title}</h3>
                                    <span className="text-pink-400 font-medium group-hover:text-white transition-colors flex items-center gap-2">
                                        Explore <span className="text-xl">→</span>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURED / TRENDING SECTION */}
            <section className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12 reveal">
                        <div>
                            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">TRENDING NOW</h2>
                            <p className="text-gray-500 dark:text-gray-400">The hottest drops of the season.</p>
                        </div>
                        <Link to="/product" className="hidden md:block text-pink-600 font-bold hover:text-pink-700 transition">
                            View All Products →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 auto-rows-[minmax(0,1fr)]">
                        {trendingProducts.map((product, index) => (
                            <div
                                key={product.id}
                                onClick={() => navigate(`/product/${product.id}`)}
                                className={`bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group reveal flex flex-col cursor-pointer ${index === 0 ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1'}`}
                            >
                                <div className={`relative overflow-hidden rounded-t-2xl bg-gray-100 dark:bg-gray-800 ${index === 0 ? 'flex-grow min-h-[250px]' : 'aspect-square'}`}>
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        onError={(e) => e.target.src = "https://via.placeholder.com/300?text=Shoe"}
                                    />
                                    <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                    {index === 0 && (
                                        <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                                            Best Seller
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <p className="text-xs font-bold text-gray-400 mb-1">{product.category}</p>
                                    <h3 className={`font-bold text-gray-900 dark:text-white mb-1 ${index === 0 ? 'text-xl' : 'text-base'}`}>{product.name}</h3>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className={`font-bold text-pink-600 ${index === 0 ? 'text-xl' : 'text-lg'}`}>{product.price}</span>
                                        <button className="bg-gray-900 dark:bg-gray-700 text-white p-1.5 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 text-center md:hidden">
                        <Link to="/product" className="inline-block px-6 py-3 bg-white border border-gray-300 rounded-full font-bold text-gray-900">
                            View All Products
                        </Link>
                    </div>
                </div>
            </section>

            {/* PROMO BANNER */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative rounded-3xl overflow-hidden bg-black h-96 flex items-center reveal">
                        <img
                            src="https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                            alt="Runner"
                            className="absolute inset-0 w-full h-full object-cover opacity-60"
                        />
                        <div className="relative z-10 px-8 md:px-16 max-w-2xl">
                            <span className="inline-block bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-sm mb-4">LIMITED OFFER</span>
                            <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter mb-6">
                                SUMMER SALE <br />
                                <span className="text-pink-500">50% OFF</span>
                            </h2>
                            <p className="text-gray-300 mb-8 max-w-md">
                                Don't miss out on our biggest sale of the year. Grab your favorite styles before they are gone.
                            </p>
                            <Link to="/product" className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition">
                                Shop Sale
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="py-16 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center reveal">
                        <div className="p-6">
                            <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <h3 className="font-bold text-lg mb-2 dark:text-white">Authentic Products</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">100% genuine guarantees.</p>
                        </div>
                        <div className="p-6">
                            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="font-bold text-lg mb-2 dark:text-white">Fast Delivery</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Express shipping available.</p>
                        </div>
                        <div className="p-6">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="font-bold text-lg mb-2 dark:text-white">Secure Payment</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">100% secure transactions.</p>
                        </div>
                        <div className="p-6">
                            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                            </div>
                            <h3 className="font-bold text-lg mb-2 dark:text-white">Easy Returns</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">30 days return policy.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEWSLETTER */}
            <section className="py-20 bg-gray-900 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10 reveal">
                    <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-4">JOIN THE CLUB</h2>
                    <p className="text-gray-400 mb-8 text-lg">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 w-full sm:w-96 backdrop-blur-sm"
                        />
                        <button className="px-8 py-4 bg-pink-600 hover:bg-pink-700 text-white rounded-full font-bold shadow-lg hover:shadow-pink-600/50 transition">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
