<script setup>
import NavBar from '@/components/NavBar.vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { reqSignUp } from '../../api'
const router = useRouter();

const account = ref('');
const email = ref('');
const passwords = ref('');
const confirmPasswords = ref('');

const register = async () => {
    if (passwords.value !== confirmPasswords.value) {
        alert('密碼與確認密碼不一致')
        return;
    }
    if (!passwords.value) {
        alert('密碼不能為空')
        return;
    }

    const userData = {
        account: account.value,
        email: email.value,
        passwords: passwords.value,
        confirmPassword: confirmPasswords.value
    }

    let result = await reqSignUp(JSON.stringify(userData))

    console.log('傳遞到後端的資料:', userData);

    if (result.data == 'Y') {
        router.push({ name: 'sendEmail' })
    } else if (result.data == 'N') {
        alert('帳號已存在')
    }
}

</script>
<template>
    <NavBar />
    <div class="container p-4">
        <form action="#">
            <h2 class="mb-4">會員註冊</h2>
            <div class="d-flex flex-row align-items-center mb-4">
                <div class="flex-fill mb-0">
                    <input v-model="account" type="text" class="form-control" placeholder="請輸入帳號" />
                </div>
            </div>
            <div class="d-flex flex-row align-items-center mb-4">
                <div class="flex-fill mb-0">
                    <input v-model="email" type="email" class="form-control" placeholder="請輸入Email" />
                </div>
            </div>
            <div class="d-flex flex-row align-items-center mb-4">
                <div class="flex-fill mb-0">
                    <input v-model="passwords" type="password" class="form-control" placeholder="請輸入密碼" />
                </div>
            </div>
            <div class="d-flex flex-row align-items-center mb-4">
                <div class="flex-fill mb-0">
                    <input v-model="confirmPasswords" type="password" class="form-control" placeholder="再次輸入密碼" />
                </div>
            </div>
            <div class="form-check d-flex justify-content-center mb-3">
                <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                <label class="form-check-label" for="form2Example3">同意註冊 <a href="#" class="mb-0">合約</a></label>
            </div>
            <div class="row p-2">
                <button type="button" class="btn btn-primary btn-block mb-4" :disable="!isAgree"
                    @click="register">註冊</button>
            </div>
            <div class="text-center sign-link">
                <p>已經是會員 <router-link to="/logIn">登入</router-link> </p>
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

a {
    text-decoration: none;
}

h2 {
    text-align: center;
}
</style>