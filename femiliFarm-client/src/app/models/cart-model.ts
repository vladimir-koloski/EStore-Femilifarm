import { Product } from "./product-model";

export class Cart {
    id: number;
    userId: number;
    products: Product[]; 
}

export class CartRequestModel {
    userId: number;
    product?: Product;
}