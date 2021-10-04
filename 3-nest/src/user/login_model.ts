export class LoginSchema{
    private name: string;
    private password: string;

    constructor(name: string, password: string){
        this.name = name;
        this.password = password;
    }

    toJson(){
        return{
            name: this.name,
            password: this.password
        }
    }
}