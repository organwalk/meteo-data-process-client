import { createApp } from 'vue'
import App from './App.vue'
import { pinia } from '@/stores'
import router from '@/router'
import buttonAutoLoseFocus from '@/config/button-auto-lose-focus'
import { ElLoadingDirective } from 'element-plus'
import 'element-plus/theme-chalk/el-loading.css'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(buttonAutoLoseFocus)
app.directive('loading', ElLoadingDirective)
app.mount('#app')
