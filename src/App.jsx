import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import Contact from './components/Contact';
import Cart from './components/Cart';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout';
import { useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout component to handle spacing
const Layout = ({ children }) => {
  const location = useLocation();
  const isFullWidthPage = ['/', '/about', '/contact'].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Add top padding for non-full-width pages so content isn't hidden behind fixed header */}
      <main className={`flex-grow ${!isFullWidthPage ? 'pt-24 px-4 max-w-7xl mx-auto w-full' : ''}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};




function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <ErrorBoundary>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/product' element={<Products />} />
              <Route path='/admin' element={<Products />} />
              <Route path='/product/:id' element={<ProductDetails />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          </ErrorBoundary>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
