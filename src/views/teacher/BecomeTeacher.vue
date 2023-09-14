<script setup>
import NavBar from "@/components/NavBar.vue"
import { reactive } from "vue"
const navBarList = reactive([
  { title: "食譜", toUrl: "/recipes" },
  { title: "課程", toUrl: "/courses" },
  { title: "商品", toUrl: "/product" },
  { title: "預約甜點教室", toUrl: "/reservation" },
  {
    title: "我的課程",
    toUrl: "/teacher",
  },
])
</script>
<template>
  <NavBar :NavBarList="navBarList" />
  <RouterView></RouterView>
  <h1>成為老師</h1>
</template>
