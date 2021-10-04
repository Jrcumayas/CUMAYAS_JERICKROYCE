import { stringify } from "querystring";
import { CRUDReturn } from './crud_return.interface';
import { Helper } from './helper'

export class User {
/*
    private idNumber: number;
    private firstName: string;
    private lastName: string;
    private age: number;
    private address: string;
    private email: string;
    private password: string;

    constructor(idNumber: number, firstName: string, lastName: string, age: number, 
        address: string, email: string, password: string){

            this.idNumber = idNumber;
            this.firstName = firstName;
            this.lastName = lastName;
            this.age = age;
            this.address = address;
            this.email = email;
            this.password = password;

    }

    toJson(){

        return{
            idNumber: this.idNumber,
            firstName: this.firstName,
            lastName: this.lastName,
            age: this.age,
            address: this.address,
            email: this.email,
        }

    }

    checkTypeOfValues(){
        var num = 1;
        var string = "string";
        if((typeof this.idNumber === typeof num) && (typeof this.firstName === typeof string) && (typeof this.lastName === typeof string)&& (typeof this.age === typeof num) && 
            (typeof this.address === typeof string) && (typeof this.email === typeof string) && (typeof this.password === typeof string)){
            return true;
        }
        else{
            return false;
        }
    }
*/
    compareValues(user: User){
        if((this.name !== user.name) && (this.age !== user.age) && (this.email !== user.email) && (this.password !== user.password)){
            return true;
        }
        else{
            return false;
        }
    }

    patchValues(user: User){
        if(!(this.name)){
            this.name = user.name;
        }
        if(!(this.age)){
            this.age = user.age;
        }
        if(!(this.email)){
            this.email = user.email;
        }
        if(!(this.password)){
            this.password = user.password;
        }
    }

    checkLoginDetails(user: any): boolean{
        if(this.email === user.email && this.password === user.password){
            return true;
        }
        else if (this.email === user.email && !(this.password === user.password)){

        }
        else{
            return false;
        }
    }
/*
    checkUserDetails(term: string){
        var firstName: string = this.firstName.toUpperCase();
        var lastName: string = this.lastName.toUpperCase();
        var address: string = this.address.toUpperCase();
        var email: string = this.email.toUpperCase();
        var password: string = this.password.toUpperCase();
        var passedString: string = term.toUpperCase();

        if(this.idNumber == parseInt(term) || this.age == parseInt(term) || firstName == passedString || lastName == passedString || 
           address == passedString || email == passedString || password == passedString){
            return true;
        }
        else{
            return false;
        }
        
        
    }
    */

    public id: string;
    private name: string;
    private age: number;
    private email: string;
    private password: string;

    constructor(name: string, age: number, email: string, password: string){
        this.id = Helper.generateUID();
        this.name = name;
        this.age = age;
        this.email = email;
        this.password = password;
    }

    login(userLogin): CRUDReturn {
        try {
          if (this.password === userLogin.password) {
            return { success: true, data: this.toJson() };
          } else {
            throw new Error(`${this.email} login fail, password does not match`);
          }
        } catch (error) {
          return { success: false, data: error.message };
        }
      }

    
    matches(term: string): boolean{
        var temp_Id: string = this.id.toUpperCase();
        var temp_Name: string = this.name.toUpperCase();
        var temp_Email: string = this.email.toUpperCase();
        var temp_Password: string = this.password.toUpperCase();
        var passedString: string = term.toUpperCase();
        if(temp_Id === passedString || this.age === parseInt(term) || temp_Name === passedString || temp_Email === passedString || temp_Password === passedString){
            return true;
        }
        else{
            return false;
        }
    }

    checkAttributes(){
        if((this.name) && (this.age) && (this.email) && (this.password)){
            return true;
        }
        else{
            return false;
        }
    }

    checkTypeOfAttributes(){
        var num:number = 1;
        var sample:string = "string";
        if((typeof this.age == typeof num) && (typeof this.id == typeof sample) && (typeof this.name == typeof sample) && (typeof this.email == typeof sample) && (typeof this.password == typeof sample)){
            return true;
        }
        else{
            return false;
        }
    }

    checkLoginTypes(userLogin){
        var sample: string = "string";
        if((typeof userLogin.email == typeof sample) && (typeof userLogin.password == typeof sample)){
            return true;
        }
        else{
            return false;
        }
    }

    replaceValues(newUser: any){
        newUser.id = this.id;
        this.name = newUser.name;
        this.age = newUser.age;
        this.email = newUser.email;
        this.password = newUser.password;
    }

    log(){
        console.log(this.toJson());
    }

    toJson(){
        return{
            id: this.id,
            name: this.name,
            age: this.age,
            email: this.email,
            password: this.password
        }
    }
}