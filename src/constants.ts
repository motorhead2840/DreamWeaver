import { Product } from './types';

export const BRAND_NAME = "DreamWeaver";
export const STORE_NAME = "DreamWeaver";
export const COMPANY_NAME = "HKR Corp (India)";

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Silk Cascade Gown',
    price: '$1,200',
    category: 'Evening Wear',
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680fe0a?auto=format&fit=crop&w=800&q=80',
    description: 'A flowing silk gown that feels like a second skin.'
  },
  {
    id: '2',
    name: 'Ethereal Lace Blouse',
    price: '$450',
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=800&q=80',
    description: 'Delicate lace detailing for a sophisticated look.'
  },
  {
    id: '3',
    name: 'Gilded Velvet Blazer',
    price: '$890',
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
    description: 'Structured elegance with a touch of gold.'
  },
  {
    id: '4',
    name: 'Satin Slip Dress',
    price: '$600',
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
    description: 'Minimalist luxury for the confident woman.'
  }
];
