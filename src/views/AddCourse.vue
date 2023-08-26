<template>
  <div>
    <!-- 根據用戶身份顯示不同内容 -->
    <div v-if="isTeacher">
      <h1>新增課程</h1>
      <!-- 这里放置新增课程的表单或其他内容 -->

      <form @submit.prevent="addCourse">
        <div>
          <label for="courseName">课程名称:</label>
          <input type="text" id="courseName" v-model="courseName" />
        </div>
        <!-- 其他课程信息字段 -->
        <button type="submit">提交</button>
      </form>
    </div>
    <div v-else>
      <p>您不是教師，無法前往此頁。</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { checkTeacherStatus } from "@/api"

const isTeacher = ref(false) // 預設用戶不是老師

onMounted(async () => {
  // 向後端發送請求以驗證用戶是否為教師
  try {
    const response = await checkTeacherStatus()
    if (response.data === "Teacher cookie set successfully.") {
      // 用戶是老師，顯示新增課程内容
      console.log(response)
      isTeacher.value = true
    }
  } catch (error) {
    console.error(error)
  }
})
</script>
