<script setup>
import { ref, computed, onMounted, watch, onBeforeUnmount } from "vue"
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

const searchOptions = ref([
  { key: "courseName", label: "課程名稱", type: "String" },
  { key: "teacherName", label: "老師姓名", type: "String" },
  { key: "coursePrice", label: "課程價格", type: "Number" },
])

/**定義變數 */
//動態頁數
const pages = ref(1)

//搜索數值範圍
const numberRanges = ref([])

//表格陣列
const tableDatas = ref([])

//是否有資料
const hasTable = ref(true)

//傳值搜索條件
const emitSearch = ref([])

//分類搜索
const catSearch = ref([])

//只顯示已啟用的課程
const activedCourse = [{ key: 'courseStatus', type: 'String', input: '啟用' }]

//整合搜索條件
const searchRules = computed(() => {
  return emitSearch.value.concat(catSearch.value).concat(activedCourse)
})

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

  tableDatas.value = array
  //更新頁數
  updatePages()
  //加載圖片
  tableDatas.value.forEach(async data => {
    await loadPicture(data)
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
}

/**傳值送 Pinia 整合搜索條件 */
//換頁
const onGetPage = async (page) => {
  let result = await store.setCoursePageChange(page)
  if (result != null) {
    let datas = result.data
    updateDatas(datas)
  }
}

const onGetSelectedKey = (id) => {
  router.push({ path: '/courses/EnrollCourse', query: { id } })
}

//搜索條件(多筆)
const onGetSearchRules = rule => {
  emitSearch.value = rule
}
//搜索分類
const onGetCategoryId = id => {
  if (id === null) {
    catSearch.value = []
  } else {
    catSearch.value = [{ key: 'categoryId', type: 'Number', input: id }]
  }
}

//數值範圍(單筆)
const onGetNumberRange = async (range) => {
  let result = await store.setCourseNumberRange(range)
  if (result != null) {
    let datas = result.data
    updateDatas(datas)
  }
}

const onGetSelectedLabel = (label) => {
  searchOptions.value.forEach(async option => {
    if (option.key === label && option.type === 'Number') {
      let result = await store.getCourseNumberRange(label)
      let range = result.data
      numberRanges.value = [{ key: label, max: range[0], min: range[1] }]
    }
  })
}

watch(searchRules, async () => {
  let result = await store.setCourseSearchRules(searchRules.value)
  if (result != null) {
    let datas = result.data
    updateDatas(datas)
  }
}, { immediate: true })

/** 初始化資料 */
onMounted(async () => {
  let result = await store.setCoursePageChange([1, 10])
  if (result != null) {
    let datas = result.data
    updateDatas(datas)
    loadingBar.finish()
  }
})

onBeforeUnmount(() => {
  store.resetCondition()
})
</script>
<template>
  <CourseDisplay :numberRanges="numberRanges" :products="tableDatas" :searchOptions="searchOptions" :pages="pages"
    :row="true" :block="true" :categoryId="2" @get-selected-key="onGetSelectedKey" @get-search-rules="onGetSearchRules"
    @get-number-range="onGetNumberRange" @get-page="onGetPage" @get-selected-label="onGetSelectedLabel"></CourseDisplay>
  <StandardSidebar :categoryId="2" @get-category-id="onGetCategoryId" />
  <StandardFooter />
</template>
<style scoped></style>
