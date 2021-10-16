import Vue from 'vue'
import App from './App.vue'

import "./assets/global.css"; // optional import of global css stylesheet

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
