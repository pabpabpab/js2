const stat = require('./stat');


const add = (cart, req) => {
    cart.contents.push(req.body);

    //статистика (добавление нового товара)
    stat(req.body, 'add new product');

    let newQuantity = 1;
    return [JSON.stringify(cart, null, 4), newQuantity];
};


const change = (cart, req) => {
    const find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    let newQuantity = find.quantity;


    if (newQuantity < 1) cart = remove(cart, find); //удаление продукта из корзины


    //статистика (изменение кол-ва товара)
    if (newQuantity > 0)
    if (req.body.quantity > 0)
        stat(find, 'add one more');
    else
        stat(find, 'remove one');


    return [JSON.stringify(cart, null, 4), newQuantity];
};


const remove = (cart, product) => {
    let index = cart.contents.indexOf(product);
    cart.contents.splice(index, 1);

    //статистика (окончательно удаление товара)
    stat(product, 'remove product finally');

    return cart;
};


module.exports = {
    add,
    change,
};
