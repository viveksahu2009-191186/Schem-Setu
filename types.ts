
export type Category = 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
export type Gender = 'Male' | 'Female' | 'Other';
export type Occupation = 'Farmer' | 'Student' | 'Small Business Owner' | 'Unemployed' | 'Artisan' | 'Homemaker';

export interface UserProfile {
  fullName: string;
  age: number;
  gender: Gender;
  state: string;
  district: string;
  category: Category;
  occupation: Occupation;
  annualIncome: number;
  landHolding?: number; // in acres
  isDisabled?: boolean;
}

export interface Scheme {
  id: string;
  name: string;
  provider: string; // Ministry name
  description: string;
  benefits: string[];
  eligibilitySummary: string;
  officialLink: string;
}

export interface SchemeMatch extends Scheme {
  matchPercentage: number;
  reasoning: string;
  missingCriteria: string[];
}
