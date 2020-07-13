import Vue from 'nativescript-vue'
import VueDevtools from 'nativescript-vue-devtools'
import routes from "./routes";


// import FontIcon from 'nativescript-vue-fonticon';
// import './app.scss';

// Vue.use(FontIcon,{
//     debug: true,
//     paths: {
//         fa: './assets/styles/font-awesome.css'
//     }
// });
import Pager from 'nativescript-accordion/vue'
Vue.use(Pager)

import {Feedback} from 'nativescript-feedback';
Vue.prototype.$feedback = new Feedback();

import {LoadingIndicator} from '@nstudio/nativescript-loading-indicator';
Vue.prototype.$loadingindicator = new LoadingIndicator();

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}

import store from './store'

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.registerElement(
  'RadSideDrawer',
  () => require('nativescript-ui-sidedrawer').RadSideDrawer
)

new Vue({
  store,
  render: h => h('frame', [h(routes.login)])
}).$start()
