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

import { ref, createApp } from 'vue'
import { createPinia } from 'pinia'
import naive from 'naive-ui'

import vue3GoogleLogin from 'vue3-google-login'
const CLIENT_ID = "159356890132-eqq8r76bgodqlmq0oajjgibkva6rjfn7.apps.googleusercontent.com"

import App from './App.vue'
import router from './router'
import { reqUserPermission } from "./api";

const isLogin = ref(false)
const isAdmin = ref(false)
const isTeacher = ref(false)

async function checkIsLogin() {
    try {
        const response = await reqUserPermission()
        const permission = response.data
        isLogin.value = permission === "User is an admin" || permission === "User is a teacher" || permission === "User is a regular user"
        isAdmin.value = permission === "User is an admin";
        isTeacher.value = permission === "User is a teacher";

    } catch (error) {
        console.error('Error checking user permission:', error)
        isLogin.value = false
        isAdmin.value = false
    }
}

router.beforeEach(async (to, from, next) => {
    await checkIsLogin()


    if (!isLogin.value && to.path === '/cms') {//沒登入無法進入/cms頁面，會導向login頁面。除了cms都可以進入。
        next({ name: 'logIn' })
    } else if (!isLogin.value && to.path === '/recipes/createrecipe') {
        alert('請先登入')
        next({ name: 'logIn' })
    } else if (isLogin.value && isAdmin.value && to.path === '/cms') {//登入且是管理員可以進入/cms頁面
        next()
    } else if (isLogin.value && !isAdmin.value && to.path === '/cms') {//登入非管理員無法進入/cms頁面，會導向首頁
        next({ name: 'home' })
    } else {//可以進行其他導向
        next()
    }

});

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(naive)
app.use(vue3GoogleLogin, {
    clientId: CLIENT_ID
})

library.add(fas, fab, far)


app.component("font-awesome-icon", FontAwesomeIcon).mount('#app')
