/*
Продолжить работу с интернет-магазином:
В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими объектами можно заменить их элементы?
Реализуйте такие объекты.
Перенести функционал подсчета корзины на объектно-ориентированную базу.
*/
var cart = {
    products: [],
    countCartPrice: function () {
        let initialValue = 0,
            totalPrice = this.products.reduce(
                (accumulator, currentValue) => accumulator + (currentValue.quantity * currentValue.price),
                initialValue
            );
        return totalPrice;
    }
},
    product1 = {
        category: "Процессор",
        brand: "Intel",
        model: "Core i3-10105F OEM",
        quantity: 1,
        price: 7050
    },
    product2 = {
        category: "Оперативная память",
        brand: "Corsair",
        model: "Vengeance LPX",
        quantity: 2,
        price: 3199
    },
    product3 = {
        category: "Видеокарта",
        brand: "KFA2",
        model: "GeForce GTX 1660",
        quantity: 1,
        price: 46999
    };

cart.products.push(product1);
cart.products.push(product2);
cart.products.push(product3);
console.log(cart);
alert(`Стоимость корзины: ${cart.countCartPrice()}`);

