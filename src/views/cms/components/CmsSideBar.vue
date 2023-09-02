<script setup>
import { RouterLink } from "vue-router"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>
<template>
  <div class="logo">
    <font-awesome-icon :icon="['fas', 'cake-candles']" />
    <img src="" alt="">
    <h1>Dessert Oasis</h1>
  </div>
  <div class="usingAccount">
    <div>
      <img src="../../../../public/images/navbar/user-interface.png" alt="user">
    </div>
    <div>
      <img src="../../../assets/images/icons/PaperPlane.svg" alt="">
    </div>

  </div>
  <div class="options">
    <ul>
      <li>
        <router-link to="/cms/member">member</router-link>
      </li>
      <li>
        <router-link to="/cms/course">course</router-link>
      </li>
      <li>
        <router-link to="/cms/addCourse">新增課程</router-link>
      </li>
      <li>
        <router-link to="/cms/addteacherProfile">新增教師個人介紹</router-link>
      </li>
      <li>
        <router-link to="/cms/teacherCourseManager">教師個人課程管理</router-link>
      </li>
      <li>
        <router-link to="/cms/recipe">recipe</router-link>
      </li>
      <li>
        <router-link to="/cms/chat">chat</router-link>
      </li>
      <li>
        <router-link to="/cms/product">商品搜尋</router-link>
      </li>
      <li>
        <router-link to="/cms/addproduct">新增商品</router-link>
      </li>
    </ul>
  </div>
</template>
<style scoped>
h1 {
  font-size: 24px;
}

.logo {
  display: flex;
  border-bottom: 2px double black;
}

.usingAccount {
  height: 50px;
  padding-left: 10px;
  padding-right: 10px;
  border-bottom: 2px double black;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.usingAccount img {
  width: 32px;
  height: 32px;
}

.options>ul {
  list-style-type: none;
}

.options li {
  display: flex;
  align-items: center;
  height: 50px;
}

.options a {
  text-decoration: none;
}
</style>
