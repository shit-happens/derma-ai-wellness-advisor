import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import StepIndicator from './StepIndicator';
import { ConsultationStep, UserInfo } from '@/utils/types';
import { toast } from '@/components/ui/use-toast';

const ConsultationForm: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<ConsultationStep>(ConsultationStep.PERSONAL_INFO);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    age: 30,
    gender: 'female',
    symptoms: '',
    medications: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setUserInfo(prev => ({ ...prev, gender: value }));
  };

  const nextStep = () => {
    if (step === ConsultationStep.PERSONAL_INFO && (userInfo.age <= 0 || userInfo.age > 120)) {
      toast({
        title: "Invalid Age",
        description: "Please enter a valid age between 1 and 120.",
        variant: "destructive",
      });
      return;
    }
    
    if (step === ConsultationStep.SYMPTOMS && !userInfo.symptoms.trim()) {
      toast({
        title: "Symptoms Required",
        description: "Please describe your symptoms.",
        variant: "destructive",
      });
      return;
    }
    
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const submissionData = {
        ...userInfo,
        medications: userInfo.medications?.trim() || 'None'
      };
      
      console.log('Submitting data:', submissionData);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      navigate('/diagnosis', { state: { userInfo: submissionData } });
    } catch (error) {
      console.error('Error submitting data:', error);
      toast({
        title: "Submission Error",
        description: "There was an error processing your consultation. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 consultation-container flex flex-col justify-center">
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <StepIndicator currentStep={step} totalSteps={4} />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === ConsultationStep.PERSONAL_INFO && (
              <div className="space-y-4 animate-fade-in">
                <h2 className="text-2xl font-bold text-center mb-6">Personal Information</h2>
                
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={userInfo.age}
                    onChange={handleChange}
                    placeholder="Enter your age"
                    className="w-full"
                    min="1"
                    max="120"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <RadioGroup 
                    value={userInfo.gender} 
                    onValueChange={handleRadioChange}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}
            
            {step === ConsultationStep.SYMPTOMS && (
              <div className="space-y-4 animate-fade-in">
                <h2 className="text-2xl font-bold text-center mb-6">Current Symptoms</h2>
                
                <div className="space-y-2">
                  <Label htmlFor="symptoms">
                    Please describe your skin symptoms in detail
                  </Label>
                  <Textarea
                    id="symptoms"
                    name="symptoms"
                    value={userInfo.symptoms}
                    onChange={handleChange}
                    placeholder="Describe the location, appearance, duration, and any factors that make symptoms better or worse..."
                    className="min-h-[200px]"
                  />
                </div>
              </div>
            )}
            
            {step === ConsultationStep.MEDICATIONS && (
              <div className="space-y-4 animate-fade-in">
                <h2 className="text-2xl font-bold text-center mb-6">Current Medications</h2>
                
                <div className="space-y-2">
                  <Label htmlFor="medications">
                    Are you currently taking any medications? (optional)
                  </Label>
                  <Textarea
                    id="medications"
                    name="medications"
                    value={userInfo.medications}
                    onChange={handleChange}
                    placeholder="List any medications, supplements, or skin products you are currently using..."
                    className="min-h-[200px]"
                  />
                </div>
              </div>
            )}
            
            {step === ConsultationStep.REVIEW && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl font-bold text-center mb-6">Review Your Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Personal Information</h3>
                    <p><span className="font-medium">Age:</span> {userInfo.age}</p>
                    <p><span className="font-medium">Gender:</span> {userInfo.gender.charAt(0).toUpperCase() + userInfo.gender.slice(1)}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Symptoms</h3>
                    <p className="whitespace-pre-wrap">{userInfo.symptoms || "None provided"}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Medications</h3>
                    <p className="whitespace-pre-wrap">{userInfo.medications || "None provided"}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-between pt-4">
              {step > ConsultationStep.PERSONAL_INFO && (
                <Button 
                  type="button" 
                  onClick={prevStep}
                  variant="outline"
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              )}
              
              {step < ConsultationStep.REVIEW ? (
                <Button 
                  type="button" 
                  onClick={nextStep}
                  className="ml-auto"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  type="submit"
                  className="ml-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsultationForm;
