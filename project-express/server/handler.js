const fs = require('fs');
const cart = require('./cart');

const actions = {
    add: cart.add,
    change: cart.change,
};







const handler = (req, res, action, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            try {
                let objData = JSON.parse(data);
                let newCart, newQuantity;
                [newCart, newQuantity] = actions[action](objData, req);
                fs.writeFile(file, newCart, (err) => {
                    if (err) {
                        res.send('{"result": 0}');
                    } else {
                        res.send(`{"result": 1, "newQuantity": ${newQuantity}}`); //передать в браузер реальное кол-во товара
                    }
                })

            } catch (e) {
                res.send('{"result": 0}');
                console.log('Ошибка обработки json-строки из файла корзины.');
            }
        }
    });
};

module.exports = handler;
