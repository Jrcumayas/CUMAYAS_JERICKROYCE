import { stringify } from "querystring";

export class User {

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

    compareValues(user: User){
        if((this.firstName !== user.firstName) && (this.lastName !== user.lastName)&& (this.age !== user.age) && 
            (this.address !== user.address) && (this.email !== user.email) && (this.password !== user.password)){
            return true;
        }
        else{
            return false;
        }
    }

    patchValues(user: User){
        if(!(this.firstName)){
            this.firstName = user.firstName;
        }
        if(!(this.lastName)){
            this.lastName = user.lastName;
        }
        if(!(this.age)){
            this.age = user.age;
        }
        if(!(this.address)){
            this.address = user.address;
        }
        if(!(this.email)){
            this.email = user.email;
        }
        if(!(this.password)){
            this.password = user.password;
        }
    }

    checkLoginDetails(user: any){
        if(this.email === user.email && this.password === user.password){
            return true;
        }
        else if(this.email === user.email && !(this.password === user.password)){
            return false;
        }
        else if(!(this.email === user.email) && this.password === user.password){
            return false;
        }
        else{
            return false;
        }
    }

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
}