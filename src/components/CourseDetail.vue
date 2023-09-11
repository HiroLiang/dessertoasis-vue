<template>
  <div>
    <p>课程 ID: {{ courseId }}</p>
    <h2>{{ course.courseName }}</h2>
    <p>{{ course.courseIntroduction }}</p>
    <p>开课日期: {{ course.courseDate }}</p>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue"
import { showSingleCourse } from "@/api"
import { useRoute } from "vue-router"
const props = defineProps({
  courseId: {
    type: Number,
    required: true,
  },
})
const route = useRoute()
const course = ref({}) // 存储课程详细信息
// 使用路由参数获取 courseId
// const courseId = route.params.courseId
// const courseId = this.$route.params.courseId
// console.log(route.params.courseId) // 访问路由参数
// console.log(route.query.someParam) // 访问查询参数

// 获取单个课程的详细信息
const fetchCourseDetail = async () => {
  try {
    const response = await showSingleCourse(props.courseId)
    course.value = response.data
  } catch (error) {
    console.error("获取课程详细信息失败", error)
  }
}

// 获取单个课程的详细信息
// const datas = async (courseId) => {
//   const response = await showSingleCourse(courseId)
//   course.value = response.data
// }
onMounted(() => {
  fetchCourseDetail()
  // 在組件掛載後獲取資料
  //   datas()
})
</script>
