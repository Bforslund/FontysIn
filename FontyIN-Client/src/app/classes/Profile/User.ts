import { UserType } from './UserType';

export class User {
    id: number;
    firstName: string;
    lastName: string;
    userEmail: string;
    email:string;
    password: string;; 
    phoneNumbar: string;; 
    addressId: number;
    locationId: number;
    departmentId: number; 
    userNumber: string; 
    image: string;
    userType: UserType;
    
    constructor(
        public id: number
    ) {  }
}