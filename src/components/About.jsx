import React from 'react';
import { Link } from 'react-router-dom';
import loginBg from '../assets/login-bg-vibrant.png';
import shoesBg from '../assets/shoes.jpg';

const About = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen font-sans selection:bg-pink-500 selection:text-white pb-20 overflow-x-hidden transition-colors duration-300">

      {/* Hero Section */}
      <div className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={loginBg}
            alt="About Hero"
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gray-900/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="animate-fade-in-up animation-delay-100">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-pink-300 text-sm font-bold tracking-[0.2em] mb-6 uppercase shadow-[0_0_15px_rgba(236,72,153,0.3)]">
              Est. 2024
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 tracking-tighter leading-[0.9] drop-shadow-2xl animate-fade-in-up animation-delay-200">
            We Are <br />
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient-x">
              MyShop
              <span className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 blur-xl opacity-30 -z-10 animate-pulse"></span>
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-2xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed text-shadow-sm animate-fade-in-up animation-delay-300 px-4">
            Redefining footwear culture where <span className="font-bold text-white border-b-2 border-pink-500">Innovation</span> meets <span className="font-bold text-white border-b-2 border-purple-500">Iconic Style</span>.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Infinite Marquee Strip */}
      <div className="bg-gray-900 py-6 overflow-hidden relative z-20 border-y border-white/10 shadow-lg">
        <div className="whitespace-nowrap animate-marquee flex gap-20 text-white/90 font-black text-2xl tracking-[0.2em] uppercase">
          {[...Array(10)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-4">
                Premium Quality <span className="text-pink-500 text-3xl">•</span>
              </span>
              <span className="flex items-center gap-4">
                Urban Style <span className="text-purple-500 text-3xl">•</span>
              </span>
              <span className="flex items-center gap-4">
                Next Gen Comfort <span className="text-indigo-500 text-3xl">•</span>
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 relative z-20">

        {/* Story Section - Overlapping Glass Card */}
        <ScrollReveal>
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden mb-24 border border-white/60 dark:border-gray-700 ring-1 ring-black/5 dark:ring-white/10 flex flex-col md:flex-row relative">
            <div className="md:w-1/2 relative min-h-[500px] overflow-hidden group">
              <div className="absolute inset-0 bg-gray-900/10 z-10 transition-opacity group-hover:opacity-0"></div>
              <img
                src={shoesBg}
                alt="Our Story"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-in-out group-hover:scale-110"
              />

              {/* Floating Badge on Image */}
              <div className="absolute bottom-6 right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-4 rounded-2xl shadow-lg max-w-xs transform group-hover:-translate-y-2 transition-transform duration-500 z-20 border border-white/50 dark:border-gray-600">
                <p className="font-serif italic text-gray-800 dark:text-gray-200 text-sm">"We don't just sell shoes. We engineer confidence."</p>
                <p className="text-xs font-bold text-pink-600 mt-2 uppercase tracking-wide">— Pratiksha, Founder</p>
              </div>
            </div>

            <div className="md:w-1/2 p-12 md:p-20 flex flex-col justify-center relative">
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-bl-[10rem] -z-10 opacity-50"></div>

              <div className="flex items-center mb-8">
                <div className="h-0.5 w-16 bg-gradient-to-r from-pink-500 to-purple-500 mr-4"></div>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 font-bold uppercase tracking-widest text-xs">The Origin</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8 leading-tight">
                Built on Passion. <br /> Driven by <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Perfection.</span>
              </h2>
              <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed font-light">
                <p>
                  MyShop was born out of a simple, rebellious idea: <strong className="text-gray-900 dark:text-white font-medium border-b-2 border-pink-200 dark:border-pink-800">Why sacrifice style for comfort?</strong>
                </p>
                <p>
                  Established in 2024 by our visionary founder <span className="font-bold text-gray-900 dark:text-white bg-pink-100 dark:bg-pink-900/30 px-2 py-0.5 rounded-md hover:bg-pink-200 dark:hover:bg-pink-900/50 transition-colors cursor-default">Pratiksha Patil</span>, we embarked on a journey to curate a collection that speaks to the modern trendsetter.
                </p>
                <p>
                  Every pair of shoes tells a story. We're here to help you write yours.
                </p>
              </div>
              <div className="mt-10">
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Signature_sample.svg" alt="Founder Signature" className="h-12 opacity-40 hover:opacity-100 dark:invert transition-opacity duration-500" />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Stats Section with CountUp */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {[
            { label: 'Happy Customers', value: 10000, suffix: '+', icon: '🎉', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400', delay: 0 },
            { label: 'Products Sold', value: 50000, suffix: '+', icon: '🚀', color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400', delay: 100 },
            { label: 'Years Active', value: 2, suffix: '+', icon: '⏳', color: 'bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400', delay: 200 },
            { label: 'Customer Rating', value: 4.9, suffix: '/5', isDecimal: true, icon: '⭐', color: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400', delay: 300 }
          ].map((stat, idx) => (
            <ScrollReveal key={idx} delay={stat.delay}>
              <div className={`text-center p-8 rounded-[2rem] ${stat.color} hover:scale-105 transition-transform duration-300 shadow-sm border border-white/50 dark:border-white/5 group h-full flex flex-col justify-center`}>
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-black mb-2 tracking-tighter flex justify-center items-center">
                  <CountUp end={stat.value} duration={2000} decimals={stat.isDecimal ? 1 : 0} />
                  <span>{stat.suffix}</span>
                </div>
                <div className="font-bold uppercase text-xs tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Values / Why Choose Us */}
        <div className="mb-32">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">Why Choose Us?</h2>
              <div className="w-40 h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mx-auto rounded-full"></div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'Premium Quality', desc: 'Crafted with the finest materials for maximum durability.', icon: '💎', gradient: 'from-cyan-400 to-blue-600', delay: 0 },
              { title: 'Global Fashion', desc: 'Curated styles inspired by trends from New York & Tokyo.', icon: '🌍', gradient: 'from-fuchsia-500 to-pink-600', delay: 200 },
              { title: 'Sustainability', desc: 'Committed to eco-friendly practices and ethical sourcing.', icon: '🌱', gradient: 'from-emerald-400 to-green-600', delay: 400 }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={item.delay}>
                <div className="group relative bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden border border-gray-100 dark:border-gray-800 h-full">
                  {/* Hover Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                  {/* Decorative Elements */}
                  <div className={`absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br ${item.gradient} opacity-10 rounded-full blur-3xl group-hover:opacity-0 transition-all duration-500`}></div>

                  <div className="relative z-10">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-4xl text-white shadow-lg mb-8 transform group-hover:scale-110 group-hover:rotate-6 group-hover:bg-white/20 group-hover:backdrop-blur-sm transition-all duration-500`}>
                      {item.icon}
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-white transition-colors duration-500">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium group-hover:text-white/90 transition-colors duration-500 text-lg">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <ScrollReveal>
          <div className="relative rounded-[3rem] overflow-hidden bg-black text-white p-24 text-center shadow-2xl shadow-purple-900/40 group">
            <div className="absolute inset-0 z-0 opacity-60">
              <img
                src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                className="w-full h-full object-cover filter grayscale blur-sm scale-105 group-hover:scale-110 transition-transform duration-[1.5s]"
                alt="Footer Background"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-pink-900/90 mix-blend-multiply"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">Join Our Journey</h2>
              <p className="text-xl md:text-2xl text-gray-200 mb-12 font-light max-w-2xl mx-auto">
                Be the first to cop exclusive drops and limited editions. Don't just watch the culture, be part of it.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/product"
                  className="px-12 py-5 bg-white text-gray-900 font-black rounded-full hover:bg-gray-100 hover:scale-105 transition-all shadow-[0_0_25px_rgba(255,255,255,0.4)] text-lg inline-block"
                >
                  Explore Collection
                </Link>
                <Link
                  to="/contact"
                  className="px-12 py-5 bg-transparent border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm text-lg inline-block"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};

// --- Helper Components ---

// Simple CountUp Component
const CountUp = ({ end, duration = 2000, decimals = 0 }) => {
  const [count, setCount] = React.useState(0);
  const nodeRef = React.useRef(null);
  const hasAnimated = React.useRef(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const increment = end / (duration / 16); // 60fps

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={nodeRef}>{count.toFixed(decimals)}</span>;
};

// Scroll Reveal Wrapper
const ScrollReveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default About;
