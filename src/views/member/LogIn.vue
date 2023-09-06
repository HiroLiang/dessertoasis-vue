<script setup>
import NavBar from '@/components/NavBar.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { reqSignIn } from '../../api';


const account = ref('');
const passwords = ref('');
const router = useRouter();





//登入成功(後端return "Y"=>成功)，做跳轉頁面回首頁。設定cookies，isLogin=1代表有登入。
//登入失敗，清空input
const login = async () => {
    let loginState = await reqSignIn(account.value, passwords.value)
    if (loginState.data === 'Y') {
        alert("登入成功")
        router.push({ name: 'home' })
    } else {
        alert('帳號密碼錯誤')
        account.value = ''
        passwords.value = ''
    }
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
                        <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                        <label class="form-check-label" for="form2Example31"> 記住帳號密碼 </label>
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
                        <a href="#"><font-awesome-icon :icon="['fab', 'google']" size="xl" style="color: #4285f4;"
                                class="bounce-icon" /></a>
                    </div>

                    <div class="icon">
                        <a href="#"><font-awesome-icon :icon="['fab', 'facebook']" size="xl" style="color: #4267b2;"
                                class="bounce-icon" /></a>
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