const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',

  data: {
    catalogUrl: '/catalogData.json',
    products: [ //товары с сервера
      {id_product: 1000001, price: 3000, product_name: 'ИБП'},
      {id_product: 1000002, price: 1000, product_name: 'Клавиатура'},
      {id_product: 1000003, price: 10000, product_name: 'Сканер'},
    ],
    filteredProducts: [], // отфильтрованные товары
    cartProducts: [], // товары в корзине
    imgCatalog: 'https://placehold.it/200x150',
    searchLine: '',
    isVisibleCart: false,
    //isEmptyCart: true,
  },

  methods: {
    getJson(url) {
      return fetch(url)
          .then(result => result.json())
          .catch(error => {
            console.log(error);
          });
    },

    addProduct(product) {
      if (this._getGoodIndex(product, this.cartProducts) === -1) this.cartProducts.push(product);
      this.isVisibleCart = true;
    },

    deleteProduct(product) {
      let goodIndex = this._getGoodIndex(product, this.cartProducts);
      if (goodIndex === -1) return;
      this.cartProducts.splice(goodIndex, 1);
      this.isVisibleCart = true;
    },

    _getGoodIndex(product, products) {
      return products.indexOf(product);
    },

    isEmptyCart() {
      return !Boolean(this.cartProducts.length);
    },

    calcTotalPrice() {
      return this.cartProducts.reduce((totalPrice, product) => totalPrice + product.price, 0);
    },

    filterGoods() {
      const regexp = new RegExp(this.searchLine, 'i');
      this.filteredProducts = this.products.filter(product => regexp.test(product.product_name));
    },

  },

  mounted() {
    this.getJson(`${API + this.catalogUrl}`)
        .then(data => {

          for (let el of data) {
            this.products.push(el);
          }

          this.filteredProducts = [...this.products];
        });
  },

});
