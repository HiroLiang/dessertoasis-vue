<template>
  <div class="container">
    <h1 align="center">編輯教師自我介紹</h1>

    <form @submit.prevent="submitTeacherIntroduction" class="row">
      <div class="col-6">
        <div class="mb-2">
          <label for="teacherName ">教師姓名:</label>
          <input type="text" id="teacherName" v-model="teacherName" />
        </div>
        <div class="mb-2">
          <label for="teacherTel">連絡電話:</label>
          <input type="tel" id="teacherTel" v-model="teacherTel" />
        </div>
        <div class="mb-2">
          <label for="teacherEmail">電子郵件:</label>
          <input type="email" id="teacherEmail" v-model="teacherEmail" />
        </div>
        <div class="mb-2">
          <label for="teacherProfile">教學經歷:</label>
          <textarea
            v-model="teacherProfile"
            id="teacherProfile"
            cols="30"
            rows="10"
          ></textarea>
        </div>
      </div>
      <div class="col-6 row">
        <label for="teacherProfilePic">教師照片:</label>
        <input
          type="file"
          id="teacherProfilePic"
          @change="handlePhotoChange"
          accept="image/*"
        />
        <img :src="teacherProfilePic" v-if="teacherProfilePic" alt="教師照片" />
      </div>

      <button type="submit" class="btn btn-primary">提交</button>
    </form>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue"
// import {} from "@/api"

const teacherName = ref("")
const teacherTel = ref(null)
const teacherEmail = ref("")
const teacherProfile = ref("")
// const teacher = reactive({
//   name: "",
//   photo: null,
//   phone: "",
//   email: "",
//   teachingExperience: "",
// })

const submitTeacherIntroduction = () => {
  // 在此处处理表单提交逻辑，可以将数据发送到后端保存
}

const handlePhotoChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    // 处理上传的照片文件，例如显示预览图或将其保存到组件数据中
    const reader = new FileReader()
    reader.onload = () => {
      teacher.photo = reader.result
    }
    reader.readAsDataURL(file)
  }
}

onMounted(() => {
  datas()
})

// return {
//   teacher,
//   submitTeacherIntroduction,
//   handlePhotoChange,
// }
</script>
<style scoped></style>
