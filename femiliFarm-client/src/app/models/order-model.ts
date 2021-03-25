import { Product } from "./product-model";

export class Order{
    createdOn?: string;
    id: number;
    products: Product[];
    userId: number;
    username: string;
    totalPrice?: number;
}