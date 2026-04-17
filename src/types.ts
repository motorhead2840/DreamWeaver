export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  description: string;
}

export interface StylingAdvice {
  recommendation: string;
  reasoning: string;
  suggestedProducts: string[];
}
