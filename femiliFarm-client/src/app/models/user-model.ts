export class User{
    id: number;
    userName: string;
    fullName: string;
    email: string;
    password: string;
    role: string;
}

export class UserRequestModel{
    UserName : string;
    Email : string;
    FullName : string;
    Password : string;
    Id?: number;
  } 

export class UserLoginModel{
    UserName: string;
    Password: string;
}