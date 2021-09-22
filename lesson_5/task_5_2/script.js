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
    },
    // Метод вывода перечня товаров в корзине.
    cartShow: function () {
        const main = document.querySelector('#main');
        let emptyBasket = '<p>Ваша корзина пуста</p>';
        main.innerHTML = "";
        if (this.products == 0) {
            main.insertAdjacentHTML('beforeend', `<div class="prod_item total">${emptyBasket}</div>`);
        } else {
            for (const item of this.products) {
                main.insertAdjacentHTML('beforeend',
                    `<div class="prod_item">
                <span>Товар - ${item.brand} ${item.model}</span> 
                <span>Цена товара - ${item.price} руб</span>
                <span>Количество - ${item.quantity}</span>
                <span><img src="${item.image}"></span>
                </div>`);
            }
        }
        main.insertAdjacentHTML('beforeend',
            `<hr><div class="prod_item total">В корзине ${this.products.length} товаров на сумму ${this.totalPrice} рублей</div>`);
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
        image: null,
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
    image: "img/image1.jpg",
    price: 7050
},
    product2 = {
        ...product,
        prodId: 132,
        category: "Компьютеры и комплектующие",
        subCategory: "Оперативная память",
        brand: "Corsair",
        model: "Vengeance LPX",
        image: "img/image2.jpg",
        price: 3199
    },
    product3 = {
        ...product,
        prodId: 184,
        category: "Компьютеры и комплектующие",
        subCategory: "Видеокарты",
        brand: "KFA2",
        model: "GeForce GTX 1660",
        image: "img/image3.jpg",
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
// console.log(catalog);
// console.log(cart);
// cart.deleteProd(184);
// console.log(catalog);
// console.log(cart);

cart.cartShow();
