const product = {
    plainBurger: {
        name: "Гамбургер простой",
        price: 10000,
        kcall: 500,
        amount: 0,
        get Summ() {
            return this.amount * this.price
        },
        get Kcall() {
            return this.amount * this.kcall
        }
    },
    freshBurger: {
        name: "Гамбургер FRESH",
        price: 20500,
        kcall: 500,
        amount: 0,
        get Summ() {
            return this.amount * this.price
        },
        get Kcall() {
            return this.amount * this.kcall
        }
    },
    freshCombo: {
        name: "FRESH COMBO",
        price: 31900,
        kcall: 500,
        amount: 0,
        get Summ() {
            return this.amount * this.price
        },
        get Kcall() {
            return this.amount * this.kcall
        }
    }
}

const extraProduct = {
    doubleMayonnaise: {
        name: "Двойной майонез",
        price: 300,
        kcall: 30,
        amount: 0
    },
    lettuce: {
        name: "Салатный лист",
        price: 300,
        kcall: 30,
        amount: 0
    },
    cheese: {
        name: "Сыр",
        price: 300,
        kcall: 30,
        amount: 0
    }
}

const plusOrMinus = document.querySelectorAll('.main__product-btn');

for (let i = 0; i < plusOrMinus.length; i++) {
    plusOrMinus[i].addEventListener('click',function () {  
        seperate(this)
    })
}

function seperate(element) {
    const parent = element.closest('.main__product')
    const parentId = parent.getAttribute('id')
    const elData = element.getAttribute('data-symbol')
    if (elData == '+' && product[parentId].amount < 10) {
        product[parentId].amount++
    } else if (elData == '-' && product[parentId].amount > 0) {
        product[parentId].amount--
    }
    const out = parent.querySelector('.main__product-num');
    const totalPrice = parent.querySelector('.main__product-price span');
    const totalKcall = parent.querySelector('.main__product-kcall span');
    out.innerHTML = product[parentId].amount
    totalPrice.innerHTML = product[parentId].Summ
    totalKcall.innerHTML = product[parentId].Kcall
}

const newProducts = document.querySelectorAll('.main__product-checkbox');
for (let i = 0; i < newProducts.length; i++) {
    newProducts[i].addEventListener('click',function () {  
        addNewProducts(this)
    })
}

function addNewProducts(element) {
    const parent = element.closest('.main__product')
    const parentId = parent.getAttribute('id')
    const elData = element.getAttribute('data-extra')
    product[parentId][elData] = element.checked
    if (product[parentId][elData] === true) {
        product[parentId].price += extraProduct[elData].price
        product[parentId].kcall += extraProduct[elData].kcall
    } else {
        product[parentId].price -= extraProduct[elData].price
        product[parentId].kcall -= extraProduct[elData].kcall    
    }
    const totalPrice = parent.querySelector('.main__product-price span');
    const totalKcall = parent.querySelector('.main__product-kcall span');
    totalPrice.innerHTML = product[parentId].Summ
    totalKcall.innerHTML = product[parentId].Kcall
}

// --- вывод общей стоимости товаров
// подключаемся к кнопке 'заказать' 
const addCart = document.querySelector('.addCart');
// подключаемся к кнопке 'модальному окну'  
const receipt = document.querySelector('.receipt');
// подключаемся к кнопке 'чеку' 
const receiptWindow = document.querySelector('.receipt__window');
// подключаемся к кнопке 'описанию чека' 
const receiptOut = document.querySelector('.receipt__window-out');
// подключение к кнопке чека
const receiptBtn = document.querySelector('.receipt__window-btn');

// вывод общей стоимости
let totalName = "";
let totalPrice = 0;
let totalKcall = 0;
let arrayProduct = [];

addCart.addEventListener('click',function () {  
    for (const key in product) {
        // po - это один обьект продукта
        const po = product[key]
        // проверяем количество выбранного продукта 
        if (po.amount > 0) {
            // в массив добавляем выбранный продукт
            arrayProduct.push(po)
            for (const infoKey in po) {
                if (po[infoKey] === true) {
                    // \n - перенос на след. строку
                    // добавляем название иншнридиента
                    po.name += "\n" + extraProduct[infoKey].name
                }
            }
        }
        po.price = po.Summ
        po.kcall = po.Kcall
        // console.log(arrayProduct);
    }

    // Перебираем выбранные товары
    for (let i = 0; i < arrayProduct.length; i++) {
        const el = arrayProduct[i];
        totalPrice += el.price;
        totalKcall += el.kcall;
        totalName += `\n ${el.name} \n `
        
        
    }
    receiptOut.innerHTML = `Вы купили: ${totalName} \nКалорийность${totalKcall} \nСтоимость покупки: ${totalPrice}сумм`
    receipt.style.display = "flex"
    setTimeout(() => {
        receipt.style.opacity = "1"
        receiptWindow.style.top = "0"
    }, 100);
    document.body.style.overflow = 'hidden'
    // console.log(receipt);
})

const pict = document.querySelectorAll('.main__product-info');
for (let i = 0; i < pict.length; i++) {
    pict[i].addEventListener('dblclick',function () {  
        extand(this)
    })
}
function extand(element) {
    const parent = element.closest('.main__product')
    const parentId = parent.getAttribute('id')
    // console.log(parentId);
    const pictSrc = parent.querySelector('.main__product-info img');
    // console.log(pictSrc);
    const source = pictSrc.getAttribute('src')
    const viewImg = document.querySelector('.view img');
    // console.log(source);
    const view = document.querySelector('.view');
    viewImg.setAttribute('src', source)
    console.log(view);
    view.classList.add('active')
    document.body.style.overflow = 'hidden'
    const close = document.querySelector('.close');
    close.addEventListener('click',function () {  
    view.classList.remove('active')
    document.body.style.overflow = 'auto'
})
}





// ссылка на объект
/* let a = { name: "Вася" };
let b = a;
console.log(a);
console.log(b);
b.name = "Петя"
console.log(a);
console.log(b); */