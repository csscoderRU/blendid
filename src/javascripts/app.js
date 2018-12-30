import './modules'

console.log(`app.js has loaded!`);

import Vue from 'vue';

import blank from '../blocks/_blank/blank.vue';

// svg sprite for IE browser
import svg4everybody from "svg4everybody";


let App = new Vue({
  delimiters: ['${', '}'],
  components: {
    blank
  },
  mounted() {
    let vm = this;
    console.log('mounted');
    svg4everybody();
  }
}).$mount('#app');

