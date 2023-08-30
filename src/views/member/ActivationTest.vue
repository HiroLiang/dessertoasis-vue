<template>
    <NavBar></NavBar>
    <div class="container p-4">
        <h2 style="text-align: center;" class="mb-4">驗證信件已發送</h2>
        <p style="text-align: center;">請前往您的信箱收取驗證信件。</p>

        <div class="d-flex justify-content-center">
            <button class="btn btn-primary me-2">驗證</button>
            <button class="btn btn-secondary">取消</button>
        </div>
    </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';
</script>

<style scoped>
.container {
    padding: 10px;
    margin: 50px auto;
    width: 350px;
    border: 1px solid black;
    border-radius: 15px;
    box-shadow: 2px 2px 2px gray;
}

.d-flex {
    display: flex;
}

.justify-content-center {
    justify-content: center;
}
</style>
