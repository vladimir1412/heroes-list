import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify/lib';
import router from './router';
import firebase from 'firebase';
import Toaster from 'v-toaster'

import 'v-toaster/dist/v-toaster.css'

Vue.use(Toaster, {timeout: 5000})
 
Vue.prototype.axios = axios;

Vue.config.productionTip = false;
Vue.config.performance = true;

Vue.use(Vuetify)

const firebaseConfig = {
  apiKey: "AIzaSyBjP2Mz8Fb9KGomrgb75Jv3LtKMLc5yJLg",
  authDomain: "heroes-2f0bc.firebaseapp.com",
  databaseURL: "https://heroes-2f0bc.firebaseio.com",
  projectId: "heroes-2f0bc",
  storageBucket: "heroes-2f0bc.appspot.com",
  messagingSenderId: "421959441737",
  appId: "1:421959441737:web:08e9a6089383d315870e98",
  measurementId: "G-08T55MWNFE"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');
