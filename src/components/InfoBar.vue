<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-md-2">
        <router-link to="/mem/profile">會員資料</router-link>
      </div>
      <div class="col-md-2">
        <p>更改密碼</p>
      </div>
      <div class="col-md-2">
        <p>信用卡</p>
      </div>
      <div class="col-md-2">
        <p>銀行帳戶</p>
      </div>
      <div class="col-md-2">
        <p>廠商資料
        </p>
      </div>
      <hr>
    </div>
  </div>
</template>
<script setup lang="ts">
// import { RouterLink } from "vue-router";
</script>
<style scoped>
p {
  font-size: 150%;
  font-weight: 700;
}
</style>