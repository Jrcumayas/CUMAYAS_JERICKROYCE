import { Body, Controller, Delete, Get, Param, Patch, Post, Put} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get("/all")
    getAllUsers(){
        return this.userService.getAllUsers();
    }

    @Get(`/searchUserId/:id`)
    getUserid(@Param("id") id: string){
        return this.userService.getUserId(id);
    }

    @Post(`/registerUser`)
    inputNewUser(@Body() body:any){
        return this.userService.inputNewUser(body);
    }

    @Put(`/replaceAllValues/:id`)
    replaceAllValues(@Body() body:any, @Param (`id`) id: string){
        return this.userService.replaceAllValues(body,id);
    }

    @Patch(`/patchValues/:id`)
    patchValue(@Body() body:any, @Param(`id`) id: string){
        return this.userService.patchValue(body,id);
    }

    @Delete(`/deleteUser/:id`)
    deleteUser(@Param (`id`) id: string){
        return this.userService.deleteUser(id);
    }

    @Post(`/login`)
    loginUser(@Body() body: any){
        return this.userService.loginUser(body);
    }

    @Get(`/searchTerm/:term`)
    searchTerm(@Param (`term`) term: string){
        return this.userService.searchTerm(term);
    }

}
