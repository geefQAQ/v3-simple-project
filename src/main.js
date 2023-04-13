import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { vant, vxeTable} from './lib';

import './assets/main.css';
import "amfe-flexible/index.js";

const app = createApp(App);
app.use(vant).use(vxeTable).use(router).mount('#app');