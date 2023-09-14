<script setup>
import NavBar from "@/components/NavBar.vue"
import { reactive } from "vue"
const navBarList = reactive([
  { title: "食譜", toUrl: "/recipes" },
  { title: "課程", toUrl: "/courses" },
  { title: "商品", toUrl: "/product" },
  { title: "預約甜點教室", toUrl: "/reservation" },
  {
    title: "老師專區",
    toUrl: "/teacher",
  },
  {
    title: "我的課程管理",
    toUrl: "/teacher/myCourses",
  },
  // {
  //   title: "編輯課程",
  //   toUrl: "/teacher/editCourse",
  // },
  {
    title: "編輯個人資訊",
    toUrl: "/teacher/editProfile",
  },
])
</script>
<template>
  <NavBar :NavBarList="navBarList" />
  <RouterView></RouterView>
</template>
