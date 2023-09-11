<script setup>
import NavBar from "@/components/NavBar.vue"
import HeaderShow from "@/components/HeaderShow.vue"
// import CourseCard from "@/components/CourseCard.vue"
// import Pagination from "@/components/Pagination.vue"
import CourseDisplay from "@/components/Standard/Display.vue"
import { getAllCourse, getCourse } from "@/api/index.js"
import { reactive, ref, onMounted } from "vue"
const course = ref()
const courses = ref([])
const getkey = (key) => {
  console.log("key:", key)
}
const getpage = async (page, pageSize) => {
  console.log("Page:", page)
  console.log("PageSize:", pageSize)

  await fetchCourses(page, pageSize)
}

const searchOptions = ref([
  { key: "price", label: "價格", type: "Number" },
  { key: "name", label: "課程名稱", type: "String" },
])
const row = ref(true)
const block = ref(true)
const categoryId = ref(1)
const pageSize = ref(10)
const pages = ref()
const page = ref(1)
const navBarList = reactive([
  { title: "食譜", toUrl: "/recipes" },
  { title: "課程", toUrl: "/courses" },
  { title: "商品", toUrl: "/producthome" },
  { title: "預約甜點教室", toUrl: "/reservation" },
  {
    title: "關於教師",
    toUrl: "/courses/aboutTeacher",
  },
])
const fetchCourses = async (page, pageSize) => {
  try {
    let result = await getCourse(page, pageSize)
    let dataResponse = result.data
    console.log(dataResponse)
    if (dataResponse && Array.isArray(dataResponse.content)) {
      let datas = dataResponse.content
      datas.forEach((ele) => {
        ele.category = ele.category.categoryName
        ele.updateTime = new Date(ele.updateTime)
      })

      courses.value = datas.map((item) => ({
        id: item.id,
        picture: item.coursePictureList[0].courseImgURL,
        name: item.courseName,
        teacher: item.teacher.teacherName,
        price: item.coursePrice,
        description: item.courseIntroduction,
      }))
      pages.value = dataResponse.totalPages

      console.log(courses.value)
    } else {
      console.error(
        "Data from API is not in the expected format:",
        dataResponse
      )
    }
  } catch (error) {
    console.error("Error fetching and processing data:", error)
  }
}
onMounted(async () => {
  fetchCourses(page.value, pageSize.value)
})
</script>
<template>
  <NavBar :NavBarList="navBarList" />
  <HeaderShow />
  <!-- RouterView 放會變的東西 -->
  <!-- <RouterView/> -->
  <!-- <div class="container"> -->
  <!-- <carousel></carousel> -->
  <!-- 導航層次結構 -->
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item active"><a href="#">首頁</a></li>
    </ol>
  </nav>
  <!-- 成為老師按鈕 -->
  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
    <button class="btn btn-primary me-md-2" type="button">成為老師</button>
  </div>
  <h1>推薦課程</h1>
  <!-- 搜尋課程 -->
  <!-- <nav class="row">
      <div class="col-6 center">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            aria-label="Text input with dropdown button"
          />
          <button
            class="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            分類
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li><a class="dropdown-item" href="#">Separated link</a></li>
          </ul>
        </div>
      </div>
    </nav> -->

  <!-- 課程分類右方選單 -->
  <!-- <aside class="dropdown">
      <a href="#" class="dropdown-btn">課程分類</a>
      <ul class="menu">
        <li><a href="#">推薦課程</a></li>
        <li><a href="#">適合新手</a></li>
        <li><a href="#">一日課程</a></li>
      </ul>
    </aside> -->

  <!-- 課程卡片 -->
  <!-- <main class="row">
      <CourseCard></CourseCard>
      <CourseCard></CourseCard>
      <CourseCard></CourseCard>
      <CourseCard></CourseCard>
      <CourseCard></CourseCard>
      <CourseCard></CourseCard>
      <CourseCard></CourseCard>
      <CourseCard></CourseCard>
    </main> -->
  <div class="CourseDisplay">
    <CourseDisplay
      :products="courses"
      :searchOptions="searchOptions"
      :page="page"
      :pages="pages"
      :row="row"
      :block="block"
      :categoryId="categoryId"
      :pageSize="pageSize"
      @get-selected-key="getkey"
      @get-search-rules="getsearch"
      @get-number-range="getrange"
      @get-page="getpage"
    ></CourseDisplay>
  </div>

  <!-- 分頁 -->
  <!-- <Pagination></Pagination> -->
  <!-- </div> -->
</template>
<style scoped>
* {
  box-sizing: border-box;
  list-style: none;
  /* outline: 1px solid #000; */
}

.dropdown {
  display: block;
  width: 30px;
  position: fixed;
  bottom: 150px;
  left: 0px;
  z-index: 10;
  background-color: #abc;
  text-align: center;
  line-height: 1.5;
  padding: 2px;
  border-radius: 0 5px 5px 0;
}

.dropdown-btn {
  display: inline-block;
  color: white;
  text-decoration: none;
}

.dropdown .menu {
  position: absolute;
  top: 0;
  margin: 0;
  padding: 0;
  display: none;
  width: 150px;

  /* box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2); */
}

.dropdown .menu a {
  text-decoration: none;
  display: block;
  background-color: grey;
  text-align: center;
  padding: 5px;
  color: white;
  /* 停留時間 */
  transition: all 0.5s ease;
  /* border-radius: 0 5px 0 5px; */
}

/* hover 後的下拉選單 */
.dropdown:hover .menu {
  display: block;
}

.dropdown .menu a:hover {
  background: #eee;
  color: #000;
}
</style>
