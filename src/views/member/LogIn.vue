<script setup>
import NavBar from '@/components/NavBar.vue';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { reqSignIn } from '../../api';
const router = useRouter();

const account = ref('');
const passwords = ref('');
const rememberInput = ref(true)





//登入成功(後端return "Y"=>成功)，做跳轉頁面回首頁。設定cookies，isLogin=1代表有登入。
//登入失敗，清空input
const login = async () => {
    let loginState = await reqSignIn(account.value, passwords.value)
    if (loginState.data === 'Y') {
        if (rememberInput.value)
            localStorage.setItem('remberedAccount', account.value)
        alert("登入成功")
        router.push({ name: 'home' })
    } else {
        alert('帳號密碼錯誤')
        account.value = ''
        passwords.value = ''
    }
}

onMounted(() => {
    account.value = localStorage.getItem('remberedAccount')
})


import { googleTokenLogin } from 'vue3-google-login'

const GOOGLE_CLIENT_ID = '159356890132-eqq8r76bgodqlmq0oajjgibkva6rjfn7.apps.googleusercontent.com'
const googleLoggin = ref(false)
const data = ref()

const handleGoogleAccessTokenLogin = () => {
    googleTokenLogin({
        clientId: GOOGLE_CLIENT_ID
    }).then((response) => {
        data.value = response;
        googleLoggin.value = true;
        console.log(data.value)
        localStorage.setItem('googleLoginData', JSON.stringify(response));
        localStorage.setItem('googleLoggedIn', true);
        router.push({ name: 'home' })
    })
}

</script>
<template>
    <NavBar />
    <div class="container p-4">
        <h2 style="text-align: center;" class="mb-4">會員登入</h2>
        <form action="#">
            <div class="form-outline mb-4">
                <input v-model="account" type="text" class="form-control" placeholder="請輸入帳號" />
            </div>

            <div class="form-outline mb-4">
                <input v-model="passwords" type="password" class="form-control" placeholder="請輸入密碼" />
            </div>

            <div class="row mb-4">
                <div class="col d-flex justify-content-center">

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="rememberInput" id="form2Example31"
                            checked />
                        <label class="form-check-label" for="form2Example31"> 記住帳號 </label>
                    </div>
                </div>

                <div class="col d-flex justify-content-center">

                    <router-link to="/forgetPassword">忘記密碼?</router-link>
                </div>
            </div>


            <div class="row p-2">
                <button type="button" class="btn btn-primary btn-block mb-4" @click="login">登入</button>
            </div>


            <div class="text-center row">
                <p>尚未成為會員? <router-link to="/register">註冊</router-link></p>
                <p>或用其他方式登入</p>


                <div class="icon-container">
                    <div class="icon">
                        <button type="button" @click="handleGoogleAccessTokenLogin">
                            Google 登入
                        </button>
                    </div>


                </div>



            </div>



        </form>
    </div>
</template>

<style scoped>
.container {
    padding: 10px;
    margin: 50px auto;
    width: 350px;
    border: 1px solid black;
    border-radius: 15px;
    box-shadow: 2px 2px 2px gray;
}

.icon-container {
    display: flex;
    justify-content: center;

}

.icon {
    margin: auto 15px;
}


.bounce-icon {

    transition: transform 0.3s;
    /* 添加平滑過渡效果 */
}

.bounce-icon:hover {
    transform: scale(1.1) translateY(-5px);
    /* 彈跳效果 */
}
</style>