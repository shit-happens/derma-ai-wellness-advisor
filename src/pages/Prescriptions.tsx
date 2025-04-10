
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import PrescriptionRecommendations from '@/components/PrescriptionRecommendations';
import { Prescription, DiagnosisResult, UserInfo } from '@/utils/types';

const Prescriptions = () => {
  const location = useLocation();
  const { diagnosis, userInfo } = location.state || {};

  // Mock prescription data - In a real application, this would come from an API
  const mockPrescriptions: Prescription[] = [
    {
      name: "Topical Corticosteroid (Medium Potency)",
      dosage: "Apply a thin layer",
      frequency: "Twice daily",
      duration: "1-2 weeks during flares",
      description: "Helps reduce inflammation, redness, and itching. Use only on affected areas. Not recommended for prolonged use, especially on the face or sensitive areas."
    },
    {
      name: "Tacrolimus (Protopic) or Pimecrolimus (Elidel)",
      dosage: "Apply a thin layer",
      frequency: "Twice daily",
      duration: "As directed, typically for 2-4 weeks",
      description: "Non-steroidal immunomodulators that can be used for longer periods and on sensitive areas like the face without the side effects of steroids. May cause temporary burning or stinging upon application."
    },
    {
      name: "Oral Antihistamine",
      dosage: "As directed on packaging",
      frequency: "Typically once daily",
      duration: "As needed for itching",
      description: "Helps control itching, especially at night. May cause drowsiness, which can be beneficial for nighttime use but potentially limiting during the day."
    }
  ];

  // If no diagnosis or user info is available, redirect to the consultation page
  if (!diagnosis || !userInfo) {
    return <Navigate to="/consultation" replace />;
  }

  return (
    <Layout>
      <PrescriptionRecommendations 
        prescriptions={mockPrescriptions} 
        diagnosis={diagnosis as DiagnosisResult}
        userInfo={userInfo as UserInfo}
      />
    </Layout>
  );
};

export default Prescriptions;
