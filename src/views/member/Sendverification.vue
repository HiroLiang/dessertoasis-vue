<template>
    <NavBar />
    <div class="container d-flex justify-content-center align-items-center" style="height: 100vh;">
        <form @submit.prevent="regenerateOtp" class="p-4 border rounded shadow" style="transform: scale(1.2); width: 80%;">
            <div class="form-group mb-3">
                <label for="email">發送驗證信</label>
                <input type="email" v-model="email" class="form-control m-2" id="email" placeholder="輸入您的電子郵件" required>
            </div>
            <button type="submit" class="btn btn-primary">發送</button>
            <!-- 顯示成功訊息的元素 -->
            <div v-if="successMessage" :class="successMessageClass">{{ successMessage }}</div>
        </form>
    </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';
import { ref } from 'vue';
import axios from 'axios';

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
    text-align: center;
    max-width: 400px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 20px;
}
</style>
