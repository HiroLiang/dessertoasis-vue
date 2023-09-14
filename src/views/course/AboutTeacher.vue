<script setup>
// import NavBar from "@/components/NavBar.vue"
import { reactive, ref, onMounted } from "vue"
import TeacherDisplay from "@/components/Standard/Display.vue"
import { useRouter } from "vue-router"
import { useSortCondition } from "../../stores/sortCondition.js"
//使用 pinia 整合搜索條件
const store = useSortCondition()
//使用 router
const router = useRouter()
const searchOptions = ref([
  { key: "coursePrice", label: "課程價格", type: "Number" },
  { key: "courseName", label: "課程名稱", type: "String" },
  { key: "teacherName", label: "老師姓名", type: "String" },
])
const row = ref(true)
const block = ref(true)
const categoryId = ref(1)
const pageSize = ref([])
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
    // name: data.courseName,
    // teacher: data.teacher.teacherName,
    teacher: data.teacherName,
    // price: data.coursePrice,
    // description: data.courseIntroduction,
  }))

  console.log("datas")
  console.log(array)
  tableDatas.value = array
  updatePages()
}
//更新總頁數
const updatePages = async () => {
  let num = await store.getTeacherPages()
  pages.value = num.data
}

/**傳值送 Pinia 整合搜索條件 */
//換頁
const onGetPage = async (page) => {
  console.log("page")
  console.log(page)
  let result = await store.setTeacherPageChange(page)
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
  let result = await store.setTeacherSearchRules(rule)
  if (result != null) {
    let datas = result.data
    updateDatas(datas)
    console.log(result.data)
  }
}

//排序條件(單筆)
const onGetSortRule = async (rule) => {
  let result = await store.setTeacherSortBy(rule)
  if (result != null) {
    let datas = result.data
    updateDatas(datas)
  }
}

//數值範圍(單筆)
const onGetNumberRange = async (range) => {
  console.log("range")
  console.log(range)
  let result = await store.setTeacherNumberRange(range)
  if (result != null) {
    let datas = result.data
    updateDatas(datas)
    console.log(result.data)
  }
}

//日期範圍(多筆)
const onGetDateRules = async (rules) => {
  let result = await store.setTeacherDateRules(rules)
  if (result != null) {
    let datas = result.data
    updateDatas(datas)
  }
}

//取得修改的 id 並跳轉頁面 (路徑需自己指定)
const onGetEditId = (id) => {
  router.push({ path: "/", query: { id } })
}

// const navBarList = reactive([
//   { title: "食譜", toUrl: "/recipes" },
//   { title: "課程", toUrl: "/courses" },
//   { title: "商品", toUrl: "/product" },
//   { title: "預約甜點教室", toUrl: "/reservation" },
//   {
//     title: "關於教師",
//     toUrl: "/courses/aboutTeacher",
//   },
// ])

/** 初始化資料 */
onMounted(async () => {
  let result = await store.setTeacherPageChange([1, 10])
  if (result != null) {
    let datas = result.data
    updateDatas(datas)
  }
})
</script>
<template>
  <!-- <NavBar :NavBarList="navBarList" /> -->

  <h1>關於教師</h1>

  <TeacherDisplay
    :products="tableDatas"
    :searchOptions="searchOptions"
    :pages="pages"
    :row="true"
    :block="false"
    :categoryId="categoryId"
    @get-selected-key="onGetSelectedKey"
    @get-search-rules="onGetSearchRules"
    @get-number-range="onGetNumberRange"
    @get-page="onGetPage"
  ></TeacherDisplay>
  <!-- <RouterView></RouterView> -->
</template>
<style scoped></style>
