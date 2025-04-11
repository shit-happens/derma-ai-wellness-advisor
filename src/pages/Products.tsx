import React, { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProductRecommendations from '@/components/ProductRecommendations';
import { Product, Prescription, DiagnosisResult, UserInfo } from '@/utils/types';
import { getProducts } from '@/api/products';

const Products = () => {
  const location = useLocation();
  const { prescriptions, diagnosis, userInfo } = location.state || {};

  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getProducts(prescriptions);
        setProducts(result);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (prescriptions) {
      fetchProducts();
    }
  }, [prescriptions]);

  if (!prescriptions || !diagnosis || !userInfo) {
    return <Navigate to="/consultation" replace />;
  }

  return (
    <Layout>
      {loading && <p>Loading product recommendations...</p>}
      {!loading && products && (
        <ProductRecommendations 
          products={products} 
          prescriptions={prescriptions as Prescription[]}
          diagnosis={diagnosis as DiagnosisResult}
          userInfo={userInfo as UserInfo}
        />
      )}
    </Layout>
  );
};

export default Products;
