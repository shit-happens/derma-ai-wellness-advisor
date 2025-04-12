
import React, { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import DiagnosisResult from '@/components/DiagnosisResult';
import { DiagnosisResult as DiagnosisResultType, UserInfo } from '@/utils/types';
import { getDiagnosis } from '@/api/diagnosis';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';

const Diagnosis = () => {
  const location = useLocation();
  const { userInfo } = location.state || {};

  const [diagnosis, setDiagnosis] = useState<DiagnosisResultType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiagnosis = async () => {
      try {
        const result = await getDiagnosis(userInfo);
        setDiagnosis(result);
      } catch (error) {
        console.error("Error fetching diagnosis:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userInfo) {
      fetchDiagnosis();
    }
  }, [userInfo]);

  if (!userInfo) {
    return <Navigate to="/consultation" replace />;
  }

  return (
    <Layout>
      {loading ? (
        <div className="container mx-auto p-4 md:p-6 max-w-3xl animate-pulse">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Loader2 className="h-12 w-12 text-derma-500 animate-spin" />
            <h2 className="text-xl font-semibold">Analyzing your symptoms...</h2>
            <p className="text-muted-foreground">Our AI dermatologist is working on your diagnosis</p>
            
            <div className="w-full max-w-md space-y-3 mt-4">
              <Skeleton className="h-6 w-3/4 mx-auto" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-4 w-5/6 mx-auto" />
              <Skeleton className="h-4 w-4/6 mx-auto" />
            </div>
          </div>
        </div>
      ) : (
        diagnosis && (
          <DiagnosisResult diagnosis={diagnosis} userInfo={userInfo as UserInfo} />
        )
      )}
    </Layout>
  );
};

export default Diagnosis;
