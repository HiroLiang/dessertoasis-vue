<template>
    <!-- <NavBar />
    <div class="container d-flex justify-content-center align-items-center" style="height: 100vh;">
        <form @submit.prevent="regenerateOtp" class="p-4 border rounded shadow" style="transform: scale(1.2); width: 80%;">
            <div class="form-group mb-3">
                <label for="email">若無收到驗證信，重新發送</label>
                <input type="email" v-model="email" class="form-control m-2" id="email" placeholder="輸入您的電子郵件" required>
            </div>
            <button type="submit" class="btn btn-primary  m-2">發送</button>
            <button @click="goBack" type="button" class="btn btn-primary  m-2">取消</button>

            <div v-if="successMessage" :class="successMessageClass">{{ successMessage }}</div>
        </form>
    </div> -->

    <NavBar></NavBar>
    <div class="container p-4">
        <h3 style="text-align: center;" class="mb-4">若無收到驗證信<br>重新發送</h3>
        <form @submit.prevent="regenerateOtp">


            <div class="form-outline mb-4 p-2">
                <input type="email" id="email" class="form-control" placeholder="輸入您的電子郵件" v-model="email" required />
            </div>


            <div class="row p-2">
                <button type="submit" class="btn btn-primary btn-block mb-4">送出</button>
            </div>

            <div class="row p-2 ">
                <button @click="goBack" type="button" class="btn btn-secondary btn-block mb-4">取消</button>
            </div>

            <div v-if="successMessage" :class="successMessageClass">{{ successMessage }}</div>
        </form>
    </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
const router = useRouter();

function goBack() {
    router.go(-1); // 上一頁
}
const email = ref('');
const successMessage = ref('');
const successMessageClass = ref('');

const regenerateOtp = async () => {
    try {
        const response = await axios.put('http://localhost:8080/regenerate-otp', null, {
            params: { email: email.value }
        });
        console.log("我是正確" + email.value)
        console.log(response.data);

        successMessage.value = "發送成功";
        email.value = ''
        successMessageClass.value = "alert alert-success mt-3"; // 成功時的 CSS 類別
    } catch (error) {
        console.log("我是錯誤" + email.value)
        console.error(error.response.data);

        successMessage.value = "發送失敗";
        successMessageClass.value = "alert alert-danger mt-3"; // 失敗時的 CSS 類別
    }
};
</script>

<style scoped>
.container {
    padding: 10px;
    margin: 150px auto;
    width: 350px;
    border: 1px solid black;
    border-radius: 15px;
    box-shadow: 2px 2px 2px gray;
}

.form-group {
    margin-bottom: 20px;
}
</style>
