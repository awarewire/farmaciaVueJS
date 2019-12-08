import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import "./assets/css/adminlte.min.css"

Vue.use(BootstrapVue);

Vue.directive('uppercase', {
  update (el) {
    el.value = el.value.toUpperCase()
  },
});

new Vue({
  el: '#app',
  render: h => h(App)
});
