<script setup>
import { reactive, ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useSortCondition } from "../../stores/sortCondition.js"
import { reqLoadPicture } from "../../api"
import { useLoadingBar } from 'naive-ui'
import CourseDisplay from "@/components/Standard/Display.vue"
import StandardSidebar from '../../components/Standard/Sidebar.vue'
import StandardFooter from '../../components/Footer.vue'

const loadingBar = useLoadingBar()
loadingBar.start()

//使用 pinia 整合搜索條件
const store = useSortCondition()
//使用 router
const router = useRouter()
const course = ref()
const courses = reactive([])

const searchOptions = ref([
  { key: "coursePrice", label: "課程價格", type: "Number" },
  { key: "courseName", label: "課程名稱", type: "String" },
  { key: "teacherName", label: "老師姓名", type: "String" },
])
const row = ref(true)
const block = ref(true)
const categoryId = ref(2)
const pageSize = ref(10)
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
    picture: 'https://media.istockphoto.com/id/932644828/vector/folder-icon.jpg?s=1024x1024&w=is&k=20&c=DlYT14mZlAGKNCYNoQSxTt4TASUW4zoeZbqdZ10rYb8=',
    name: data.courseName,
    // teacher: data.teacher.teacherName,
    teacher: data.teacherName,
    price: data.coursePrice,
    description: data.courseIntroduction,
    url: data.courseImgURL
  }))

  console.log("datas")
  console.log(datas)
  tableDatas.value = array
  //更新頁數
  updatePages()
  //加載圖片
  tableDatas.value.forEach(data => {
    loadPicture(data)
  })

}
//異步加載圖片
const loadPicture = async (data) => {
  let result = await reqLoadPicture(data.url)
  data.picture = result.data
}

//更新總頁數
const updatePages = async () => {
  let num = await store.getCoursePages()
  pages.value = num.data
  console.log(pages.value);
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

const onGetCategoryId = (id => {

})

/** 初始化資料 */
onMounted(async () => {
  let result = await store.setCoursePageChange([1, 10])
  if (result != null) {
    let datas = result.data
    updateDatas(datas)
    loadingBar.finish()
  }
})
</script>
<template>
  <CourseDisplay :products="tableDatas" :searchOptions="searchOptions" :pages="pages" :row="true" :block="true"
    :categoryId="categoryId" @get-selected-key="onGetSelectedKey" @get-search-rules="onGetSearchRules"
    @get-number-range="onGetNumberRange" @get-page="onGetPage"></CourseDisplay>
  <StandardSidebar :categoryId="categoryId" @get-category-id="onGetCategoryId" />
  <StandardFooter />
</template>
<style scoped></style>
