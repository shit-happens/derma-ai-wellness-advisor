
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProductRecommendations from '@/components/ProductRecommendations';
import { Product, Prescription, DiagnosisResult, UserInfo } from '@/utils/types';

const Products = () => {
  const location = useLocation();
  const { prescriptions, diagnosis, userInfo } = location.state || {};

  // Mock product data - In a real application, this would come from an API
  const mockProducts: Product[] = [
    {
      name: "CeraVe Moisturizing Cream",
      category: "Moisturizer",
      description: "Formulated with three essential ceramides and hyaluronic acid, this rich cream provides 24-hour hydration and helps restore the protective skin barrier.",
      imageUrl: "https://m.media-amazon.com/images/I/61S7BrCBj7L._SL1000_.jpg",
      price: "$18.99",
      rating: 4.8
    },
    {
      name: "Aveeno Eczema Therapy Moisturizing Cream",
      category: "Moisturizer",
      description: "Clinically proven to help relieve dry, itchy, irritated skin due to eczema. Formulated with colloidal oatmeal and ceramides to soothe and protect the skin barrier.",
      imageUrl: "https://m.media-amazon.com/images/I/81ehNTrHXhL._SL1500_.jpg",
      price: "$13.97",
      rating: 4.7
    },
    {
      name: "Vanicream Gentle Body Wash",
      category: "Cleanser",
      description: "Free of common chemical irritants, dyes, fragrance, masking fragrance, lanolin, parabens, and formaldehyde releasers. Gentle, non-drying formula.",
      imageUrl: "https://m.media-amazon.com/images/I/71LdG11AkfL._SL1500_.jpg",
      price: "$11.49",
      rating: 4.6
    },
    {
      name: "Eucerin Original Healing Cream",
      category: "Moisturizer",
      description: "Enriched with ceramides to strengthen the skin's barrier. Provides superior moisturization for extremely dry, sensitive skin.",
      imageUrl: "https://m.media-amazon.com/images/I/71wO0vtLfBL._SL1500_.jpg",
      price: "$14.99",
      rating: 4.5
    },
    {
      name: "La Roche-Posay Lipikar Balm AP+",
      category: "Moisturizer",
      description: "Triple-action formula to relieve dry skin and help restore the skin's moisture barrier with a unique prebiotic action. Suitable for babies, children, and adults.",
      imageUrl: "https://m.media-amazon.com/images/I/61bsb9KYQ-L._SL1500_.jpg",
      price: "$19.99",
      rating: 4.7
    },
    {
      name: "Aquaphor Healing Ointment",
      category: "Ointment",
      description: "Protects and soothes extremely dry skin, chapped lips, cracked hands and feet, minor cuts and burns. Creates a protective barrier on the skin.",
      imageUrl: "https://m.media-amazon.com/images/I/71di3ByEAKL._SL1500_.jpg",
      price: "$13.74",
      rating: 4.8
    }
  ];

  // If necessary state is missing, redirect to the consultation page
  if (!prescriptions || !diagnosis || !userInfo) {
    return <Navigate to="/consultation" replace />;
  }

  return (
    <Layout>
      <ProductRecommendations 
        products={mockProducts} 
        prescriptions={prescriptions as Prescription[]}
        diagnosis={diagnosis as DiagnosisResult}
        userInfo={userInfo as UserInfo}
      />
    </Layout>
  );
};

export default Products;
