import React, { useState } from "react";
import API from "../api";

export default function Checkout() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const handleCheckout = async () => {
    if (!email) return alert("Please enter email");
    if (cart.length === 0) return alert("Cart is empty");
    setLoading(true);

    try {
      // 1️⃣ Call backend to create Stripe session
      const res = await API.post("/stripe/create-checkout-session", {
        items: cart.map((c) => ({ id: c.id, qty: c.qty })),
        customerEmail: email,
      });

      const sessionUrl = res.data.url; // <-- Backend must return session URL
      if (!sessionUrl) throw new Error("No checkout URL returned");

      // 2️⃣ Redirect browser to Stripe Checkout
      window.location.href = sessionUrl;
    } catch (err) {
      console.error(err);
      alert("Checkout error. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = cart.reduce((s, i) => s + i.qty * i.price, 0).toFixed(2);
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="max-w-xl mx-auto bg-white rounded shadow p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      <p className="text-sm text-gray-500 mb-4">
        We use Stripe for secure checkout. Use a test card like 4242 4242 4242 4242 (any expiry/CVC).
      </p>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email for receipt</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      <div className="mb-4 border-t pt-4">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between py-2">
            <span>
              {item.title} x {item.qty}
            </span>
            <span>${(item.price * item.qty).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold border-t pt-2">
          <span>Total ({totalItems} items)</span>
          <span>${totalAmount}</span>
        </div>
      </div>

      <button
        disabled={loading}
        onClick={handleCheckout}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-60 transform transition-transform duration-150 active:scale-95"
      >
        {loading ? "Redirecting…" : "Pay with Card"}
      </button>
    </div>
  );
}
