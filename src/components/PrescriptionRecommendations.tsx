
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DiagnosisResult, Prescription, UserInfo } from '@/utils/types';
import { ArrowRight, Clock, Calendar, Info } from 'lucide-react';

interface PrescriptionRecommendationsProps {
  prescriptions: Prescription[];
  diagnosis: DiagnosisResult;
  userInfo: UserInfo;
}

const PrescriptionRecommendations: React.FC<PrescriptionRecommendationsProps> = ({ 
  prescriptions,
  diagnosis,
  userInfo
}) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/products', { 
      state: { 
        prescriptions,
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
            <h2 className="text-2xl font-bold">Treatment Recommendations</h2>
            <p className="text-derma-100 mt-2">
              Based on our analysis of {diagnosis.diagnosis}
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Here are potential treatment options that might be prescribed by a dermatologist for your condition:
            </p>
            
            <div className="space-y-4">
              {prescriptions.map((prescription, index) => (
                <div key={index} className="border rounded-lg p-4 hover:border-derma-300 transition-colors">
                  <h3 className="text-lg font-bold text-derma-700">{prescription.name}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                    <div className="flex items-center">
                      <Info className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">{prescription.dosage}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">{prescription.frequency}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">{prescription.duration}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <p className="text-sm text-muted-foreground">{prescription.description}</p>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 mt-4">
              <p className="text-sm text-muted-foreground mb-4">
                <span className="font-medium">Important:</span> These recommendations are for informational purposes only. Please consult with a healthcare professional before starting any medication.
              </p>
              
              <Button onClick={handleContinue} className="w-full">
                View Product Recommendations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrescriptionRecommendations;
