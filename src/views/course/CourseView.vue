<script setup>
import NavBar from "@/components/NavBar.vue"
import { imgTest } from "@/api"
import { reactive, ref } from "vue"
const navBarList = reactive([
  { title: "食譜", toUrl: "/recipes" },
  { title: "課程", toUrl: "/courses" },
  { title: "商品", toUrl: "/product" },
  { title: "預約甜點教室", toUrl: "/reservation" },
  {
    title: "關於教師",
    toUrl: "/courses/aboutTeacher",
  },
  {
    title: "報名課程",
    toUrl: "/courses/EnrollCourse",
  },
])
</script>
<template>
  <NavBar :NavBarList="navBarList" />
  <RouterView></RouterView>
</template>

<style scoped></style>
