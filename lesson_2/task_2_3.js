/*
Объявить две целочисленные переменные — a и b и задать им произвольные начальные
значения. Затем написать скрипт, который работает по следующему принципу:
- если a и b положительные, вывести их разность;
- если а и b отрицательные, вывести их произведение;
- если а и b разных знаков, вывести их сумму;
Ноль можно считать положительным числом.
*/
var a = +prompt("Укажите число a:"), b = +prompt("Укажите число b:");
var result = null;
if (a >= 0 && b >= 0)
    result = a - b;
else if (a < 0 && b < 0)
    result = a * b;
else
    result = a + b;
alert(result);