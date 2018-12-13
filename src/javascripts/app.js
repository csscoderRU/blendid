import './modules'

console.log(`app.js has loaded!`);

import Vue from 'vue';

import blank from '../blocks/_blank/blank.vue';


let App = new Vue({
  delimiters: ['${', '}'],
  components: {
    blank
  },
  mounted() {
    let vm = this;
    console.log('mounted');
  }
}).$mount('#app');

