'use strict';



class CheckForm {
    constructor(name, submitBtnName, elementsToCheck) {
        this.name = name;//атрибут name формы
        this.submitBtnName = submitBtnName;//атрибут name кнопки submit на которую навесить событие
        this.elementsToCheck = [...elementsToCheck];//элементы формы для проверки
        this._eventListener();
    }



    _checkElement(elemName) {
        //такой селектор на случай если есть разные формы на странице, а имена полей одинаковые
        let elem = document.querySelector(`[name="${this.name}"] [name="${elemName}"]`);
        let regExp;
        switch(elemName)  {
            case 'userName':
                regExp = /^\s*[a-zA-Zа-яА-Я\s]+\s*$/;
                break;
            case 'userPhone':
                regExp = /^\s*\+\s*7\s*\(\d{3}\)\s*\d{3}\s*-\s*\d{4}\s*$/; //+7(000)000-0000
                break;
            case 'userEmail':
                regExp = /^\s*[a-zA-Z]+[\.-]?[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]{2,18}\s*$/;
                break;
            case 'message':
                regExp = /^\s*.+\s*$/;
                break;
        }
        let checkResult = regExp.test(elem.value);
        this._highlight(elem, checkResult);
    }


    _highlight(elem, checkResult) {
        if (!checkResult)
            elem.classList.add("warning");
        else if (elem.classList.contains("warning"))
            elem.classList.remove("warning");
    }




    _eventListener() {
        //такой селектор на случай если есть разные формы на странице, а имена полей одинаковые
        let elem = document.querySelector(`[name="${this.name}"] [name="${this.submitBtnName}"]`);

        elem.addEventListener('click', event => {
            this._eventHandler(event);
        });
    }


    _eventHandler(event) {
        event.preventDefault();

        for (let elemName of this.elementsToCheck) {
            this._checkElement(elemName);
        }
    }

}





let elementsToCheck = ['userName', 'userPhone', 'userEmail', 'message'];
const checkForm = new CheckForm('feedbackForm', 'submitBtn', elementsToCheck);

