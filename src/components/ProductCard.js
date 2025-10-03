import React from 'react';
import { motion } from 'framer-motion';

export default function ProductCard({ product }){
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(c => c.id === product._id);
    if (existing) existing.qty += 1;
    else cart.push({ id: product._id, title: product.title, price: product.price, qty: 1, image: product.image });
    localStorage.setItem('cart', JSON.stringify(cart));
    // small visual feedback
    const toast = document.createElement('div');
    toast.textContent = 'Added to cart';
    toast.className = 'fixed bottom-6 right-6 bg-indigo-600 text-white px-4 py-2 rounded shadow';
    document.body.appendChild(toast);
    setTimeout(()=> toast.remove(), 1400);
  };

  return (
    <motion.div
      whileHover={{ translateY: -6 }}
      className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col"
    >
      <div className="h-44 bg-gray-100 flex items-center justify-center">
        <img src={product.image || 'https://via.placeholder.com/200'} alt={product.title}
          className="max-h-full object-contain" />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-medium text-lg">{product.title}</h3>
        <p className="text-sm text-gray-500 mt-1 flex-1">{product.description?.slice(0, 80)}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-lg font-semibold">${product.price}</div>
          <button onClick={addToCart}
                  className="inline-flex items-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none">
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}
