import { Controller, Get, Param } from '@nestjs/common';
import { Exercise3Service } from './exercise3.service';

@Controller('exercise3')
export class Exercise3Controller {
    constructor(private readonly e3: Exercise3Service){}

    @Get('/loopsTriangle/:height')
    loopsTriangle(@Param('height') height: string){
        var parsedHeight:number = parseInt(height);
        return this.e3.loopsTriangle(parsedHeight);
    }

    @Get(`/helloWorld/:name`)
    hello(@Param('name') name: string){
        var userName = name;
        return this.e3.hello(userName);
    }

    @Get(`/multiplicationTable/:size`)
    multiplicationTable(@Param(`size`) size: string){
        var parsedSize:number = parseInt(size);
        return this.e3.multiplicationTable(parsedSize);
    }

    @Get(`/variableType`)
    variableType(){
        return this.e3.variableType();
    }

    @Get(`/primeNumber/:number`)
    primeNumber(@Param(`number`) number: string){
        var parsedNumber:number = parseInt(number);
        return this.e3.primeNumber(parsedNumber);
    }

}
