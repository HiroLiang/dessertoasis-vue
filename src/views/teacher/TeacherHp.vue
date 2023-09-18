<script setup>
import { useRouter } from "vue-router"
import { computed } from "vue"
const router = useRouter()
// const teacherId = computed(() => {
//   console.log(router.query)
//   return router.query.id
// })
</script>
<template>
  <h1 style="margin-top: 30px" class="container">老師首頁</h1>
  <!-- <div>
    <h1>目标页面</h1>
    <p>编辑的ID: {{ $route.query.id }}</p>
  </div> -->
</template>
