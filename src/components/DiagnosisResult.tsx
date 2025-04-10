
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { DiagnosisResult as DiagnosisResultType, UserInfo } from '@/utils/types';
import { ArrowRight } from 'lucide-react';

interface DiagnosisResultProps {
  diagnosis: DiagnosisResultType;
  userInfo: UserInfo;
}

const DiagnosisResult: React.FC<DiagnosisResultProps> = ({ diagnosis, userInfo }) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/prescriptions', { 
      state: { 
        diagnosis, 
        userInfo 
      } 
    });
  };

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-3xl animate-fade-in">
      <Card className="overflow-hidden">
        <CardHeader className="bg-derma-500 text-white p-6">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold">Your Skin Analysis Results</h2>
            <p className="text-derma-100 mt-2">
              Based on the information you provided, our AI dermatologist has analyzed your symptoms.
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Potential Diagnosis</h3>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-2">Confidence:</span>
                  <Progress value={diagnosis.confidence} className="w-24 h-2" />
                  <span className="text-sm ml-2">{diagnosis.confidence}%</span>
                </div>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <p className="font-semibold text-lg">{diagnosis.diagnosis}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Description</h3>
              <p className="text-muted-foreground">{diagnosis.description}</p>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <p className="text-sm text-muted-foreground mb-4">
                <span className="font-medium">Note:</span> This is not a definitive medical diagnosis. Please consult with a healthcare professional for proper medical advice.
              </p>
              
              <Button onClick={handleContinue} className="w-full">
                View Prescription Recommendations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiagnosisResult;
