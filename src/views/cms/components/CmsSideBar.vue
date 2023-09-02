<script setup>
import { RouterLink } from "vue-router"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>
<template>
  <div class="logo">
    <!-- <font-awesome-icon :icon="['fat', 'ice-cream']" /> -->
    <img src="" alt="">
    <h1>Dessert Oasis</h1>
  </div>
  <div class="usingAccount">

  </div>
  <div class="options">
    <router-link to="/cms/member">member</router-link><br />
    <router-link to="/cms/course">course</router-link><br />
    <router-link to="/cms/addCourse">新增課程</router-link><br />
    <router-link to="/cms/teacherCourseManager">教師個人課程管理</router-link><br />
    <router-link to="/cms/recipe">recipe</router-link><br />
    <router-link to="/cms/chat">chat</router-link><br />
    <router-link to="/cms/product">商品搜尋</router-link><br />
    <router-link to="/cms/addproduct">新增商品</router-link><br />
  </div>
</template>
<style scoped>
h1 {
  font-size: 24px;
}

.logo {
  display: flex;
}
</style>
