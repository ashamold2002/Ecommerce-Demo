import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar(){
  const [count, setCount] = useState(0);
  const location = useLocation();

  useEffect(()=> {
    const c = JSON.parse(localStorage.getItem('cart') || '[]');
    setCount(c.reduce((s,i) => s + i.qty, 0));
  }, [location]); // update when route changes (e.g., after adding item)

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold"
          >
            MK
          </motion.div>
          <div>
            <h1 className="text-lg font-semibold">My E-commerce</h1>
            <p className="text-xs text-gray-500 -mt-1">React • Tailwind • Stripe</p>
          </div>
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative inline-flex items-center px-3 py-2 rounded-md hover:bg-gray-50">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1 2a2 2 0 002 2h9" />
            </svg>
            <span className="ml-2 text-sm">Cart</span>
            <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
              {count}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
