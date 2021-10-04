import { Injectable } from '@nestjs/common';
import { nextTick } from 'process';
import { resourceLimits } from 'worker_threads';
import { CRUDReturn } from './crud_return.interface';
import { User } from './user.model';

@Injectable()
export class UserService {

    private users: Map<string, User> = new Map<string, User>();

    constructor(){
        this.generateUsers();
    }

    generateUsers(){
        try {
        var users = [
            new User('Leanne Graham', 18, 'sincere@april.biz', 'LG_123456'),
            new User('Ervin Howell', 21, 'shanna@melissa.tv', 'EH_123123'),
            new User('Nathan Plains', 25, 'nathan@yesenia.net', 'NP_812415'),
            new User('Patricia Lebsack', 18, 'patty@kory.org', 'PL_12345'),
        ];
        users.forEach((user) => {
            this.users.set(user.id, user);
        });
        } catch (error) {
            console.log(error);
            return null;
        };
    }

    getAllUsers(): CRUDReturn{
        var generatedData = [];
        for(const user of this.users.values()){
            generatedData.push(user.toJson());
        }
        return {
            success: true,
            data: generatedData
        };
    }

    getUserId(id: string): CRUDReturn{
        var temp: User;
        var results = [];
        var num:number = 0;
        for (const [key, userEntry] of this.users.entries()){
            temp = userEntry;
            if(temp.matches(id)){
                num = num + 1;
                results.push(temp.toJson());
            }
        }
        return {
                success: true,
                data: results
        }
    }
    
    inputNewUser(user: any): CRUDReturn{
        var newUser:  User;
        var tempResults = [];
        newUser = new User(user?.name, user?.age, user?.email, user?.password);
        if((newUser.checkAttributes() == false)){
            return {
                success: false,
                data: ("One or more of the attributes are missing.")
            };
        }
        else if((newUser.checkTypeOfAttributes() == false)){
            return {
                success: false,
                data: ("Attributes of the wrong type.")
            };
        }
        else if((this.searchTerm(newUser.toJson().email)).success == true){
            return {
                success: false,
                data: ("Email has already been used.")
            };
        }  
        else{
            return {
                success: true,
                data: newUser
            };
        }
    }

    replaceAllValues(user:any, id:string): CRUDReturn{
        var newUser: User;
        if(this.users.has(id)){
            newUser = new User(user?.name, user?.age, user?.email, user?.password);
            newUser.id = id;
            if((newUser.checkAttributes() == false)){
                return {
                    success: false,
                    data: ("One or more of the attributes are missing.")
                };
            }
            else if((newUser.checkTypeOfAttributes() == false)){
                return {
                    success: false,
                    data: ("Attributes of the wrong type.")
                };
            }
            else if((this.searchTerm(newUser.toJson().email)).success == true){
                return {
                    success: false,
                    data: ("Email has already been used.")
                };
            }  
            else{
                for (const [key, userEntry] of this.users.entries()){
                    if(userEntry.compareValues(newUser) == true){
                        this.users.set(id, newUser);
                        return {
                            success: true,
                            data: newUser.toJson()
                        };
                    }
                    else{
                        return {
                            success: false,
                            data: ("Error Encountered: All information must be changed. Change all values. Make sure that all needed information are filled in.")
                        };
                    } 
                }
            }
        }
        return {
            success: false,
            data: ("ID not found!")
        };
    }

    patchValue(user: any, id: string){
        var patchUser: User;
        for (const [key, userEntry] of this.users.entries()){
            if(userEntry.matches(id)){
                patchUser = new User (user?.name, user?.age, user?.email, user?.password);   
                if(patchUser.checkTypeOfAttributes()){
                    this.users.set(userEntry.id, patchUser);
                    return {
                        success: true,
                        data: patchUser.toJson()
                    };
                }
                else{
                    return {
                        success: true,
                        data: (`Error Encountered:ID Number and Age should be numbers and not string.First Name, Last Name, Address, Email, and Password<br> should be strings not numbers.`)
                    };
                }
            }
        }
        return{
            success: false,
            data: ("ID not found")
        };
        
    }

    deleteUser(id: string){
        var editId: User;
        if(this.users.has(id)){
            this.users.delete(id);
            return `User ID Number ${id} has been succesfully deleted.`;
        }
        else{
            return `Error Encountered:<br>- User ID Number ${id} does not exit.`;
        }
    }

    loginUser(userLogin: any){
        for (const [key,userEntry] of this.users.entries()) {
            if(userEntry.login(userLogin).success == true){
                return userEntry.login(userLogin);
            }  
        }
    }

    searchTerm(term: string){
        var results = [];
        var matches: number = 0;
        for (const [key, userEntry] of this.users.entries()){
            if(userEntry.matches(term)){
                matches = matches + 1;
                results.push(userEntry.toJson());
            }
        }
        if(matches == 0){
            return {
                success: false,
                data: ("No matches found.")
            };
        }
        else{
            return {
                success: true,
                data: results
            };
        }
    }
        
}