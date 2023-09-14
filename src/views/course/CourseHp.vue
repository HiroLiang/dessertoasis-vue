<script setup>
import HeaderShow from "@/components/HeaderShow.vue"
// import CourseCard from "@/components/CourseCard.vue"
// import Pagination from "@/components/Pagination.vue"
import CourseDisplay from "@/components/Standard/Display.vue"
import { getAllCourse, getCourse } from "@/api/index.js"
import { reactive, ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useSortCondition } from "../../stores/sortCondition.js"
//使用 pinia 整合搜索條件
const store = useSortCondition()
//使用 router
const router = useRouter()
const course = ref()
const courses = reactive([])
// const getkey = (key) => {
//   console.log("key:", key)
// }
// const getpage = async (page, pageSize) => {
//   console.log("Page:", page)
//   console.log("PageSize:", pageSize)

//   await fetchCourses(page, pageSize)
// }

const searchOptions = ref([
  { key: "coursePrice", label: "課程價格", type: "Number" },
  { key: "courseName", label: "課程名稱", type: "String" },
  { key: "teacherName", label: "老師姓名", type: "String" },
])
const row = ref(true)
const block = ref(true)
const categoryId = ref(1)
// const pageSize = ref(10)
const pageSize = ref([])
// const pages = ref()
const page = ref(1)

/**定義變數 */
//動態頁數
const pages = ref(1)
//表格陣列
const tableDatas = ref([])
//是否有資料
const hasTable = ref(true)

/**更新資料方法 */
//更新表格資料
const updateDatas = (datas) => {
  hasTable.value = true
  if (!datas) {
    hasTable.value = false
    return null
  }
  let array = datas.map((data) => ({
    id: data.id,
    // picture: data.coursePictureList.courseImgURL,
    name: data.courseName,
    // teacher: data.teacher.teacherName,
    teacher: data.teacherName,
    price: data.coursePrice,
    description: data.courseIntroduction,
  }))

  console.log("datas")
  console.log(array)
  tableDatas.value = array
  updatePages()
}

//更新總頁數
const updatePages = async () => {
  let num = await store.getCoursePages()
  pages.value = num.data
}

/**傳值送 Pinia 整合搜索條件 */
//換頁
const onGetPage = async (page) => {
  console.log("page")
  console.log(page)
  let result = await store.setCoursePageChange(page)
  if (result != null) {
    let datas = result.data
    updateDatas(datas)
    console.log(result.data)
  }
}

const onGetSelectedKey = (key) => {
  console.log("key")
  console.log(key)
}

//搜索條件(多筆)
const onGetSearchRules = async (rule) => {
  console.log("rule")
  console.log(rule)
  let result = await store.setCourseSearchRules(rule)
  if (result != null) {
    let datas = result.data
    updateDatas(datas)
    console.log(result.data)
  }
}

//排序條件(單筆)
const onGetSortRule = async (rule) => {
  let result = await store.setCourseSortBy(rule)
  if (result != null) {
    let datas = result.data
    updateDatas(datas)
  }
}

//數值範圍(單筆)
const onGetNumberRange = async (range) => {
  console.log("range")
  console.log(range)
  let result = await store.setCourseNumberRange(range)
  if (result != null) {
    let datas = result.data
    updateDatas(datas)
    console.log(result.data)
  }
}

//日期範圍(多筆)
const onGetDateRules = async (rules) => {
  let result = await store.setCourseDateRules(rules)
  if (result != null) {
    let datas = result.data
    updateDatas(datas)
  }
}

//取得修改的 id 並跳轉頁面 (路徑需自己指定)
const onGetEditId = (id) => {
  router.push({ path: "/", query: { id } })
}

/** 初始化資料 */
onMounted(async () => {
  let result = await store.setCoursePageChange([1, 10])
  if (result != null) {
    let datas = result.data
    updateDatas(datas)
  }
})
// const fetchCourses = async (page, pageSize) => {
//   try {
//     let result = await getCourse(page, pageSize)
//     let dataResponse = result.data
//     console.log(dataResponse)
//     if (dataResponse && Array.isArray(dataResponse.content)) {
//       let datas = dataResponse.content
//       datas.forEach((ele) => {
//         ele.category = ele.category.categoryName
//         ele.updateTime = new Date(ele.updateTime)
//       })

//       courses.value = datas.map((item) => ({
//         id: item.id,
//         picture: item.coursePictureList.courseImgURL,
//         name: item.courseName,
//         teacher: item.teacher.teacherName,
//         price: item.coursePrice,
//         description: item.courseIntroduction,
//       }))
//       pages.value = dataResponse.totalPages

//       console.log(courses.value)
//     } else {
//       console.error(
//         "Data from API is not in the expected format:",
//         dataResponse
//       )
//     }
//   } catch (error) {
//     console.error("Error fetching and processing data:", error)
//   }
// }
// onMounted(async () => {
//   fetchCourses(page.value, pageSize.value)
// })
</script>
<template>
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
    <!-- <CourseDisplay
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
    ></CourseDisplay> -->
    <CourseDisplay
      :products="tableDatas"
      :searchOptions="searchOptions"
      :pages="pages"
      :row="true"
      :block="true"
      :categoryId="categoryId"
      @get-selected-key="onGetSelectedKey"
      @get-search-rules="onGetSearchRules"
      @get-number-range="onGetNumberRange"
      @get-page="onGetPage"
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
