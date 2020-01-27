const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        errorObject: {
            is: false,
            text: '',
        },
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.errorObject.is = true;
                    this.errorObject.text = 'Нет связи с сервером';
                })
        },
    },
    mounted() {
        console.log(this);
    }
});

