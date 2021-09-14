import { Injectable } from '@nestjs/common';

@Injectable()
export class Exercise3Service {

        loopsTriangle(height: number){
            for (var row = 0; row < height; row++) {
            var string = '';
            for (var col = 0; col <= row; col++) {
            string = string + "*";
                }
            console.log(string);
            }
            return "Running: Loops Triangle";
        }

        hello(name: string){
            console.log("Hello World!");
            return "Hello there, " + name + "!";
        }

        multiplicationTable(size: number){
            console.log("Multiplication Table!");
            var string = '';

            for (var row = 1; row <= size; row++) {
                string = '';
                for (var col = 1; col <= size; col++) {
                    var number = (row * col);

                    if (number > 0 && number < 10) {
                        string = string + number + "     ";
                    } 
                    else if (number >= 10 && number <= 99) {
                        string = string + number + "    ";
                    } 
                    else if (number == 100) {
                        string = string + number;
                    }
                }
                console.log(string);
            }
            return "Running: Multiplication Table";
        }

        variableType(){
            var fullName = "Jerick Royce Cumayas"
            console.log(fullName);
            console.log(`The variable ${fullName} is of type ${typeof fullName}.\n`);

            var studentID = 2017010570;
            console.log(studentID);
            console.log(`The variable ${studentID} is of type ${typeof studentID}.\n`);

            var numbers = [1, 2, 3, 4, 5];
            console.log(numbers);
            console.log(`The variale ${numbers} is of type ${typeof numbers}.\n`);

            var birthMonth = "August";
            var January = "January";
            var August = "August";
            console.log(`Birthmonth: ${birthMonth}`);
            console.log(`January: ${January}`);
            console.log(`August: ${August}`);
            console.log(`Is January equal to my birthmonth? ${January==birthMonth}.`);
            console.log(`Is August equal to my birthmonth? ${birthMonth==August}.\n`);

            var projectIdea;
            console.log(projectIdea);
            console.log(`The variable projectIdea is ${typeof projectIdea}.\n`);

            var nextNode = null;
            console.log(nextNode);
            console.log(`The variable nextNode has the value ${nextNode}.\n`);

            var randomObjects = { one: "pencil", "two": "notebook", three: [5] };
            console.log(randomObjects);
            randomObjects["Wow"] = 1;
            console.log(randomObjects);
            console.log(`The variable ${randomObjects.one} is of type ${typeof randomObjects.one}.`);
            return "Running: Variable Types";
        }

        primeNumber(number: number){
            var signal = 0;
            var divisible = 0;

            for (var i = 2; i < number; i++) {
               if (number % i == 0) {
                   signal = 1;
                  divisible = i;
                  break;
              }
            }   

                if (number == 1) {
                   return (`The number 1 is not a prime number.`);
                } else if (signal == 1) {
                   return (`The number ${number} is not a prime number. It is divisible by ${i}.`);
                } else {
                    return (`The number ${number} is a prime number.`);
                }
        }
}

