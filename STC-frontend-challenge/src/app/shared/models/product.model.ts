export interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: Rate;
  title:string;
}

export interface Rate {
  count: number;
  rate: number
}
