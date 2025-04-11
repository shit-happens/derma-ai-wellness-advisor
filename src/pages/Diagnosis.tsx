
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import DiagnosisResult from '@/components/DiagnosisResult';
import { DiagnosisResult as DiagnosisResultType, UserInfo } from '@/utils/types';
import { getDiagnosis } from '@/api/diagnosis';

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
      {loading && <p>Loading diagnosis...</p>}
      {!loading && diagnosis && (
        <DiagnosisResult diagnosis={diagnosis} userInfo={userInfo as UserInfo} />
      )}
    </Layout>
  );
};

export default Diagnosis;
