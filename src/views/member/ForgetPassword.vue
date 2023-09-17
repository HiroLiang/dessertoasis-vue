<script setup>
import NavBar from '@/components/NavBar.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import axios from 'axios';

const router = useRouter();
const successMessage = ref('');
const successMessageClass = ref('');
function goBack() {
    router.go(-1); // 上一頁
}

const email = ref('');

async function forgotPassword() {
    try {
        const response = await axios.put('http://localhost:8080/forgotpassword', null, {
            params: { email: email.value } // 将用户输入的Email作为请求正文发送给后端
        });
        // 处理成功回应，例如显示成功消息
        console.log("我是正確" + email.value)
        email.value = ''
        console.log(response.data);

        successMessage.value = "發送成功";
        email.value = ''
        successMessageClass.value = "alert alert-success mt-3"; // 成功時的 CSS 類別
    } catch (error) {
        // 处理错误，例如显示错误消息
        console.log("我是正確" + email.value)
        console.error(error.response.data);

        successMessage.value = "發送失敗";
        successMessageClass.value = "alert alert-danger mt-3"; // 失敗時的 CSS 類別
    }
}

</script>

<template>
    <NavBar></NavBar>
    <div class="container p-4">
        <h2 style="text-align: center;" class="mb-4">重新設定密碼</h2>
        <form action="#">


            <div class="form-outline mb-4 p-2">
                <input type="email" id="email" class="form-control" placeholder="請輸入Email" v-model="email" />
            </div>


            <div class="row p-2">
                <button @click="forgotPassword" type="button" class="btn btn-primary btn-block mb-4">送出</button>
            </div>

            <div class="row p-2 ">
                <button @click="goBack" type="button" class="btn btn-secondary btn-block mb-4">取消</button>
            </div>


        </form>
        <div v-if="successMessage" :class="successMessageClass">{{ successMessage }}</div>
    </div>
</template>

<style scoped>
.container {
    padding: 10px;
    margin: 150px auto;
    width: 350px;
    border: 1px solid black;
    border-radius: 15px;
    box-shadow: 2px 2px 2px gray;
}
</style>