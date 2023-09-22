<script setup>
import { useRoute } from "vue-router"
import { computed, onMounted, ref } from "vue"
import { getTeacher, getTeacherImage } from "@/api"
const route = useRoute()

const teacherId = computed(() => {
  console.log(route.query)
  return route.query.id
})

const img = ref(null)
const getImg = async (id) => {
  let res = await getTeacherImage(id)
  const body = res.data
  const header = res.headers["content-type"]
  console.log(body)
  console.log(header)
  img.value = `data:${body[0]};base64,${body[1]}`
}

const teacherData = ref({
  teacherName: "",
})

// const goBack = () => {
//   // 導航回上一頁
//   router.go(-1)
//   // route.push({ path: "/courses/allTeacher" })
// }
onMounted(async () => {
  console.log("teacherId")
  console.log(teacherId.value)
  //處理成品圖片
  // let teacherPic = await getTeacherImage(teacherId.value)
  // let mainPicBody = teacherPic.data
  // let mainPicHeader = teacherPic.headers[`content-type`]
  // teacherData.value.pictures = `data:${mainPicBody[0]};base64,${mainPicBody[1]}`

  let teacher = await getTeacher(teacherId.value)
  let datas = teacher.data

  teacherData.value.teacherName = datas.teacherName
  teacherData.value.teacherProfile = datas.teacherProfile
  teacherData.value.teacherTel = datas.teacherTel
  teacherData.value.teacherMail = datas.teacherMail
})
</script>
<template>
  <div class="container">
    <h1 style="margin-top: 30px">老師個人頁面</h1>
    <div class="row">
      <!-- <button @click="getImg(8)">測試</button>
      <img :src="img" alt="" /> -->
      <!-- <h1>目標頁面</h1> -->
      <!-- <p>编辑的ID: {{ teacherId }}</p>
      <p>教師名: {{ teacherData.teacherName }}</p> -->
      <!-- <div class="col-6">111</div>
      <div class="col-6">222</div> -->
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-6">
            <div class="imgContainer">
              <img src="images/teacher/1/teacher1.jpg" />
              <!-- <img :src="teacherData.pictures" alt="..." /> -->
            </div>
          </div>
          <div class="col-6">
            <div class="card-body">
              <h5 class="card-title">教師姓名:{{ teacherData.teacherName }}</h5>
              <p class="card-title">
                教師經歷:{{ teacherData.teacherProfile }}
              </p>
              <p class="card-title">教師電話:{{ teacherData.teacherTel }}</p>
              <p class="card-title">e-mail:{{ teacherData.teacherMail }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="container">
      <button @click="goBack">返回上一頁</button>
    </div> -->
  </div>
</template>
<style scoped>
img {
  display: block;
}
.imgContainer img {
  width: 100%;
  max-height: 80vh;
  object-fit: cover;
  object-position: center;
}
</style>
