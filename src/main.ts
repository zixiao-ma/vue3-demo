import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import antd from '../node_modules/ant-design-vue'
import '@/styles/index.css'
import 'ant-design-vue/dist/antd.css';
const app = createApp(App)
import iconAll from "@/utils/iconAll";
app.use(store).use(router).use(antd).use(iconAll).mount('#app')

