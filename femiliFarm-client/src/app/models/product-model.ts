export class ProductRequestModel {
    Name: string;
    Description: string;
    Price: number;
    Stock: number;
    ImageUrl: string;
    Category: Category  
}

export class Product {
    Id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    category: Category  
}

export enum Category {
    Cosmetics = 1,
    OTC,
    Baby,
    Drugs
}

export interface Token{
    token: string
}

export class User{
    Id: number;
    Username: string;
    Fullname: string;
    Email: string;
    Token: string;
}