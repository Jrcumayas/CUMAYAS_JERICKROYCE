var size = 10;
for (var row = 1; row <= size; row++) {
    var string = '';
    for (var col = 1; col <= size; col++) {
        var number = (row * col);

        if (number > 0 && number < 10) {
            string = string + number + "     ";
        } else if (number >= 10 && number <= 99) {
            string = string + number + "    ";
        } else if (number == 100) {
            string = string + number;
        }
    }
    console.log(string);
}