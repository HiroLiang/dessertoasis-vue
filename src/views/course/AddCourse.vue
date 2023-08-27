<script setup>
import { ref, onMounted } from "vue"
import { checkTeacherStatus } from "@/api"

const isTeacher = ref(false) // 預設用戶不是老師
const selectedFile = ref(null) // 上傳的文件
const imageUrl = ref(null) // 上傳圖片的預覽 URL

const handleFileChange = (e) => {
  // 處理文件選擇事件，獲得上傳的圖片文件
  selectedFile.value = e.target.files[0]
  imageUrl.value = URL.createObjectURL(selectedFile.value)
}

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
<template>
  <div>
    <!-- 根據用戶身份顯示不同内容 -->
    <div v-if="isTeacher" class="container">
      <h1>新增課程</h1>
      <!-- 這裡放置新增课程的表單或其他内容 -->

      <form @submit.prevent="addCourse" class="row">
        <div class="col-6">
          <!-- 帶入教師編號 -->
          <label for="teacherId">教師編號:</label>
          <input id="teacherId" v-model="teacherId" />
          <br />
          <label for="courseName">課程名稱:</label>
          <input id="courseName" v-model="courseName" />
          <br />
          <label for="courseDate">開課時間:</label>
          <input type="date" v-model="courseDate" id="courseDate" />
          <br />
          <label for="regDeadline">報名截止日:</label>
          <input type="date" v-model="regDeadline" id="regDeadline" />
          <br />
          <label for="courseDescription">課程介紹:</label>
          <input
            type="text"
            v-model="courseDescription"
            id="courseDescription"
          />
          <br />
          <label for="courseLocation">上課地點:</label>
          <input type="text" v-model="courseLocation" id="courseLocation" />
          <br />
          <!-- 課程分類id -->

          <label for="remainingPlaces">報名人數:</label>
          <input type="text" v-model="remainingPlaces" id="remainingPlaces" />
          <br />
          <label for="coursePrice">報名價格:</label>
          <input type="text" v-model="coursePrice" id="coursePrice" />
          <br />
          <label for="coursePrice">報名價格:</label>
          <input type="text" v-model="coursePrice" id="coursePrice" />
        </div>
        <!-- 課程圖片路徑 -->
        <div class="col-6 row">
          <label for="coursePictureUrl">上傳課程圖片:</label>
          <input type="file" ref="fileInput" @change="handleFileChange" />
          <!-- <input type="file" id="coursePictureUrl" /> -->
          <div class="classImg" v-if="imageUrl">
            <h4>課程圖片預覽：</h4>
            <img :src="imageUrl" alt="課程圖片" />
          </div>
        </div>
        <!-- 課程影片id,食譜id,標籤id -->
        <button
          type="submit"
          class="btn btn-primary col-5 justify-content-center align-items-center"
        >
          提交
        </button>
      </form>
    </div>
    <div v-else>
      <p>您不是教師，無法前往此頁。</p>
    </div>
  </div>
</template>
<style>
.classImg img {
  max-width: 100%;
  max-height: 100%;
}
</style>
