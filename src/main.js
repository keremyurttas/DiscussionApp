import Vue from 'vue'
import App from './App.vue'
import './assets/index.css';
import VueRouter from 'vue-router'
import {routes} from './routes'
import firebase from 'firebase/app';
import VueResource from 'vue-resource'

Vue.use(VueResource)


Vue.config.productionTip = false
const firebaseConfig = {
  apiKey: "AIzaSyDdsugfb5maBzzc7UADH88ykmOsHbcMIh0",
  authDomain: "userdata-c16bc.firebaseapp.com",
  projectId: "userdata-c16bc",
  storageBucket: "userdata-c16bc.appspot.com",
  messagingSenderId: "386939086912",
  appId: "1:386939086912:web:bdedab2f85a970390c97a5"
};



firebase.initializeApp(firebaseConfig);
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode:"history"
})

router.beforeEach((to,from,next)=>{
  const requiresAuth=to.matched.some(record=>record.meta.requiresAuth);
  const isAuthanticated = firebase.auth().currentUser;
  if(requiresAuth&&!isAuthanticated){
    // alert("You must have logged in for look into discussion details")
    next("/discussions")
  }
  else{
    next();
  }
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
