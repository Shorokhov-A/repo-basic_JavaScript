/*
Чему будет равно JS-выражение 1000 + "108"?
*/
var someNumber = 1000;
var someNumString = "108";
var someLetters = "не число";
var result = someNumber + someNumString;
alert(someNumber + " + " + someNumString + " = " + result + "\nТип данных: " + typeof result);
result = someNumber * someNumString;
alert(someNumber + " * " + someNumString + " = " + result + "\nТип данных: " + typeof result);
result = someLetters + someNumber;
alert(someLetters + " + " + someNumber + " = " + result + "\nТип данных: " + typeof result);
result = someLetters * someNumber;
alert(someLetters + " * " + someNumber + " = " + result + "\nТип данных: " + typeof result);