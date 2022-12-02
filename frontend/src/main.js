import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
// import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';


const app = createApp(App)

app.use(router)
// app.use(BootstrapIconsPlugin);

app.mount('#app')


