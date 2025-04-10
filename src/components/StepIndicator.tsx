
import React from 'react';
import { Check } from 'lucide-react';
import { ConsultationStep } from '@/utils/types';

interface StepIndicatorProps {
  currentStep: ConsultationStep;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full max-w-lg mx-auto mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  index < currentStep 
                    ? 'bg-derma-600 border-derma-600 text-white' 
                    : index === currentStep 
                    ? 'border-derma-600 text-derma-600' 
                    : 'border-gray-300 text-gray-300'
                }`}
              >
                {index < currentStep ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="text-xs font-medium">{index + 1}</span>
                )}
              </div>
              <span className={`mt-2 text-xs ${
                index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {index === 0 && "Info"}
                {index === 1 && "Symptoms"}
                {index === 2 && "Medications"}
                {index === 3 && "Review"}
              </span>
            </div>
            {index < totalSteps - 1 && (
              <div 
                className={`flex-1 h-0.5 ${
                  index < currentStep ? 'bg-derma-600' : 'bg-gray-300'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
