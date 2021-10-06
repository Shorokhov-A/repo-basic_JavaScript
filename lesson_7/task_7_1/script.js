//Здесь теперь чёрт ногу сломит. )
var cart = {
    products: [],
    totalPrice: 0,
    orderAddress: '',
    comment: '',
    // Метод подсчета стоимости корзины.
    // Данный метод работает со свойством totalPrice.
    countCartPrice: function (product, priceSum = true) {
        if (priceSum) {
            this.totalPrice += product.price;
        }
        else {
            this.totalPrice -= product.price;
        }
    },
    // Метод возврата товара в каталог. Нужен для реализации метода удаления товара из корзины.
    // Суть работы данного метода состоит в нахождении товара в каталоге по его ID и увеличения количества данного товара в каталоге на величину quantity.
    // sendToCat: function (prodId, quantity) {
    //     for (let product of catalog.products) {
    //         if (product.prodId == prodId) {
    //             product.quantity += quantity;
    //         }
    //     }
    // },
    // Метод получения товара из каталога. Нужен для реализации метода добавления товара в корзину.
    // Суть работы данного метода состоит в нахождении товара в каталоге по его ID и уменьшении количества данного товара в каталоге на величину quantity.
    getFromCat: function (prodId) {
        for (let product of catalog.products) {
            if (product.prodId == prodId) {
                return { ...product };
            }

        }
    },
    // Метод добавления товара в корзину.
    addProd: function (prodId) {
        let product = this.getFromCat(prodId); // Вызов метода получения товара из каталога.
        if (product) {
            this.products.push(product);
            this.countCartPrice(product, true); //Вызов метода подсчёта стоимости корзины.
            cartButton.innerText = `Корзина (${this.products.length})`;
        }
    },
    // Метод удаления товара из корзины.
    deleteProd: function (prodId) {
        for (let product of this.products) {
            if (product.prodId == prodId) {
                // this.sendToCat(prodId, product.quantity); //Вызов метода возврата товара в каталог.
                this.products.splice(this.products.indexOf(product), 1);
                this.countCartPrice(product, false); //Вызов метода подсчёта стоимости корзины.
                cartButton.innerText = `Корзина (${this.products.length})`;
            }
        }
    },
    // Метод вывода перечня товаров в корзине.
    cartShow: function () {
        const wrapper = document.querySelector('#wrapper');
        wrapper.innerHTML = '<div id="cart"></div>';
        const main = document.querySelector('#cart');
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
                <span><img src="img/${item.image[0]}"></span>
                <span><a href="#" onclick="cart.deleteProd(${item.prodId}); cart.cartShow();">Удалить</a></span>
                </div>`);
            }
        }
        if (this.orderAddress != 0) {
            main.insertAdjacentHTML('beforeend',
                `<div>
                    <h3>Адрес доставки:</h3>
                    <p>${this.orderAddress}<br></p>
                    <h3>Комментарий к заказу:</h3>
                    <p>${this.comment}<br></p>
                </div>`);
        }
        main.insertAdjacentHTML('beforeend',
            `<hr><div class="prod_item total">В корзине ${this.products.length} товаров на сумму ${this.totalPrice} рублей</div>`);
        main.insertAdjacentHTML('beforeend',
            `<div><a id="cart_next" href="#">Далее</a></div>`);
    },
    userAddress: function () {
        const wrapper = document.querySelector('#wrapper');
        wrapper.innerHTML = '<div id="cart"></div>';
        const main = document.querySelector('#cart');
        main.innerHTML = "";
        main.insertAdjacentHTML('beforeend', `<div><h3>Адрес доставки</h3></div>`);
        main.insertAdjacentHTML('beforeend', `<div class="prod_item"><textarea id="order_address"></textarea></div>`);
        main.insertAdjacentHTML('beforeend',
            `<hr><div class="prod_item total">В корзине ${this.products.length} товаров на сумму ${this.totalPrice} рублей</div>`);
        main.insertAdjacentHTML('beforeend',
            `<div><a id="cart_next" href="#">Далее</a></div>`);
    },
    orderComment: function () {
        const wrapper = document.querySelector('#wrapper');
        wrapper.innerHTML = '<div id="cart"></div>';
        const main = document.querySelector('#cart');
        main.innerHTML = "";
        main.insertAdjacentHTML('beforeend', `<div><h3>Комментарий к заказу</h3></div>`);
        main.insertAdjacentHTML('beforeend', `<div class="prod_item"><textarea id="order_comment"></textarea></div>`);
        main.insertAdjacentHTML('beforeend',
            `<hr><div class="prod_item total">В корзине ${this.products.length} товаров на сумму ${this.totalPrice} рублей</div>`);
        main.insertAdjacentHTML('beforeend',
            `<div><a id="cart_next" href="#">Далее</a></div>`);
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
        price: null,
        discount: null
    },
    // Объект "каталог", в котором реализовано свойство products и метод добавления товаров в каталог addProd.
    catalog = {
        products: [],
        addProd: function (product, quantity) {
            product.quantity = quantity;
            this.products.push(product);
        },
        catShow: function () {
            const wrapper = document.querySelector('#wrapper');
            wrapper.innerHTML = '<div id="catalog"></div>';
            const catalog = document.querySelector('#catalog');
            catalog.innerHTML = "";
            for (const item of this.products) {
                catalog.insertAdjacentHTML('beforeend',
                    `<div class="prod_item">
                    <div class="item">
                        <div class="image"><img src="img/${item.image[0]}" onclick="catalog.galleryShow('${item.image}');"></div>
                        <div class="description"><h4>${item.brand} ${item.model}</h4>
                            <div class="price">Цена: 
                                <span>${item.price}</span>
                            </div>
                        </div>
                    </div>
                    <div class="sale">
                        <span class='offer ${item.discount > 0 ? 'show' : ''}'>Скидка: ${item.discount}%</span>
                        <a href="#" onclick="cart.addProd(${item.prodId});">В корзину</a>
                    </div>
                </div>`);
            }
            wrapper.insertAdjacentHTML('beforeend', '<div class="gallery"></div>');
        },
        galleryShow: function (imgPath, idx = 0) {
            let pics = imgPath.split(',');
            if (idx > pics.length - 1) {
                idx = pics.length - 1;
            } else if (idx < 0) {
                idx = 0;
            }
            let i = idx,
                backIdx = idx - 1,
                forwardIdx = idx + 1;
            const gallery = document.querySelector('.gallery');
            gallery.style.display = "flex";
            gallery.innerHTML = `<div>
            <a href="#" onclick="catalog.galleryShow('${imgPath}', ${backIdx})"><<</a>
            <img src="img/${pics[i]}" alt="photo">
            <a href="#" onclick="catalog.galleryShow('${imgPath}', ${forwardIdx})">>></a>
            <a id="close-button" href="#" onclick="catalog.galleryHide();">x</a>
            </div>
            <div>${i + 1}/${pics.length}</div>`;
        },
        galleryHide: function () {
            const gallery = document.querySelector('.gallery');
            gallery.style.display = "none";
        }
    };

let product1 = {
    ...product,
    prodId: 156,
    category: "Компьютеры и комплектующие",
    subCategory: "Процессоры",
    brand: "Intel",
    model: "Core i3-10105F OEM",
    image: ["image1.jpg", "proc_image_1.jpg", "proc_image_2.jpg"],
    price: 7050,
    discount: 5
},
    product2 = {
        ...product,
        prodId: 132,
        category: "Компьютеры и комплектующие",
        subCategory: "Оперативная память",
        brand: "Corsair",
        model: "Vengeance LPX",
        image: ["image2.jpg", "dimm_image_1.jpg", "dimm_image_2.jpg", "dimm_image_3.jpg"],
        price: 3199
    },
    product3 = {
        ...product,
        prodId: 184,
        category: "Компьютеры и комплектующие",
        subCategory: "Видеокарты",
        brand: "KFA2",
        model: "GeForce GTX 1660",
        image: ["image3.jpg", "video_image_1.jpg", "video_image_2.jpg", "video_image_3.jpg", "video_image_4.jpg", "video_image_5.jpg"],
        price: 46999
    };

catalog.addProd(product1, 1);
catalog.addProd(product2, 2);
catalog.addProd(product3, 1);

function showCat() {
    catalog.catShow();
}

function showCart() {
    cart.cartShow();
    let submitButton = document.getElementById('cart_next');
    submitButton.addEventListener('click', getAddress);
}

function getAddress() {
    cart.userAddress();
    let submitButton = document.getElementById('cart_next');
    submitButton.addEventListener('click', getComment);
}

function getComment() {
    let address = document.getElementById("order_address");
    cart.orderAddress = address.value;
    cart.orderComment();
    let submitButton = document.getElementById('cart_next');
    submitButton.addEventListener('click', totalOrder);
}

function totalOrder() {
    let comment = document.getElementById("order_comment");
    cart.comment = comment.value;
    cart.cartShow();
}

function init() {
    catButton.addEventListener("click", showCat);
    cartButton.addEventListener("click", showCart);
    showCat();
}

let catButton = document.getElementById('cat_button');
let cartButton = document.getElementById('cart_button');
window.addEventListener('load', init);
