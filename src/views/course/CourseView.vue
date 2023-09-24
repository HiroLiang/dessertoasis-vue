<script setup>
import NavBar from "@/components/NavBar.vue"
import { imgTest } from "@/api"
import { reactive, ref } from "vue"
import HeaderShow from '@/components/HeaderShow.vue';

const navBarList = reactive([
  { title: "食譜", toUrl: "/recipes" },
  { title: "課程", toUrl: "/courses" },
  { title: "商品", toUrl: "/product" },
  { title: "預約甜點教室", toUrl: "/reservation" },
  {
    title: "關於教師",
    toUrl: "/courses/aboutTeacher",
  },
])
</script>
<template>
  <NavBar :NavBarList="navBarList" />
  <HeaderShow />

  <RouterView></RouterView>
</template>

<style scoped>
.headerPic {
  height: 240px;
  width: 100%;
  opacity: 0.8;
  margin-bottom: 20px;
}

.headerPic>img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
