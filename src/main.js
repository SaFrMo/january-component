import Vue from 'vue'
import App from './App'
import AnimatingLogo from '@/components/AnimatingLogo'

Vue.config.productionTip = false

// components
Vue.component('animating-logo', AnimatingLogo)

/* eslint-disable no-new */
new Vue({
	el: '#app',
	render: h => h(App)
})
