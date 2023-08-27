<script setup>
import NavBar from "@/components/NavBar.vue"
import { reactive } from "vue"
const navbarlist = reactive([
  { title: "食譜", toUrl: "/recipes" },
  { title: "課程", toUrl: "/courses" },
  { title: "商品", toUrl: "/producthome" },
  { title: "預約甜點教室", toUrl: "/reservation" },
  {
    title: "關於教師",
    toUrl: "/courses/aboutTeacher",
  },
])
</script>
<template>
  <NavBar :NavBarList="navbarlist"></NavBar>
  <div>about Teacher</div>
</template>
<style scoped></style>
