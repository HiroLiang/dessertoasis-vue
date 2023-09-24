<script setup>
import { ref, onMounted, computed } from "vue"
import { addCourse, uploadCourseImage } from "@/api"

const formData = {
  courseName: "",
  courseIntroduction: "",
  courseFeature: "",
  courseDestination: "",
  serviceTarget: "",
  closeDate: null,
  updateDate: Date.now(),
  courseDate: null,
  coursePlace: "",
  coursePrice: 0,
  remainPlaces: 0,
  courseStatus: "未開課",
}
const imagesData = {
  images: [],
}
const thumbnailData = ref({
  file: null,
  url: "",
})
function addImage(event) {
  console.log("addImage function called")
  const files = event.target.files
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const url = URL.createObjectURL(file)
    console.log("url", url);
    imagesData.images.push({ url, file })
    console.log("imagesData.images", imagesData.images)
  }
}
function addThumbnail(event) {
  const file = event.target.files[0]
  const url = URL.createObjectURL(file)
  thumbnailData.url = url
  thumbnailData.file = file
}

function removeThumbnail() {
  thumbnailData.url = ""
  thumbnailData.file = null
}
const deleteImage = (index) => {
  images.value.splice(index, 1)
}

// 計算屬性，用于檢查日期是否有效
// const isDateValid = computed(() => {
//   if (!courseDate.value || !regDeadline.value) {
//     return true // 如果有一个日期為空，認為是有效的
//   }
//   return regDeadline.value <= courseDate.value
// })

// const error = computed(() => {
//   if (!isDateValid.value) {
//     return "報名截止日期不能大於開課日期"
//   }
//   return ""
// })

// 檢查日期，如果無效則清空報名截止日期
// const checkDate = () => {
//   if (!isDateValid.value) {
//     regDeadline.value = ""
//   }
// }

async function submitCourse() {
  try {
    const courseData = {
      courseName: formData.courseName,
      courseIntroduction: formData.courseIntroduction,
      courseFeature: formData.courseFeature,
      courseDestination: formData.courseDestination,
      serviceTarget: formData.serviceTarget,
      closeDate: formData.closeDate,
      updateDate: formData.updateDate,
      courseDate: formData.courseDate,
      coursePlace: formData.coursePlace,
      remainPlaces: formData.remainPlaces,
      coursePrice: formData.coursePrice,
      courseStatus: formData.courseStatus,
    }
    console.log("courseData", courseData)
    const courseResponse = await addCourse(courseData)
    console.log("courseResponse", courseResponse)
    const courseId = courseResponse.data
    console.log("courseId", courseId)
    console.log("課程已成功上傳", courseId)
    alert("課程已成功上傳")
    const imageUploadPromises = imagesData.images.map(async (image, index) => {
      const imageFormData = new FormData()
      imageFormData.append("image", image.file)
      console.log("imagrFormData", imageFormData)
      imageFormData.forEach((data) => { console.log(data) })
      console.log("courseId", courseId)
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
      const imageResponse = await uploadCourseImage(
        courseId,
        imageFormData,
        config
      )
      console.log(`圖片 ${index + 1} 已成功上傳`, imageResponse.data)
    })
    await Promise.all(imageUploadPromises)
  } catch (error) {
    console.error("上傳圖片時有誤", error)
  }
}
</script>
<template>
  <div class="container">
    <h1 style="margin-top: 30px">新增課程</h1>

    <form class="row">
      <div class="container col-md-10">
        <!-- <input id="courseId" name="courseId" v-model="formData.courseId" /> -->
        <div class="mb-2 container">
          <label class="col-md-10" for="courseName">課程名稱: </label><br />
          <input class="col-md-10" id="courseName" v-model="formData.courseName" />
        </div>

        <div class="mb-2 container">
          <label class="col-md-10">開課日期：</label>
          <input type="date" id="courseDate" class="col-md-10" v-model="formData.courseDate" @input="checkDate" />
          <!-- <span v-if="!courseDate" class="error-message">請選擇課程日期</span> -->
        </div>

        <div class="mb-2 container">
          <label class="col-md-10">報名截止日期：</label>
          <input type="date" v-model="formData.closeDate" class="mb-2 col-md-10" @input="checkDate" />
        </div>
        <p v-if="error" style="color: red">{{ error }}</p>
        <!-- <div v-if="error" class="error-message">
            报名截止日期不能大于开课日期
          </div> -->

        <div class="mb-2 container">
          <label class="col-md-10">課程介紹:</label>
          <textarea style="resize: none; rows=5;" class="col-md-10" v-model="formData.courseIntroduction"></textarea>
        </div>
        <div class="mb-2 container">
          <label class="col-md-10">課程特色:</label>
          <input class="col-md-10" v-model="formData.courseFeature" />
        </div>
        <div class="mb-2 container">
          <label class="col-md-10">課程目標:</label>
          <input class="col-md-10" v-model="formData.courseDestination" />
        </div>
        <div class="mb-2 container">
          <label class="col-md-10">課程對象:</label>
          <input class="col-md-10" v-model="formData.serviceTarget" />
        </div>


        <div class="mb-2 container">
          <label class="col-md-10">上課地點：</label>
          <input class="col-md-10" type="text" v-model="formData.coursePlace" />
        </div>

        <div class="mb-2 container">
          <label class="col-md-10" for="remainingPlaces">可報名人數:</label>
          <input type="number" class="col-md-10" v-model="formData.remainPlaces" min="0" id="remainPlaces" />
        </div>
        <div class="mb-2 container">
          <label class="col-md-10" for="coursePrice">報名價格:</label>
          <input type="number" min="0" v-model="formData.coursePrice" id="coursePrice" class="col-md-10" />
        </div>

        <div class="image-upload container mb-2">
          <label class="col-md-10 mb-2">新增縮圖:</label>
          <input class="col-md-10" type="file" @change="addThumbnail" accept="image/*" />
          <div v-if="thumbnailData.url" class="uploaded-item">
            <img :src="thumbnailData.url" alt="Uploaded Thumbnail" />
            <button @click="removeThumbnail">刪除</button>
          </div>
        </div>
        <div class="container mb-2">
          <label class="col-md-10 mb-2">上傳課程圖片:</label>
          <input class="col-md-10" type="file" @change="addImage" accept="image/*" />
          <div v-for="(image, index) in imagesData.images" :key="index">
            <h4>課程圖片預覽：</h4>
            <img :src="image.url" alt="上傳課程圖片" class="upload-image" />
            <button @click="deleteImage(index)">刪除</button>
          </div>
        </div>
        <div class="container mb-2 mx-auto">
          <button @click.prevent="submitCourse" class="btn btn-primary">
            提交
          </button>
          <button @click.prevent="submitCourse" class="btn btn-danger">
            刪除
          </button>
        </div>
      </div>



    </form>
  </div>
</template>
<style>
.error-message {
  color: red;
}

.upload-image {
  min-width: 100%;
  max-width: 100%;
}

.upload-video {
  width: 100%;
  width: 100%;
}
</style>
