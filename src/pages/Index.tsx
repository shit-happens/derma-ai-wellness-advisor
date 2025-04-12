
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const handleStartConsultation = () => {
    navigate('/consultation');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center mb-20">
          <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              AI-Powered <span className="text-derma-600">Skin Analysis</span> & Treatment Recommendations
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Get expert dermatological advice powered by advanced AI. Analyze your skin condition, receive potential diagnoses, and explore treatment options instantly.
            </p>
            <Button size="lg" onClick={handleStartConsultation} className="text-lg">
              Start Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-derma-200 rounded-3xl transform rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1624727828489-a71b4eed7418?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Dermatology consultation" 
                className="relative z-10 rounded-3xl shadow-xl object-cover w-full h-[500px]"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition">
              <div className="w-12 h-12 rounded-full bg-derma-100 flex items-center justify-center mb-4">
                <span className="text-derma-600 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Share Your Symptoms</h3>
              <p className="text-muted-foreground">
                Answer a few questions about your skin condition, age, gender, and any medications you're taking.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition">
              <div className="w-12 h-12 rounded-full bg-derma-100 flex items-center justify-center mb-4">
                <span className="text-derma-600 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Get AI Analysis</h3>
              <p className="text-muted-foreground">
                Our advanced AI analyzes your information and provides potential diagnoses with detailed explanations.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition">
              <div className="w-12 h-12 rounded-full bg-derma-100 flex items-center justify-center mb-4">
                <span className="text-derma-600 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Receive Recommendations</h3>
              <p className="text-muted-foreground">
                Explore personalized treatment options and product recommendations to address your skin concerns.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-derma-50 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to discover what's affecting your skin?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Our AI dermatologist assistant is available 24/7 to help you understand your skin condition and find the right treatment options.
          </p>
          <Button size="lg" onClick={handleStartConsultation} className="text-lg">
            Start Your Skin Analysis Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
