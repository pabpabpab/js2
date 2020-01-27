Vue.component('error', {

    template: `<div class="error" v-show="this.$root.errorObject.is">{{this.$root.errorObject.text}}</div>`

});