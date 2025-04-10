
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import DiagnosisResult from '@/components/DiagnosisResult';
import { DiagnosisResult as DiagnosisResultType, UserInfo } from '@/utils/types';

const Diagnosis = () => {
  const location = useLocation();
  const { userInfo } = location.state || {};

  // Mock diagnosis result - In a real application, this would come from an API
  const mockDiagnosis: DiagnosisResultType = {
    diagnosis: "Atopic Dermatitis (Eczema)",
    confidence: 85,
    description: "Atopic dermatitis is a chronic inflammatory skin condition characterized by dry, itchy skin. It's commonly associated with a personal or family history of allergies. Based on your description of red, itchy patches that worsen with stress and certain fabrics, this appears to be the most likely diagnosis. The condition tends to flare periodically and may be triggered by environmental factors, stress, or allergens."
  };

  // If no user info is available, redirect to the consultation page
  if (!userInfo) {
    return <Navigate to="/consultation" replace />;
  }

  return (
    <Layout>
      <DiagnosisResult diagnosis={mockDiagnosis} userInfo={userInfo as UserInfo} />
    </Layout>
  );
};

export default Diagnosis;
