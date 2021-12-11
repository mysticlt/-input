import { createApp } from 'vue'
import { useElementPlus } from "../src/plugins/element-plus";
import 'element-plus/dist/index.css'
import App from './App.vue'
const app = createApp(App);
app
.use(useElementPlus)
app.mount("#app")
