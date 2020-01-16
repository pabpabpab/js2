'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


//========================================<промисифицировать getRequest>======================================
let getRequest = (url) => {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          reject('Error');
        } else {
          resolve(xhr.responseText);
        }
      }
    };
    xhr.send();
  });
};


getRequest(`${API}/catalogData.json`)
    .then(result => JSON.parse(result))
    .then(result => console.log(result))
    .catch(error => {
      console.log(error);
    });

//========================================</промисифицировать getRequest>======================================





//=============================================<class ProductList>=============================================
class ProductList {

  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    this._getProducts()
        .then(data => {
          this.goods = [...data];;
          this.render();
        });
  }


  _getProducts() {
    return fetch(`${API}/catalogData.json`)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        });
  }


  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const productObject = new ProductItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
    block.insertAdjacentHTML('beforebegin', '<div class="products__header">Список товаров</div>');
  }


  //выдать данные товара для корзины по кнопке Купить
  getGoodsItem(id_product) {
    let index = this._getGoodIndexById(id_product);
    return this.goods[index];
  }


  _getGoodIndexById(id_product) {
    //return this.goods.indexOf(`id_product: ${id_product}`);//это не работает, я не знаю как с помощью indexof делать поиск в массиве объектов

    let index = -1;
    for (let i = 0; i < this.goods.length; i++) {
      if (id_product === this.goods[i].id_product) {
        index = i;
        break;
      }
    }
    return index;
  }

}
//=============================================</class ProductList>=============================================




//=============================================<class ProductItem>=============================================
class ProductItem {

  constructor(product, img = 'https://placehold.it/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p class="product__price">${this.price} \u20bd</p>
                    <button data-buy-id="${this.id}" class="buy-btn">Купить</button>
                </div>
            </div>`;
  }
}
//=============================================</class ProductItem>=============================================




//==================================================<class Cart>================================================
class Cart {

  constructor(container = '.cart') {
    this.container = container;
    this.goods = [];
  }

  addProduct(product, img = 'https://placehold.it/200x150') {
    if (!product.img) product.img = img;
    if (this._getGoodIndexById(product.id_product) !== -1) return;
    return this.goods.push(product);
  }



  deleteProduct(id_product) {
    let index = this._getGoodIndexById(id_product);
    return this.goods.splice(index, 1);
  }



  _getGoodIndexById(id_product) {
    //return this.goods.indexOf(`id_product: ${id_product}`);//это не работает, я не знаю как с помощью indexof делать поиск в массиве объектов

    let index = -1;
    for (let i = 0; i < this.goods.length; i++) {
      if (id_product === this.goods[i].id_product) {
        index = i;
        break;
      }
    }
    return index;
  }



  _renderProduct = product => `<div class="product-item" data-id="${product.id_product}">
                <img src="${product.img}" alt="Some img">
                <div class="desc">
                    <h3>${product.product_name}</h3>
                    <p class="product__price">${product.price} \u20bd</p>
                    <button data-delete-id="${product.id_product}" class="delete-btn">Удалить</button>
                </div>
            </div>`;




  render() {
    const block = document.querySelector(this.container);
    block.innerHTML = '';


    if (this.goods.length === 0) return block.insertAdjacentHTML('beforeend', 'Корзина пуста');;


    const productList = this.goods.map(good => this._renderProduct(good));
    const html = `Корзина <div class="cart__content">${productList.join('')}</div>`;


    block.insertAdjacentHTML('beforeend', html);
    block.insertAdjacentHTML('beforeend', this.renderTotalPrice());
  }






  _calcTotalPrice = goods => goods.reduce((total, currentItem) => total + currentItem.price, 0);

  renderTotalPrice() {
    return `<div class="products__totalPrice">Total price: ${this._calcTotalPrice(this.goods)} \u20bd</div>`;
  }

}
//==================================================</class Cart>================================================







function eventListener() {
  let elem = document.querySelector('body');

  elem.addEventListener('click', event => {
    eventHandler(event);
  });
}




//event handler
function eventHandler(event) {
  switch (true) {
    case (Boolean(event.target.dataset.buyId)):
      const good = catalog.getGoodsItem(+event.target.dataset.buyId);
      cart.addProduct(good);
      cart.render();
      break;
    case (Boolean(event.target.dataset.deleteId)):
      cart.deleteProduct(+event.target.dataset.deleteId);
      cart.render();
      break;
  }
}




const catalog = new ProductList();
let cart = new Cart();
eventListener();







