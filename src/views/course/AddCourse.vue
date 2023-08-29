<script setup>
import { ref, onMounted } from "vue"
import { checkTeacherStatus } from "@/api"

const isTeacher = ref(false) // 預設用戶不是老師
const selectedFile = ref(null) // 上傳的文件
const imageUrl = ref(null) // 上傳圖片的預覽 URL
const courseDate = ref("") //儲存課程日期
const courseLocation = ref("") //儲存上課地點

const addCourse = () => {
  console.log(courseDate, courseLocation)
  //沒有上課日期和地點，暫停送資料
  if (!courseDate.value || !courseLocation.value) {
    alert("請填寫完整課程資料")
    return
  }
  // 建立包含課程訊息的對象
  const courseData = {
    courseName: courseName.value,
    courseDate: courseDate.value,
    courseLocation: courseLocation.value,
  }
  // 向后端发送课程数据
  console.log("课程信息：", courseData)
  // 发送数据到后端并进行处理
}

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
      <!-- 這裡放置新增課程的表單或其他内容 -->

      <form @submit.prevent="addCourse" class="row">
        <div class="col-6">
          <!-- 帶入教師編號 -->
          <!-- <div class="mb-2">
            <label for="teacherId">教師編號:</label>
            <input id="teacherId" v-model="teacherId" />
          </div> -->
          <div class="mb-2">
            <!-- 帶入教師編號 -->
            <label for="teacherName">教師姓名:</label>
            <input id="teacherName" v-model="teacherName" />
          </div>
          <div class="mb-2">
            <label for="courseName">課程名稱:</label>
            <input id="courseName" v-model="courseName" />
          </div>
          <div class="mb-2">
            <label for="courseDate">開課時間:</label>
            <input type="date" v-model="courseDate" id="courseDate" />
            <!-- 沒寫開課日期，顯示錯誤訊息 -->
            <span v-if="!courseDate" class="error-message">請選擇課程日期</span>
          </div>
          <div class="mb-2">
            <label for="regDeadline">報名截止日:</label>
            <input type="date" v-model="regDeadline" id="regDeadline" />
          </div>
          <div class="mb-2">
            <label for="courseDescription">課程介紹:</label>
            <textarea
              type="text"
              v-model="courseDescription"
              id="courseDescription"
            ></textarea>
          </div>
          <!-- 沒寫上課地點，顯示錯誤訊息 -->
          <div class="mb-2">
            <label for="courseLocation">上課地點:</label>
            <input type="text" v-model="courseLocation" id="courseLocation" />
            <span v-if="!courseLocation" class="error-message"
              >請填入上課地點</span
            >
          </div>
          <!-- 課程分類id -->
          <div class="mb-2">
            <label for="remainingPlaces">可報名人數:</label>
            <input type="text" v-model="remainingPlaces" id="remainingPlaces" />
          </div>
          <div class="mb-2">
            <label for="coursePrice">報名價格:</label>
            <input
              type="number"
              min="0"
              v-model="coursePrice"
              id="coursePrice"
            />
          </div>
          <div class="mb-2">
            <label for="courseSortId">課程分類:</label>
            <select v-model="coursePrice" id="">
              <option value="">1</option>
              <option value="">2</option>
            </select>
            <input type="text" v-model="coursePrice" id="courseSortId" />
          </div>
          <div class="mb-2">
            <label for="courseLength">課程長度:</label>
            <select v-model="courseLength" id="courseLength">
              <option value="">一天</option>
            </select>
            <!-- <input type="text" v-model="courseLength" id="courseLength" /> -->
          </div>
          <div class="mb-2">
            <label for="courseLength">開課狀態:</label>
            <select name="" id="">
              <option value="">未開課</option>
            </select>
            <!-- <input type="text" v-model="courseStatus" id="courseStatus" /> -->
          </div>
          <div class="mb-2">
            <label for="courseLength">課程影片:</label>
            <input type="text" v-model="courseVedioId" id="courseLength" />
          </div>
          <div class="mb-2">
            <label for="courseLength">課程食譜:</label>
            <input type="text" v-model="courseLength" id="courseLength" />
          </div>
          <div class="mb-2">
            <label for="courseLength">開課狀態:</label>
            <input type="text" v-model="courseLength" id="courseLength" />
          </div>
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
          class="btn btn-primary col-6 justify-content-center align-items-center"
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
.error-message {
  color: red;
}
</style>
