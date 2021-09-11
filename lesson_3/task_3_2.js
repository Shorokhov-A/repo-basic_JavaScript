/*
С этого урока начинаем работать с функционалом интернет-магазина. Предположим, есть
сущность корзины. Нужно реализовать функционал подсчета стоимости корзины в
зависимости от находящихся в ней товаров.
Товары в корзине хранятся в массиве. Задачи:
a. Организовать такой массив для хранения товаров в корзине;
b. Организовать функцию countBasketPrice, которая будет считать стоимость корзины.
*/
function countCartPrice(cart) {
    let productQuantity = null;
    let productPrice = null;
    let totalPrice = null;
    for (item of cart) {
        productQuantity = item[1];
        productPrice = item[2];
        totalPrice += productQuantity * productPrice;
    }
    return totalPrice
}

var cart = [];
cart.push(["Intel Core i3-10105F OEM", 1, 7050]);
cart.push(["Corsair Vengeance LPX", 2, 3199]);
cart.push(["KFA2 GeForce GTX 1660", 1, 46999]);
alert(`Стоимость корзины: ${countCartPrice(cart)}`);
