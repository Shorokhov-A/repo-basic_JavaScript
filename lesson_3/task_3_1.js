/*
С помощью цикла while вывести все простые числа в промежутке от 0 до 100.
*/
var number = 0;
while (number <= 100) {
    if (number > 1) {
        let primeCheck = true;
        for (let divisor = 2; divisor < number; divisor++) {
            if (number % divisor == 0) {
                primeCheck = false;
                break;
            }
        }
        if (primeCheck) {
            console.log(number);
        }
    }
    number++;
}
