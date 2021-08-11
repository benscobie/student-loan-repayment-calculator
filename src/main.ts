import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.css';

const myMixin = {
  methods: {
    formatMoney: (str: number) => `£${str.toFixed(2)}`,
  },
};

const app = createApp(App, {
  mixins: [myMixin],
});

app.mixin({
  methods: {
    formatMoney: (str: number) => `£${str.toFixed(2)}`,
  },
});

app.use(router).mount('#app');
