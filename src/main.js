import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './route'
import store from './store/index'
import { createProvider } from './vue-apollo'
import './index.css'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app")
