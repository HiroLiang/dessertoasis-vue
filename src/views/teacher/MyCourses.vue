<script setup>
import { ref, watch, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import { useSortCondition } from "../../stores/sortCondition.js"
import CourseDisplay from "@/components/Standard/Display.vue"
const router = useRouter()
//使用 pinia 整合搜索條件
const store = useSortCondition()
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
    name: data.courseName,
    // teacher: data.teacher.teacherName,
    // teacher: data.teacherName,
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
</script>
<template>
  <div style="position: relative" class="mb-5">
    <button
      class="btn btn-outline-primary btn-lg"
      style="position: absolute; right: 100px; top: 20px"
    >
      新增課程
    </button>
    <h1>我的課程</h1>
  </div>
  <CourseDisplay
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
  ></CourseDisplay>
</template>
