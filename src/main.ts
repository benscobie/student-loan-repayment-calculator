import Vue from 'vue';
import VueCurrencyInput from 'vue-currency-input';
import App from './App.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.css';

Vue.config.productionTip = false;

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

Vue.mixin({
  methods: {
    formatMoney: (str) => `£${str.toFixed(2)}`,
  },
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
