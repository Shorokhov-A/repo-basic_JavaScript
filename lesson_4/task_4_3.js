/*
Подумать над глобальными сущностями. К примеру, сущность «Продукт» в
интернет-магазине актуальна не только для корзины, но и для каталога. Стремиться нужно к
тому, чтобы объект «Продукт» имел единую структуру для различных модулей сайта, но в
разных местах давал возможность вызывать разные методы.
*/
var cart = {
    products: [],
    totalPrice: 0,
    // Метод подсчета стоимости корзины.
    // Данный метод работает со свойством totalPrice.
    countCartPrice: function (product, priceSum = true) {
        if (priceSum) {
            this.totalPrice += product.quantity * product.price;
        }
        else {
            this.totalPrice -= product.quantity * product.price;
        }
    },
    // Метод возврата товара в каталог. Нужен для реализации метода удаления товара из корзины.
    // Суть работы данного метода состоит в нахождении товара в каталоге по его ID и увеличения количества данного товара в каталоге на величину quantity.
    sendToCat: function (prodId, quantity) {
        for (let product of catalog.products) {
            if (product.prodId == prodId) {
                product.quantity += quantity;
            }
        }
    },
    // Метод получения товара из каталога. Нужен для реализации метода добавления товара в корзину.
    // Суть работы данного метода состоит в нахождении товара в каталоге по его ID и уменьшении количества данного товара в каталоге на величину quantity.
    getFromCat: function (prodId, quantity) {
        for (let product of catalog.products) {
            if (product.prodId == prodId) {
                if (product.quantity >= quantity) {
                    product.quantity -= quantity;
                    return { ...product, quantity: quantity };
                }
                else {
                    alert(`Заказ товара ${product.brand} ${product.model} невозможен.\nКоличество доступных для заказа позиций: ${product.quantity}`);
                    return false;
                }
            }
        }
    },
    // Метод добавления товара в корзину.
    addProd: function (prodId, quantity) {
        if (quantity > 0) {
            let product = this.getFromCat(prodId, quantity); // Вызов метода получения товара из каталога.
            if (product) {
                this.products.push(product);
                this.countCartPrice(product, true); //Вызов метода подсчёта стоимости корзины.
            }
        }
    },
    // Метод удаления товара из корзины.
    deleteProd: function (prodId) {
        for (let product of this.products) {
            if (product.prodId == prodId) {
                this.sendToCat(prodId, product.quantity); //Вызов метода возврата товара в каталог.
                this.products.splice(this.products.indexOf(product), 1);
                this.countCartPrice(product, false); //Вызов метода подсчёта стоимости корзины.
            }
        }
    }
},
    // Объект "продукт". Можно дополнить его различными свойствами: характеристики, описание, изображение...
    product = {
        prodId: null,
        category: null,
        subCategory: null,
        brand: null,
        model: null,
        quantity: null,
        price: null
    },
    // Объект "каталог", в котором реализовано свойство products и метод добавления товаров в каталог addProd.
    catalog = {
        products: [],
        addProd: function (product, quantity) {
            product.quantity = quantity;
            this.products.push(product);
        }
    };

let product1 = {
    ...product,
    prodId: 156,
    category: "Компьютеры и комплектующие",
    subCategory: "Процессоры",
    brand: "Intel",
    model: "Core i3-10105F OEM",
    price: 7050
},
    product2 = {
        ...product,
        prodId: 132,
        category: "Компьютеры и комплектующие",
        subCategory: "Оперативная память",
        brand: "Corsair",
        model: "Vengeance LPX",
        price: 3199
    },
    product3 = {
        ...product,
        prodId: 184,
        category: "Компьютеры и комплектующие",
        subCategory: "Видеокарты",
        brand: "KFA2",
        model: "GeForce GTX 1660",
        price: 46999
    };

// Следующими командами для наглядности лучше оперировать в консоли.

catalog.addProd(product1, 1);
catalog.addProd(product2, 2);
catalog.addProd(product3, 1);
console.log(catalog);
cart.addProd(132, 2);
console.log(catalog);
console.log(cart);
cart.addProd(184, 1);
console.log(catalog);
console.log(cart);
// cart.deleteProd(184);
// console.log(catalog);
// console.log(cart);
