import * as admin from 'firebase-admin';
import { User } from './user.model';
const DEBUG: boolean = true;

export class UserDetails{
    private id;
    private name;
    private age;
    private email;
    private password;

    constructor(id: string, name: string, age: number, email: string, password: string){
        this.name = name;
        this.age = age;
        this.email = email;
        this.password;
    }
}
