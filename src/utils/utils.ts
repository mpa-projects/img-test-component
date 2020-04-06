export interface Product {
  id: number;
  title: string;
  category: string;
  categoryId: number;
  price: number;
  stock: number;
  imageUrl: string;
}

export interface ResultItem {
  title: string;
  tags?: string[];
  imageUrl: string;
}

export interface Category {
  id: number;
  products: number;
  name: string;
}
