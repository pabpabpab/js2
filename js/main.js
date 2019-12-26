'use strict';

const products = [
  {id: 1, title: 'Notebook', price: 20000, img: 'https://productimages.hepsiburada.net/s/24/1000-1480/10082375106610.jpg'},
  {id: 2, title: 'Mouse', price: 1500, img: 'https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX8729820.jpg'},
  {id: 3, title: 'Keyboard', price: 5000},
  {id: 4, title: 'Gamepad', price: 4500, img: 'http://dayforbuy.com/wa-data/public/shop/products/56/26/382656/images/697349/697349.970.png'},
];

const renderProduct = (title, price, img = 'https://p1.zoon.ru/e/a/5556314f40c0888f7a8bc554_5a791db3e818b.jpg') => {
  return `<div class="product-item">
            <h3>${title}</h3>
            <div class="productImg__wrapper"><img src="${img}" class="productImg"></div>
            <p class="product__price">${price} р</p>
            <a href="#" class="buy-btn">Добавить в корзину</a>
          </div>`;
};

const renderProducts = list => {
  const productList = list.map(product => renderProduct(product.title, product.price, product.img));
  document.querySelector('.products').innerHTML = productList.join('');
};

renderProducts(products);
