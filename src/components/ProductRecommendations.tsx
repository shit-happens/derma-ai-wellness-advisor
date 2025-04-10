
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DiagnosisResult, Prescription, Product, UserInfo } from '@/utils/types';
import { Star, Home } from 'lucide-react';

interface ProductRecommendationsProps {
  products: Product[];
  prescriptions: Prescription[];
  diagnosis: DiagnosisResult;
  userInfo: UserInfo;
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({ 
  products,
  prescriptions,
  diagnosis,
  userInfo
}) => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-4xl animate-fade-in">
      <Card className="overflow-hidden">
        <CardHeader className="bg-derma-500 text-white p-6">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold">Recommended Products</h2>
            <p className="text-derma-100 mt-2">
              Over-the-counter products that may help with {diagnosis.diagnosis}
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-6">
            <p className="text-muted-foreground">
              These non-prescription products are selected based on your condition and symptoms.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product, index) => (
                <Card key={index} className="overflow-hidden h-full flex flex-col">
                  <div className="aspect-square relative bg-secondary">
                    <img 
                      src={product.imageUrl || "/placeholder.svg"} 
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  
                  <CardContent className="p-4 flex-grow">
                    <Badge className="mb-2">{product.category}</Badge>
                    <h3 className="font-bold">{product.name}</h3>
                    <div className="flex items-center mt-2 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-xs ml-2">({product.rating}/5)</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3">{product.description}</p>
                  </CardContent>
                  
                  <CardFooter className="p-4 pt-0 border-t flex justify-between items-center mt-auto">
                    <span className="font-bold">{product.price}</span>
                    <Button variant="secondary" size="sm">Learn More</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="border-t pt-4 mt-4">
              <p className="text-sm text-muted-foreground mb-4">
                <span className="font-medium">Note:</span> These product recommendations are based on general effectiveness for your condition. Individual results may vary.
              </p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-6 pt-0">
          <Button onClick={handleHome} className="w-full" variant="outline">
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductRecommendations;
