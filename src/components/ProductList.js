import React, { useEffect, useState } from 'react';
import API from '../api';
import ProductCard from './ProductCard';

export default function ProductList(){
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    let mounted = true;
    API.get('/products')
      .then(res => {
        if(!mounted) return;
        setProducts(res.data || []);
      })
      .catch(err => {
        console.error('Products fetch error', err);
      })
      .finally(()=> mounted && setLoading(false));
    return () => mounted = false;
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Products</h2>
        <p className="text-sm text-gray-500">{products.length} items</p>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading products…</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
    </>
  );
}
