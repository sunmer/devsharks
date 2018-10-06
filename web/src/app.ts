import Vue from "vue";
import { sync } from "vuex-router-sync";
import VeeValidate from 'vee-validate';
import App from "./App.vue";
import router from "./router";
import store from "./stores/store";

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(VeeValidate);

sync(store, router);

new Vue({
  el: "#app",
  router: router,
  store: store,
  template: '<App />',
  components: { App }
});