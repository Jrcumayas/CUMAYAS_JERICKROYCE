var number = 1;
var signal = 0;
var dibisible = 0;

for (var i = 2; i < number; i++) {
    if (number % i == 0) {
        signal = 1;
        divisible = i;
        break;
    }
}

if (number == 1) {
    console.log(`1 is not a prime number.`);
} else if (signal == 1) {
    console.log(`${number} is not a prime number.`);
    console.log(`It is divisible by ${i}.`);
} else {
    console.log(`${number} is a prime number.`);
}