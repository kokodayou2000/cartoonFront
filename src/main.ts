import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import { VueSignaturePad } from 'vue-signature-pad'
import App from './App.vue'
import router from './router'

import './style/tailwind.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.component('VueSignaturePad', VueSignaturePad)
app.mount('#app')
