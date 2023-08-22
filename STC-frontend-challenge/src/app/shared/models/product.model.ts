export interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: Rate
}

export interface Rate {
  count: number;
  rate: number
}
