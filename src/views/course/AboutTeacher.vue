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
  // { key: "coursePrice", label: "課程價格", type: "Number" },
  // { key: "courseName", label: "課程名稱", type: "String" },
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
    picture: data.pictureURL,
    name: data.teacherName,
    // teacher: data.account,
    // price: data.coursePrice,
    // description: data.teacherProfile,
  }))

  console.log("datas")
  console.log(array)
  tableDatas.value = array
  updatePages()
}
//更新總頁數
const updatePages = async () => {
  let num = await store.getFrontTeacherPages()
  pages.value = num.data
}

/**傳值送 Pinia 整合搜索條件 */
//換頁
const onGetPage = async (page) => {
  console.log("page")
  console.log(page)
  let result = await store.setFrontTeacherPageChange(page)
  if (result != null) {
    let datas = result.data
    updateDatas(datas)
    console.log(result.data)
  }
}

//取得修改的 id 並跳轉頁面 (路徑需自己指定)
const onGetSelectedKey = (key) => {
  console.log("key")
  console.log(key)
  router.push({ path: "/courses/oneTeacher", query: { id: key } })
}

//搜索條件(多筆)
const onGetSearchRules = async (rule) => {
  console.log("rule")
  console.log(rule)
  let result = await store.setFrontTeacherSearchRules(rule)
  if (result != null) {
    let datas = result.data
    updateDatas(datas)
    console.log(result.data)
  }
}

//排序條件(單筆)
const onGetSortRule = async (rule) => {
  let result = await store.setFrontTeacherSortBy(rule)
  if (result != null) {
    let datas = result.data
    updateDatas(datas)
  }
}

//數值範圍(單筆)
const onGetNumberRange = async (range) => {
  console.log("range")
  console.log(range)
  let result = await store.setFrontTeacherNumberRange(range)
  if (result != null) {
    let datas = result.data
    updateDatas(datas)
    console.log(result.data)
  }
}

//日期範圍(多筆)
const onGetDateRules = async (rules) => {
  let result = await store.setFrontTeacherDateRules(rules)
  if (result != null) {
    let datas = result.data
    updateDatas(datas)
  }
}

/** 初始化資料 */
onMounted(async () => {
  let result = await store.setFrontTeacherPageChange([1, 10])
  if (result != null) {
    let datas = result.data
    updateDatas(datas)
  }
})
</script>
<template>
  <!-- <NavBar :NavBarList="navBarList" /> -->
  <div class="container">
    <h1 style="margin-top: 30px">關於教師</h1>
  </div>
  <!-- <button @click="onGetEditId(1)">跳轉到單一教師頁面測試</button> -->
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
