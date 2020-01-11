'use strict';

class Hamburger {
    constructor(title = 'small', initialPrice = 50, initialCalories = 20) {
        this.title = title;
        this.initialPrice = initialPrice;
        this.initialCalories = initialCalories;
        this.stuffing = []; //array of objects of stuffing
        this.topping = []; //array of objects of toppings
        this.render();
    }

    addStuffing(stuffing = {title: 'cheese', price: 10, calories: 20}) {
        return this.stuffing.push(stuffing); //returns the new length of array of objects of stuffing
    }

    addTopping(topping = {title: 'seasoning', price: 15, calories: 0}) {
        return this.topping.push(topping);  //returns the new length of array of objects of toppings
    }

    _calcTotalComponent(componentsArray, component) {
        return componentsArray.reduce((total, currentItem) => total + currentItem[component], 0);
    }

    calcTotalPrice() {
        let totalStuffingPrice = this._calcTotalComponent(this.stuffing, 'price');
        let totalToppingPrice = this._calcTotalComponent(this.topping, 'price');
        return this.initialPrice + totalStuffingPrice + totalToppingPrice;
    }

    calcTotalCalories() {
        let totalStuffingCalories = this._calcTotalComponent(this.stuffing, 'calories');
        let totalToppingCalories = this._calcTotalComponent(this.topping, 'calories');
        return this.initialCalories + totalStuffingCalories + totalToppingCalories;
    }





    _renderTotalTitle = hamburger => `<div class="hamburger__total_title">   
        ${hamburger.title} hamburger, calories ${hamburger.initialCalories}, rubles ${hamburger.initialPrice} 
        </div>`;

    _renderStuffingItem = stuffing => `<div class="hamburger__total_item">
        ${stuffing.title} stuffing, calories ${stuffing.calories}, rubles ${stuffing.price} 
        </div>`;

    _renderTotalStuffing = list => {
        if (this.stuffing.length === 0) return '';
        const stuffingList = list.map(stuffing => this._renderStuffingItem(stuffing));
        return `<div class="hamburger__total_section">Stuffing: ${stuffingList.join('')}</div>`;
    };

    _renderToppingItem = topping => `<div class="hamburger__total_item">
        ${topping.title} topping, calories ${topping.calories}, rubles ${topping.price} 
        </div>`;

    _renderTotalTopping = list => {
        if (this.topping.length === 0) return '';
        const toppingList = list.map(topping => this._renderToppingItem(topping));
        return `<div class="hamburger__total_section">Topping: ${toppingList.join('')}</div>`;
    };

    render() {
        const html = `<div class="hamburger__total">
            ${this._renderTotalTitle(this)}
            ${this._renderTotalStuffing(this.stuffing)}
            ${this._renderTotalTopping(this.topping)}
            <div class="hamburger__total_total">
                <div class="hamburger__total_price">Total calories: ${this.calcTotalCalories()}</div>
                <div class="hamburger__total_price">Total price: ${this.calcTotalPrice()}</div>   
            </div>         
            </div>`;
        document.querySelector('.hamburger').insertAdjacentHTML('beforeend', html);
    }
}









class Menu {

    constructor() {
        this._render();
    }


    _typesOfHamburgers = [
        {title: 'small', price: 50, calories: 20},
        {title: 'big', price: 100, calories: 40}
    ];

    _typesOfStuffing = [
        {title: 'cheese', price: 10, calories: 20},
        {title: 'salad', price: 20, calories: 5},
        {title: 'potato', price: 15, calories: 10}
    ];

    _typesOfTopping = [
        {title: 'seasoning', price: 15, calories: 0},
        {title: 'mayonnaise', price: 20, calories: 5}
    ];





    _renderButtonOfHamburger = hamburger => `<button 
        data-hamburger-title="${hamburger.title}" 
        data-hamburger-price="${hamburger.price}" 
        data-hamburger-calories="${hamburger.calories}">   
        ${hamburger.title} hamburger<br>
        ${hamburger.calories} calories<br>
        ${hamburger.price} rubles
        </button>`;

    _renderSectionOfHamburgers = list => {
        const buttonList = list.map(hamburger => this._renderButtonOfHamburger(hamburger));
        return `<div class="section">Create hamburger: ${buttonList.join('')}</div>`;
    };

    _renderButtonOfStuffing = stuffing => `<button 
        data-stuffing-title="${stuffing.title}" 
        data-stuffing-price="${stuffing.price}" 
        data-stuffing-calories="${stuffing.calories}">   
        ${stuffing.title} stuffing<br>
        ${stuffing.calories} calories<br>
        ${stuffing.price} rubles   
        </button>`;

    _renderSectionOfStuffing = list => {
        const buttonList = list.map(stuffing => this._renderButtonOfStuffing(stuffing));
        return `<div class="section">Add stuffing: ${buttonList.join('')}</div>`;
    };

    _renderButtonOfTopping = topping => `<button 
        data-topping-title="${topping.title}" 
        data-topping-price="${topping.price}" 
        data-topping-calories="${topping.calories}">   
        ${topping.title} topping<br>
        ${topping.calories} calories<br>
        ${topping.price} rubles   
        </button>`;

    _renderSectionOfTopping = list => {
        const buttonList = list.map(topping => this._renderButtonOfTopping(topping));
        return `<div class="section">Add topping: ${buttonList.join('')}</div>`;
    };

    _render() {
        const html = `<div class="hamburger">
        <div class="hamburger__header">Hamburger</div>
        ${this._renderSectionOfHamburgers(this._typesOfHamburgers)}
        ${this._renderSectionOfStuffing(this._typesOfStuffing)}
        ${this._renderSectionOfTopping(this._typesOfTopping)}        
        </div>`;

        document.querySelector('body').insertAdjacentHTML('beforeend', html);
    };



    deleteHamburgerTotal() {
        const total = document.querySelector('.hamburger__total');
        if (total) total.remove();
    }
}








//catch events on the hamburger menu container
function eventListener() {
    let elem = document.querySelector('.hamburger');

    elem.addEventListener('click', event => {
        eventHandler(event);
    });
}







function eventHandler(event) {
    switch (true) {
        case (Boolean(event.target.dataset.hamburgerTitle)):
            menu.deleteHamburgerTotal();
            const hamburgerTitle = event.target.dataset.hamburgerTitle;
            const hamburgerPrice = +event.target.dataset.hamburgerPrice;
            const hamburgerCalories = +event.target.dataset.hamburgerCalories;
            hamburger = new Hamburger(hamburgerTitle, hamburgerPrice, hamburgerCalories);
            break;
        case (Boolean(event.target.dataset.stuffingTitle)):
            if (!hamburger.title) return;
            menu.deleteHamburgerTotal();
            const stuffingTitle = event.target.dataset.stuffingTitle;
            const stuffingPrice = +event.target.dataset.stuffingPrice;
            const stuffingCalories = +event.target.dataset.stuffingCalories;
            hamburger.addStuffing({title: stuffingTitle, price: stuffingPrice, calories: stuffingCalories});
            hamburger.render();
            break;
        case (Boolean(event.target.dataset.toppingTitle)):
            if (!hamburger.title) return;
            menu.deleteHamburgerTotal();
            const toppingTitle = event.target.dataset.toppingTitle;
            const toppingPrice = +event.target.dataset.toppingPrice;
            const toppingCalories = +event.target.dataset.toppingCalories;
            hamburger.addTopping({title: toppingTitle, price: toppingPrice, calories: toppingCalories});
            hamburger.render();
            break;
    }
}





const menu = new Menu();
let hamburger = {};
eventListener();




