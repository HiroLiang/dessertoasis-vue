import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

//引入 Font Awesome icon 圖案 (以下為免費全部可使用的圖庫)
// 安裝參考:https://fontawesome.com/docs/web/use-with/vue/
// 圖庫:https://fontawesome.com/search，選擇圖片下方選vue.js，複製貼上
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import naive from 'naive-ui'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(naive)


library.add(fas, fab, far)


app.component("font-awesome-icon", FontAwesomeIcon).mount('#app')
