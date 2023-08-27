<script setup>
import NavBar from '@/components/NavBar.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function goBack() {
    router.go(-1); // 上一頁
}
</script>
<template>
    <NavBar></NavBar>
    <div class="container p-4">
        <h2 style="text-align: center;" class="mb-4">重新設定密碼</h2>
        <form action="#">


            <div class="form-outline mb-4 p-2">
                <input type="email" id="" class="form-control" placeholder="請輸入Email" />
            </div>


            <div class="row p-2">
                <button @click="submitForm" type="button" class="btn btn-primary btn-block mb-4">送出</button>
            </div>

            <div class="row p-2 ">
                <button @click="goBack" type="button" class="btn btn-secondary btn-block mb-4">取消</button>
            </div>


        </form>
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