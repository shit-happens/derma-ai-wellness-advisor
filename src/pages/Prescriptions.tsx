import React, { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import PrescriptionRecommendations from '@/components/PrescriptionRecommendations';
import { Prescription, DiagnosisResult, UserInfo } from '@/utils/types';
import { getPrescriptions } from '@/api/prescription';

const Prescriptions = () => {
  const location = useLocation();
  const { diagnosis, userInfo } = location.state || {};

  const [prescriptions, setPrescriptions] = useState<Prescription[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const result = await getPrescriptions(diagnosis);
        setPrescriptions(result);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (diagnosis) {
      fetchPrescriptions();
    }
  }, [diagnosis]);

  if (!diagnosis || !userInfo) {
    return <Navigate to="/consultation" replace />;
  }

  return (
    <Layout>
      {loading && <p>Loading prescriptions...</p>}
      {prescriptions && (
        <PrescriptionRecommendations
          prescriptions={prescriptions}
          diagnosis={diagnosis as DiagnosisResult}
          userInfo={userInfo as UserInfo}
        />
      )}
    </Layout>
  );
};

export default Prescriptions;
