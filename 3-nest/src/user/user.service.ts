import { Injectable } from '@nestjs/common';
import { nextTick } from 'process';
import { throwIfEmpty } from 'rxjs';
import { resourceLimits } from 'worker_threads';
import { CRUDReturn } from './crud_return.interface';
import { Helper } from './helper';
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
        try{
            for(const user of this.users.values()){
                generatedData.push(user.toJson());
            }
            return {
                success: true,
                data: generatedData
            };
        } catch (error){
            return {
                success: false,
                data: error.message
            }
        }
    }

    getUserId(id: string): CRUDReturn{
        var temp: User;
        var results = [];
        var num:number = 0;
        try{
            if(this.users.has(id)){
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
            else {
                return {
                    success: false,
                    data: ("User doesn't exist in database.")
                }
            }
        } catch (error){
            return {
                success: false,
                data: error.message
            }
        }
        
    }
    
    inputNewUser(user: any): CRUDReturn{
        var newUser:  User;
        try{
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
                this.users.set(newUser.id, newUser);
                return {
                    success: true,
                    data: newUser
                };
            }
        } catch(error){
            return {
                success: false,
                data: error.message
            }
        }
    }

    replaceAllValues(user:any, id:string){
        var newUser: User;
        var temp: User;
        try{
            if(Helper.validBodyPut(user).valid == true){
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
                    else if (this.users.get(id).compareValues(newUser) == false){
                        return {
                            success: false,
                            data: ("All values must be changed.")
                        }
                    }
                    else{
                        temp = this.users.get(id);
                        this.users.set(id, newUser);
                        return {
                            success: true,
                            data: this.users.get(id).toJson()
                        };
                    }
                }
                else{
                    return {
                        success: false,
                        data: ("ID not found!")
                    };
                }
            }
            else{
                return {
                    success: false,
                    data: ("Missing or invalid attributes.")
                }
            }
        } catch(error){
            return {
                success: false,
                data: error.message
            }
        }
    }
    

    patchValue(user: any, id: string){
        var patchUser: User;
        var temp: User;
        try{
            if(Helper.validBody(user).valid == true){
                if(this.users.has(id)){
                    patchUser = new User (user?.name, user?.age, user?.email, user?.password);
                    patchUser.id = id;
                    if((this.searchTerm(patchUser.toJson().email)).success == true){
                        return {
                            success: false,
                            data: ("Email has already been used.")
                        }
                    }
                    else{
                        temp = this.users.get(id);
                        temp.patchValues(patchUser);
                        this.users.set(id, temp);
                        return {
                            success: true,
                            data: temp
                        };
                    }
                }
                else{
                    return{
                        success: false,
                        data: ("ID not found")
                    };
                }
            }
            else{
                return {
                    success: false,
                    data: ("Invalid attributes.")
                }
            }
            
        } catch(error) {
            return {
                success: false,
                data: error.message
            }
        }
    }

    deleteUser(id: string){
        var editId: User;
        try{
            if(this.users.has(id)){
                this.users.delete(id);
                return {
                    success: true,
                    data: ("Account succesfully deleted.")
                };
            }
            else{
                return {
                    success: false,
                    data: ("ID does not exist.")
                };
            }
        } catch (error){
            return {
                success: false, 
                data: error.message
            };
        }
        
    }

    loginUser(userLogin: any){
        var temp: User = new User(userLogin?.name, userLogin?.age, userLogin?.email, userLogin?.password);
        try {
            for (const [key, userEntry] of this.users.entries()){
                if(userEntry.login(temp).success == true){
                    return {
                        success: true,
                        data: userEntry.toJson()
                    };
                }
            }
            return {
                success: false,
                data: ("Invalid login details.")
            }
        } catch (error){
            return {
                success: false,
                data: error.message
            }
        }
        
    }

    searchTerm(term: string){
        var results = [];
        var matches: number = 0;
        try {
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
        } catch (error) {
            return {
                success: false,
                data: error.message
            }
        }
        
    }
        
}