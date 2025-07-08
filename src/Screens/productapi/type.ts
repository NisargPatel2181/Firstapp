import { ReactNode } from "react";

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  MovieList: undefined;
  ProductDetail: { id: number };
};
