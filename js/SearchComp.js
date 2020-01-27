Vue.component('search', {
    data(){
        return {
            userSearch: '',

            //productsAPI: this.$root.$refs.products,
            //через эту переменную, далее productsAPI.filter() не работает
            //работает только так $root.$refs.products.filter() , и если поставить слева this, тоже не работает
        };
    },


    template: `<form action="#" class="search-form" @submit.prevent="$root.$refs.products.filter()">
                <input type="text" class="search-field" v-model="userSearch">
                <button class="btn-search" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </form>`


});