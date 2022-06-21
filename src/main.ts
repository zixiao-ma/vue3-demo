import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// @ts-ignore
import antd from '../node_modules/ant-design-vue'
import '@/styles/index.css'
import 'ant-design-vue/dist/antd.css';
createApp(App).use(store).use(router).use(antd).mount('#app')
