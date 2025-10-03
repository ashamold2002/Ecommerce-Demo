import React from 'react';
import { Link } from 'react-router-dom';

export default function Success(){
  // in a real app you'd verify session_id and show order details
  // clear cart for demo
  React.useEffect(()=> {
    localStorage.setItem('cart', JSON.stringify([]));
  }, []);

  return (
    <div className="max-w-xl mx-auto text-center bg-white rounded shadow p-8">
      <h2 className="text-2xl font-semibold mb-2">Payment successful 🎉</h2>
      <p className="text-gray-600 mb-4">Thank you! Your order is confirmed. We sent a receipt to your email (test mode).</p>
      <Link to="/" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Back to shop</Link>
    </div>
  );
}
