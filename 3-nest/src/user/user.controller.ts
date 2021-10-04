import { Body, Controller, Delete, Get, Param, Patch, Post, Put} from '@nestjs/common';
import { CRUDReturn } from './crud_return.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get("/all")
    getAllUsers(){
        return this.userService.getAllUsers();
    }

    @Get(`/:id`)
    getUserid(@Param("id") id: string){
        return this.userService.getUserId(id);
    }

    @Post(`/register`)
    inputNewUser(@Body() body:any){
        return this.userService.inputNewUser(body);
    }

    @Put(`/:id`)
    replaceAllValues(@Body() body:any, @Param (`id`) id: string){
        return this.userService.replaceAllValues(body,id);
    }
/*
    @Patch(`/:id`)
    patchValue(@Body() body:any, @Param(`id`) id: string){
        return this.userService.patchValue(body,id);
    }

    @Delete(`/:id`)
    deleteUser(@Param (`id`) id: string){
        return this.userService.deleteUser(id);
    }
*/
    @Post(`/login`)
    loginUser(@Body() body: any){
        return this.userService.loginUser(body);
    }

    @Get(`/search/:term`)
    searchTerm(@Param (`term`) term: string){
        return this.userService.searchTerm(term);
    }

}
