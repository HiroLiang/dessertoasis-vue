<template>
  <h1>課程詳情</h1>
  <p>课程 ID: {{ courseId }}</p>
  <h2>{{ course.courseName }}</h2>
  <p>{{ course.courseIntroduction }}</p>
  <p>开课日期: {{ course.courseDate }}</p>
</template>
<script setup>
import { showSingleCourse } from "@/api"
const course = ref({}) // 存储课程详细信息
// 使用路由参数获取 courseId
const courseId = this.$route.params.courseId
const showSingleCourse = async () => {}
</script>
