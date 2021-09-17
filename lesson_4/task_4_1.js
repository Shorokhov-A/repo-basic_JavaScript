/*
Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999,
надо получить на выходе объект, в котором в соответствующих свойствах описаны единицы,
десятки и сотни. Например, для числа 245 надо получить следующий объект: {‘единицы’: 5,
‘десятки’: 4, ‘сотни’: 2}. Если число превышает 999, необходимо выдать соответствующее
сообщение с помощью console.log и вернуть пустой объект.
*/
function numberToObject(number) {
    let resultObj = {};
    if (number <= 999) {
        let units = number % 10;
        let tens = Math.floor(number % 100 / 10);
        let hundreds = Math.floor(number / 100);
        resultObj['единицы'] = units;
        resultObj['десятки'] = tens;
        resultObj['сотни'] = hundreds;
        return resultObj;
    }
    console.log(`Число ${number} превышает 999.`);
    return resultObj;
}

function numberToObject2(number) {
    let resultObj = {};
    if (number >= 0 && number <= 999) {
        let numStr = number.toString(),
            properties = ['единицы', 'десятки', 'сотни'];
        for (let i = numStr.length - 1, j = 0; i >= 0; i--, j++) {
            resultObj[properties[j]] = numStr[i];
        }
        return resultObj;
    }
    console.log(`Число ${number} выходит за пределы интервала от 0 до 999.`);
    return resultObj;
}

console.log(numberToObject(587));
console.log(numberToObject2(387));
