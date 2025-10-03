import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Cart(){
  const [cart, setCart] = useState([]);
  const nav = useNavigate();

  useEffect(()=> {
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  const updateQty = (id, delta) => {
    const copy = cart.map(i => i.id === id ? {...i, qty: Math.max(1, i.qty + delta)} : i);
    setCart(copy);
    localStorage.setItem('cart', JSON.stringify(copy));
  };

  const removeItem = (id) => {
    const copy = cart.filter(i => i.id !== id);
    setCart(copy);
    localStorage.setItem('cart', JSON.stringify(copy));
  };

  const total = cart.reduce((s,i) => s + i.qty * i.price, 0);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center py-12 bg-white rounded shadow p-8">Your cart is empty.</div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white rounded shadow p-4">
            {cart.map(item => (
              <motion.div key={item.id} layout className="flex items-center justify-between py-3 border-b last:border-b-0">
                <div className="flex items-center space-x-4">
                  <img src={item.image || 'https://via.placeholder.com/80'} alt=""
                       className="w-16 h-16 object-contain bg-gray-50 p-2 rounded" />
                  <div>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-gray-500">${item.price} each</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="inline-flex items-center border rounded">
                    <button onClick={()=>updateQty(item.id, -1)} className="px-3 py-1">-</button>
                    <div className="px-3">{item.qty}</div>
                    <button onClick={()=>updateQty(item.id, 1)} className="px-3 py-1">+</button>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold">${(item.qty * item.price).toFixed(2)}</div>
                    <button onClick={()=>removeItem(item.id)} className="text-xs text-red-600 mt-1">Remove</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Estimated total</div>
              <div className="text-2xl font-bold">${total.toFixed(2)}</div>
            </div>
            <div className="space-x-2">
              <button onClick={() => { localStorage.setItem('cart', JSON.stringify([])); setCart([]); }}
                      className="px-4 py-2 border rounded">Clear</button>
              <button onClick={() => nav('/checkout')}
                      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
