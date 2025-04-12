
import React, { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProductRecommendations from '@/components/ProductRecommendations';
import { Product, Prescription, DiagnosisResult, UserInfo } from '@/utils/types';
import { getProducts } from '@/api/products';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, ShoppingBag } from 'lucide-react';

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
      {loading ? (
        <div className="container mx-auto p-4 md:p-6 max-w-4xl animate-pulse">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="relative">
              <Loader2 className="h-12 w-12 text-derma-500 animate-spin" />
              <ShoppingBag className="h-6 w-6 text-derma-300 absolute top-3 left-3" />
            </div>
            <h2 className="text-xl font-semibold">Finding product recommendations...</h2>
            <p className="text-muted-foreground">Selecting the best products for your skin condition</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="border rounded-lg overflow-hidden h-full flex flex-col">
                <Skeleton className="aspect-square w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-6 w-4/5" />
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Skeleton key={star} className="h-4 w-4 rounded-full" />
                    ))}
                  </div>
                  <Skeleton className="h-16 w-full" />
                  <div className="flex justify-between items-center pt-3">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        products && (
          <ProductRecommendations 
            products={products} 
            prescriptions={prescriptions as Prescription[]}
            diagnosis={diagnosis as DiagnosisResult}
            userInfo={userInfo as UserInfo}
          />
        )
      )}
    </Layout>
  );
};

export default Products;
