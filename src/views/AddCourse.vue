<template>
  <div>
    <!-- 根據用戶身份顯示不同内容 -->
    <div v-if="isTeacher">
      <h1>新增課程</h1>
      <!-- 这里放置新增课程的表单或其他内容 -->
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
      isTeacher.value = true
    }
  } catch (error) {
    console.error(error)
  }
})
</script>
