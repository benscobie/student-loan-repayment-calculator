import Vue from 'vue';
import VueCurrencyInput from 'vue-currency-input';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueCurrencyInput, {
  globalOptions: {
    currency: null,
    precision: 0,
    allowNegative: false,
    distractionFree: {
      hideGroupingSymbol: false,
      hideCurrencySymbol: true,
      hideNegligibleDecimalDigits: true,
    },
  },
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
