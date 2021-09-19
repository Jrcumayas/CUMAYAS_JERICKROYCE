import { Injectable } from '@nestjs/common';
import { nextTick } from 'process';
import { resourceLimits } from 'worker_threads';
import { User } from './user.model';

@Injectable()
export class UserService {

    private users: Map<number, User> = new Map<number, User>();

    constructor(){
        this.generateUsers();
    }

    generateUsers(){
        this.users.set(1, new User(1, "Jerick Royce", "Cumayas", 21, "Sitio Taytayan, Barangay Buhisan, Cebu City", "jerickroyce.cumayas.20@usjr.edu.ph", "password1"));
        this.users.set(2, new User(2, "Charles Christian", "Cumayas", 19, "Sitio Taytayan, Barangay Buhisan, Cebu City", "charlescumayas@gmail.com", "password2"));
        this.users.set(3, new User(3, "Princess Erick", "Cumayas", 11, "Sitio Taytayan, Barangay Buhisan, Cebu City", "princesscumayas@gmail.com", "password3"));
        this.users.set(4, new User(4, "Eric", "Cumayas", 47, "Sitio Taytayan, Barangay Buhisan, Cebu City", "ericcumayas@gmail.com", "password4"));
        this.users.set(5, new User(5, "Jecil", "Cumayas", 46, "Sitio Taytayan, Barangay Buhisan, Cebu City", "jecilcumayas@gmail.com", "password5"));
    }

    getAllUsers(){
        var generatedData = [];
        for(const user of this.users.values()){
            generatedData.push(user.toJson());
        }
        return generatedData;
    }

    getUserId(id: string){
        var parsedId = parseInt(id);
        if(this.users.has(parsedId))
            return this.users.get(parsedId).toJson();
    }
    
    inputNewUser(user: any){
        var newUser:  User;
        newUser = new User(user?.idNumber, user?.firstName, user?.lastName, user?.age, 
            user?.address, user?.email, user?.password);
        this.users.set(user.idNumber, newUser);
        return "Succesful registration!";
    }

    replaceAllValues(user:any, id:string){
        var parsedId = parseInt(id);
        var editId: User;
        var temp: User;
        if(this.users.has(parsedId)){
            editId = new User (parsedId, user?.firstName, user?.lastName, user?.age,
                user?.address, user?.email, user?.password);
            temp = this.users.get(parsedId);    
            if(editId.compareValues(temp)){
                this.users.set(parsedId, editId);
                return `All changes are applied on ID Number ${parsedId}`;
            }
            else{
                return "Error Encountered:<br>- All information must be changed. Change all values.<br>- Make sure that all needed information are filled in.";
            }
        }
        else{
            return "ID number not found!";
        }
    }

    patchValue(user: any, id: string){
        var parsedId = parseInt(id);
        var editId: User;
        var temp: User;
        if(this.users.has(parsedId)){
            editId = this.users.get(parsedId);
            editId = new User (parsedId, user?.firstName, user?.lastName, user?.age,
                user?.address, user?.email, user?.password); 
            temp = this.users.get(parsedId);  
            editId.patchValues(temp);
            if(editId.checkTypeOfValues()){
                this.users.set(parsedId,editId);
                return `Changes are applied and user details are updated.`;
            }
            else{
                return `Error Encountered:<br>- ID Number and Age should be numbers and not string.<br>- First Name, Last Name, Address, Email, and Password<br> should be strings not numbers.`;
            }
            
        }
        else{
            return "ID number not found!";
        }
    }

    deleteUser(id: string){
        var parsedId = parseInt(id);
        var editId: User;
        if(this.users.has(parsedId)){
            this.users.delete(parsedId);
            return `User ID Number ${parsedId} has been succesfully deleted.`;
        }
        else{
            return `Error Encountered:<br>- User ID Number ${parsedId} does not exit.`;
        }
    }

    loginUser(user: any){
        var body: User = user;
        var temp: User;
        for (const [key,userEntry] of this.users.entries()) {
            temp = userEntry;
            if(temp.checkLoginDetails(user)){
                console.log(key);
                return `Login Succesful!<br>Welcome, ${this.users.get(key).toJson().firstName} ${this.users.get(key).toJson().lastName}!`;
            }
        }
        return `Error Encountered:<br>- Incorrect Email<br>- Incorrect Password<br>- Login details not found`;
    }

    searchTerm(term: string){
        var check: any;
        var temp: User;
        var results = [];
        for (const [key, userEntry] of this.users.entries()){
            temp = userEntry;
            if(temp.checkUserDetails(term)){
                results.push (`Term is found on ID Number ${key} from ${this.users.get(key).toJson().firstName} ${this.users.get(key).toJson().lastName}`);
            }
        }
        return results;
    }
        
}