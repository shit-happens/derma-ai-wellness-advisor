export interface UserInfo {
  age: number;
  gender: string;
  symptoms: string; // Changed from 'condition' to match the form
  medications?: string;
}

export interface DiagnosisResult {
  diagnosis: string;
  confidence: number;
  description: string;
}

export interface Prescription {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  description: string;
}

export interface Product {
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  price: string;
  rating: number;
}

export enum ConsultationStep {
  WELCOME = 0,
  PERSONAL_INFO = 1,
  SYMPTOMS = 2,
  MEDICATIONS = 3,
  REVIEW = 4,
  SUBMITTING = 5,
}
