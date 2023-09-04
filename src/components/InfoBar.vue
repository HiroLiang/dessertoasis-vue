<template>
  <div class="container my-5">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link class="nav-link routerSetting" to="/mem">會員資料</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link routerSetting" to="/mem/changepassword">更改密碼</router-link>
      </li>

      <li class="nav-item">
        <router-link class="nav-link routerSetting" to="/mem/bankaccount">銀行帳戶</router-link>
      </li>

    </ul>

  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.routerSetting {
  color: black;
  font-size: 32px;
}

.routerSetting:hover {
  color: #094581;
}
</style>

<script setup lang="ts">

</script>
<style scoped></style>
