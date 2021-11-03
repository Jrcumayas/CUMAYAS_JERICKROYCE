import { Injectable, Patch } from '@nestjs/common';
import { CRUDReturn } from './crud_return.interface';
import { Helper } from './helper';
import { User } from './user.model';
import * as admin from 'firebase-admin';
import { resourceLimits } from 'worker_threads';
import { doc } from 'prettier';
import { disconnect } from 'process';
const DEBUG: boolean = true;

@Injectable()
export class UserService {

    private users: Map<string, User> = new Map<string, User>();
    private DB = admin.firestore();

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
                this.users.set(user.id,user);
              this.inputNewUser(user);
            });
          } catch (error) {
            console.log(error);
            return null;
          }
    }

    async getAllUsers(): Promise<CRUDReturn>{
        var results: Array<any> = [];
        try{
            var dbData: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> = 
                await this.DB.collection("users").get();
            dbData.forEach((doc) => {
                if (doc.exists){
                    var dbUser: User = new User (doc.data().name, doc.data().age, doc.data().email, doc.data().password);
                    results.push(dbUser.toJson());
                }
            });
            return {
                success: true,
                data: results
            };
        } catch (error){
            return {
                success: false,
                data: error.message
            }
        }
    }

    async getUserId(id: string): Promise<CRUDReturn>{
        var dbData = await this.DB.collection("users");
        const snapshot = await dbData.where('id', '==', id).get();
        try{
            if(!(snapshot.empty)){
                return{
                    success: true,
                    data: (await dbData.doc(id).get()).data()
                }
            }  
            else {
                return{
                    success: false,
                    data: "User ID doesn't exist."
                }
            }
        } catch (error){
            return {
                success: false,
                data: error.message
            }
        }
    }
    
    async inputNewUser(user: any): Promise<CRUDReturn>{
        var newUser:  User;
        try{
            if(Helper.validBody(user)){
                newUser = new User(user?.name, user?.age, user?.email, user?.password);
                if(await (await this.checkTermPresent(newUser.toJson().email)).success == true){
                    return {
                        success: false,
                        data: ("Email has already been used.")
                    };
                }  
                else{
                    if (this.saveToDB(newUser)){
                        if (DEBUG) this.logAllUsers();
                        return {
                            success: true,
                            data: ("Account created succesfully!")
                        };
                    }
                }
            }
            else{
                return {
                    success: false,
                    data: ("Please make sure that attributes and inputs are correct.")
                }
            }
        } catch(error){
            return {
                success: false,
                data: error.message
            }
        }
    }

    async replaceAllValues(user:any, id:string){
        try{
            var newUser:User = new User(user?.name, user?.age, user?.email, user?.password);
            newUser.id = id;
            var dbData = await this.DB.collection("users").doc(id).get();
            var data = dbData.data();
            var dbUser: User = new User (data['name'], data['age'], data['email'], data['password']);
            if(await this.search(id) == true){
                if((newUser.checkAttributes() == false)){
                    return {
                        success: false,
                        data: ("One or more of the attributes are missing.")
                    };
                }
                else if((newUser.checkTypeOfAttributesPut() == false)){                        return {
                        success: false,
                        data: ("Attributes of the wrong type.")
                    };
                   }
                else if(await (await this.checkTermPresent(newUser.toJson().email)).success == true){
                      return {
                            success: false,
                            data: ("Email has already been used.")
                        };
                    }  
                    else if (await newUser.compareValues(dbUser) == false){
                        return {
                            success: false,
                            data: ("All values must be changed.")
                        }
                    }
                    else{
                        this.DB.collection("users").doc(newUser.id).set(newUser.toJson());
                        return {
                            success: true,
                            data: newUser.toJson()
                        };
                    }
                }
                else{
                    return {
                        success: false,
                        data: ("ID not found!")
                    };
                }
        }catch(error){
            return {
                success: false,
                data: error.message
            }
        }
    }

    async patchValue(user: any, id: string){
        var patchUser: User;
        var dbData = await this.DB.collection("users").doc(id).get();
        var data = dbData.data();
        var dbUser: User = new User (data['name'], data['age'], data['email'], data['password']);
        try{
            if(Helper.validBody(user)){
                if(dbData.exists == true){
                    patchUser = new User (user?.name, user?.age, user?.email, user?.password);
                    patchUser.id = id;
                    if(await (await this.checkTermPresent(patchUser.toJson().email)).success == true){
                        return {
                            success: false,
                            data: ("Email has already been used.")
                        }
                    }
                    else{
                        dbUser.patchValues(patchUser);
                        this.DB.collection("users").doc(id).set(dbUser.toJson());
                        return {
                            success: true,
                            data: dbUser.toJson()
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
                    sucess: false,
                    data: "Invalid attributes."
                }
            }
                        
        } catch(error) {
            return {
                success: false,
                data: error.message
            }
        }
    }

    async deleteUser(id: string){
        var dbData = await this.DB.collection("users");
        const snapshot = await dbData.where('id', '==', id).get();
        try{
            if(!(snapshot.empty)){
                this.DB.collection("users").doc(id).delete();
                return{
                    success: true,
                    data: "Account succesfully deleted."
                }
            }  
            else {
                return{
                    success: false,
                    data: "User ID doesn't exist."
                }
            }
        } catch (error){
            return {
                success: false,
                data: error.message
            }
        }
        
    }

    async loginUser(userLogin: any){
        var temp: User = new User (userLogin?.name, userLogin?.age, userLogin?.email, userLogin?.password);
        var dbData = await this.DB.collection("users");
        const snapshot = await dbData.where('email', '==', temp.toJson().email).get();
        try{
        const data = await this.DB.collection("users").get();
            if(!(snapshot.empty)){
                for (const doc of snapshot.docs) {
                    if(doc.data()['password'] === temp.toJson().password){
                        return {
                            success: true,
                            data: ("Succesful Login!")
                        }
                    }
                }
                return{
                    success: false,
                    data: ("Invalid email or password.")
                }
            } 
            else {
                return{
                    success: false,
                    data: "Account details are not in database."
                }
            }
        } catch (error){
            return {
                success: false,
                data: error.message
            }
        }
    }
    
    async searchTerm(term: string){
        var results = [];
        var matches =[];
        var n = 0;
        var dbData: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> = 
                await this.DB.collection("users").get();
        try {
            dbData.forEach((doc) => {
                if (doc.exists){
                    results.push(doc.data());
                }
            });
            for (const key of results){
                if(key.email == term){
                    matches.push(key.id)
                    n = n + 1;
                }
            }
            if(n == 0){
                return {
                    success: false,
                    data: ("No matches found.")
                };
            }
            else{
                return {
                    success: true,
                    data: matches
                };
            }
        } catch (error) {
            return {
                success: false,
                data: error.message
            }
        }
        
    }

    async checkTermPresent(term: string): Promise<CRUDReturn>{
        var results: Array<any> = [];
        var temp: string = term.toUpperCase();
        var dbData: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> = 
                await this.DB.collection("users").get();
        try {
            dbData.forEach((doc) => {
                if (doc.exists){
                    results.push(doc.data());
                }
            });
            for (const key of results){
                if(key['id'].toUpperCase() == temp || key['name'].toUpperCase() == temp || key['age'] == parseInt(term) || key['email'].toUpperCase() == temp || key['password'].toUpperCase() == temp){
                    return {
                        success:true,
                        data: results
                    }
                }
            }
            return {
                success: false,
                data: ("Term not found.")
            };
        } catch(error){
            return {
                success: false,
                data: error.message
            };
        }
    }

    async search(id: string): Promise<boolean>{
        var dbData = await this.DB.collection("users").doc(id).get();
        if(dbData.exists){
            return true;
        }
        else{
            return false;
        }
    }

    saveToDB(user: User): boolean {
        try {
          this.DB.collection("users").doc(user.id).set(user.toJson());
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }

      getAll(): CRUDReturn {
        var results: Array<any> = [];
        try {
          for (const user of this.users.values()) {
            results.push(user.toJson());
          }
          return { success: true, data: results };
        } catch (e) {
          return { success: false, data: e };
        }
      }

      logAllUsers() {
        console.log(this.getAll());
      }
        
}