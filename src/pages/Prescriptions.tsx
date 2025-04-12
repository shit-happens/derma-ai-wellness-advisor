
import React, { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import PrescriptionRecommendations from '@/components/PrescriptionRecommendations';
import { Prescription, DiagnosisResult, UserInfo } from '@/utils/types';
import { getPrescriptions } from '@/api/prescription';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, Pill } from 'lucide-react';

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
      {loading ? (
        <div className="container mx-auto p-4 md:p-6 max-w-3xl animate-pulse">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="relative">
              <Loader2 className="h-12 w-12 text-derma-500 animate-spin" />
              <Pill className="h-6 w-6 text-derma-300 absolute top-3 left-3" />
            </div>
            <h2 className="text-xl font-semibold">Generating recommendations...</h2>
            <p className="text-muted-foreground">Finding the best treatment options for your condition</p>
            
            <div className="w-full max-w-md space-y-5 mt-4">
              {[1, 2, 3].map((index) => (
                <div key={index} className="border rounded-lg p-4">
                  <Skeleton className="h-6 w-3/5 mb-4" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <Skeleton className="h-px w-full my-3" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        prescriptions && (
          <PrescriptionRecommendations
            prescriptions={prescriptions}
            diagnosis={diagnosis as DiagnosisResult}
            userInfo={userInfo as UserInfo}
          />
        )
      )}
    </Layout>
  );
};

export default Prescriptions;
