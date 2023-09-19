<script setup>
import {reqGetCourseData,getTeacherImage} from "@/api"
import { computed, onMounted, ref } from "vue"
import { useRoute } from "vue-router"
const route = useRoute()

const courseId = computed(() => {
  console.log(route.query)
  return route.query.id
})
console.log(courseId);

const courseData = ref({
  courseName: "",
  courseIntroduction:"",
  coursePlace:"",
  teacher:{},
  courseFeature:"",
  coursePrice:0,
  serviceTarget:"",
  coursePictureList:[]
    // recipeTitle: "",
    // recipeIntroduction: "",
    // pictureUrl: "",
    // ingredientPersons: Number,
    // cookingTime: Number,
    // recipeAthor: {},
})
onMounted(async () => {
  console.log("courseId")
  console.log(courseId.value)
  //處理成品圖片
  // let coursePic = await getTeacherImage(1)
  // let mainPicBody = coursePic.data
  // let mainPicHeader = coursePic.headers[`content-type`]
  // courseData.value.coursePictureList[0].pictureURL = `data:${mainPicBody[0]};base64,${mainPicBody[1]}`

  let course = await reqGetCourseData(1)
  let datas = course.data

  courseData.value.courseName = datas.courseName
  courseData.value.courseIntroduction = datas.courseIntroduction
  courseData.value.courseFeature = datas.courseFeature
  courseData.value.teacher = datas.teacher
  courseData.value.coursePrice = datas.coursePrice
  courseData.value.coursePlace=datas.coursePlace
  courseData.value.serviceTarget=datas.serviceTarget
  courseData.value.courseDate=datas.courseDate
  courseData.value.remainPlaces=datas.remainPlaces
})



</script>
<template>
  <div class="container">
    <h1>課程首頁</h1>
    <div class="row">
    <div class="col-12">
        <img src="images/course/cupcake.jpg" alt="" />
        <!-- <img :src="courseData.coursePictureList[0].pictureURL"> -->
          <h2>課程名稱：{{ courseData.courseName }}</h2>
          <h3>簡介：</h3>
          {{ courseData.courseIntroduction }}
          <!-- <p>
            歡迎來參加我們的創意甜點製作課程！這個課程將帶領您進入精彩的糖果世界，讓您學習如何製作令人垂涎三尺的甜點，從經典款到獨特的創意點心。
          </p> -->
          <h3>課程亮點：</h3>
          <p>
              <ul>
                <li>{{ courseData. courseFeature}}</li>
                  <!-- <li>學習多種甜點技巧：在我們的課程中，您將學習如何製作各種甜點，包括蛋糕、餅乾、巧克力製品、布丁等等。我們將教授您不同的技巧，從烘焙到裝飾，以確保您可以輕鬆創建美味的甜點。</li>
                  <li>實踐和專業指導：我們的專業廚師將提供一對一的指導，確保您瞭解每個步驟，並能夠成功製作出令人印象深刻的甜點。</li>
                  <li>發揮創意：我們鼓勵學生發揮創意，自由發揮。您將有機會設計和製作您自己的獨特甜點，展示您的烹飪風格。</li>
                  <li>美味品嚐：每堂課結束後，您都可以品嚐您自己製作的甜點，以及與其他學生分享您的成果。</li> -->
              </ul>
          </p>
          <h3>誰適合參加？</h3>
          <p>{{ courseData.serviceTarget }}</p>
          <!-- <p>這個課程適合任何喜愛甜點和烹飪的人，無論您是初學者還是有一些烹飪經驗。我們歡迎所有年齡層的學生。</p> -->
        </div>
        <div class="row">
        <div class="col-6"><h3>講師介紹</h3>
          <h4>{{ courseData.teacher.teacherName }}</h4>
          <!-- <h2>瑪麗亞·史密斯（Maria Smith）</h2> -->
          <h5>專業背景：</h5>
          <p>{{ courseData.teacher.teacherProfile }}</p>
      <!-- <p>瑪麗亞·史密斯是一位充滿激情且經驗豐富的甜點大師。她擁有烹飪藝術學士學位和糕點藝術碩士學位，並且在烹飪和糕點領域擁有超過15年的教學和實踐經驗。</p> --></div>
        
      <div class="col-6"><img src="images/course/teacher.jpg" alt=""></div>
        <div class="row page-section justify-content-center align-items-center">
          <h3>聯絡地址</h3>
          <p>{{ courseData.coursePlace }}</p>
          <!-- <h3> 801高雄市前金區中正四路211號8號樓之1</h3> -->
          <!-- <img class="col-8" src="../assets/images/course/map.jpg" alt="" style="width: 75%; height: 400px; object-fit: cover;"> -->
        </div>
      </div>
    </div>
    </div>
</template>
<style scoped>
img {
  width: 100%;
  max-height: 80vh;
  object-fit: cover;
  object-position: center;
}
</style>