<script setup>
import { ref, onMounted, reactive, computed, watch } from "vue"
import SweetAlert from "SweetAlert2"
//import StandardSearch from "../../components/Standard/Search.vue"
import CourseDetail from "@/components/CourseDetail.vue" // 导入显示课程详细信息的组件

import { useRouter } from "vue-router"
import StandardTable from "../../../components/Standard/Table.vue"
import { useSortCondition } from "../../../stores/sortCondition.js"

import { getAllCourses } from "@/api"
import { deleteCourse } from "@/api"
import { showSingleCourse } from "@/api"

//使用 pinia 整合搜索條件
const store = useSortCondition()
//使用 router
const router = useRouter()

/**定義變數 */
//動態頁數
const pages = ref(1)
//表格陣列
const tableDatas = ref([])
//是否有資料
const hasTable = ref(true)

//設定查詢表格標題
const dataTitles = ref([
  // { label: "課程編號", key: "courseId", type: "String" },
  { label: "教師姓名", key: "teacherName", type: "String" },
  { label: "課程名稱", key: "courseName", type: "String" },

  { label: "開課日期", key: "courseDate", type: "Date" },
  { label: "報名截止", key: "closeDate", type: "Date" },
  { label: "上課地點", key: "coursePlace", type: "String" },
  { label: "剩餘名額", key: "remainPlaces", type: "Number" },
  { label: "報名價格", key: "coursePrice", type: "Number" },
  // { label: "課程分類", key: "categoryName", type: "String" },
  { label: "開課狀態", key: "courseStatus", type: "String" },
])
/**更新資料方法 */
//更新表格資料
const updateDatas = (datas) => {
  hasTable.value = true
  if (!datas) {
    hasTable.value = false
    return null
  }
  datas.forEach((data) => {
    dataTitles.value.forEach((title) => {
      if (title.type === "Date") {
        data[title.key] = new Date(data[title.key])
      }
    })
  })
  tableDatas.value = datas
  updatePages()
}

//更新總頁數
const updatePages = async () => {
  let num = await store.getCoursePages()
  pages.value = num.data
}

/**傳值送 Pinia 整合搜索條件 */
//換頁
const onGetPage = async (newPage) => {
  let result = await store.setCoursePageChange(newPage)
  if (result != null) {
    let datas = result.data
    updateDatas(datas)
  }
}
//搜索條件(多筆)
const onGetSearchRules = async (rules) => {
  let result = await store.setCourseSearchRules(rules)
  if (result != null) {
    let datas = result.data
    updateDatas(datas)
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
  let result = await store.setCourseNumberRange(range)
  if (result != null) {
    let datas = result.data
    updateDatas(datas)
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
  router.push({ path: "/cms/editCourse", query: { id } })
}

// const courses = ref([])
// const datas = async () => {
//   try {
//     const res = await getAllCourses()
//     // 將從後端獲取的資料 courses 指定給 tableDatas
//     // tableDatas.value = courses.value
//     courses.value = res.data
//   } catch (error) {
//     console.error(error)
//   }
// }
const showSuccessAlert = ref(false)
const deleteSingleCourse = async (courseId) => {
  try {
    const response = await deleteCourse(courseId)
    console.log(response)
    if (response.status === 200) {
      // 删除成功，显示 SweetAlert2 提示框
      SweetAlert.fire({
        icon: "success",
        title: "删除成功",
      })
      // 更新数据
      datas()
    } else {
      console.log("刪除課程失敗")
    }
  } catch (error) {
    console.log(response)
    console.error(error)
  }
}

const hideSuccessAlert = () => {
  showSuccessAlert.value = false
}
/** 初始化資料 */
onMounted(async () => {
  let result = await store.setCoursePageChange([1, 10])
  if (result != null) {
    let datas = result.data
    updateDatas(datas)
  }
})

/* 自定義方法 */
// const emit = defineEmits([
//   "get-selected-key",
//   "get-edit-id",
//   "get-search-rules",
//   "get-number-range",
//   "get-sort-rule",
//   "change-page",
//   "get-date-rules",
// ])

/* 定義傳入值 */
// const props = defineProps({
/*
    表格資料
    格式：[ { id : id , title1 : text1 ( , xxdatexx : Date ... ) } ]
    */
// tableDatas: {
//   default: [],
// },
/*
    表格標頭
    格式： [{ label : ' 展示名 ', key : ' key ' , type : ' 資料型態 '} , ...]
    */
// dataTitles: {
//   default: [
//     { label: "課程編號", key: "courseId", type: "Number" },
//     { label: "課程名稱", key: "courseName", type: "String" },
//     { label: "教師姓名", key: "teacherName", type: "String" },
//     { label: "開課日期", key: "courseDate", type: "date" },
//     { label: "報名截止", key: "closeDate", type: "date" },
//     { label: "上課地點", key: "coursePlace", type: "String" },
//     { label: "剩餘名額", key: "remainPlaces", type: "Number" },
//     { label: "報名價格", key: "coursePrice", type: "Number" },
//     { label: "課程分類", key: "categoryName", type: "String" },
//     { label: "開課狀態", key: "courseStatus", type: "String" },
//   ],
// },
//   page: {
//     default: 1,
//   },
//   pageSize: {
//     default: 10,
//   },
//   pages: {
//     default: 100,
//   },
//   courseId: {
//     type: Number,
//   },
// })

// /* 分頁資訊 */
// //現在頁面
// const page = ref(1)
// //單頁筆數
// const pageSize = ref(10)
// //總頁數
// const pages = computed(() => props.pages)
// /* 排序資訊 */
// //ASC or DESC
// const sortWay = ref(true)
// //排序key
// const nowSortBy = ref("")
/* 定義傳出值方法 */
//傳出日期、模糊搜索條件 ( 可多值 )
// const getRules = (rules) => {
//   let dateRules = []
//   let searchRules = []
//   for (let i = 0; i < rules.length; i++) {
//     if (rules[i].type === "Date") {
//       dateRules.push(rules[i])
//     } else {
//       searchRules.push(rules[i])
//     }
//   }
//   emit("get-date-rules", dateRules)
//   emit("get-search-rules", searchRules)
// }
// //傳出數字範圍條件 ( 單一條件 )
// const getNumberRange = (numberRange) => {
//   emit("get-number-range", numberRange)
// }
// //傳出排序條件 ( 單一條件 )
// const getSortRule = (key) => {
//   if (nowSortBy.value != key) {
//     nowSortBy.value = key
//     sortWay.value = true
//   }
//   if (sortWay.value) {
//     sortWay.value = false
//     emit("get-sort-rule", [key, "ASC"])
//   } else {
//     sortWay.value = true
//     emit("get-sort-rule", [key, "DESC"])
//   }
// }
// //傳出修改對象 id ( 提供跳轉頁面後所需資料 )
// const getEditId = (id) => {
//   emit("get-edit-id", id)
// }

// //傳出 search key
// const getKey = (key) => {
//   emit("get-selected-key", key)
// }

// /* 一般方法 */
// //格式化日期
// const formattedDate = (date) => {
//   const options = {
//     year: "numeric",
//     month: "narrow",
//     day: "2-digit",
//     hour: "2-digit",
//     minute: "2-digit",
//   }

//   return date.toLocaleDateString("zh-TW", options)
// }
// // console.log(formattedDate)
// /* 監視屬性 */
// //傳送換頁需求
// watch(page, () => {
//   console.log([page.value, pageSize.value])
//   emit("change-page", [page.value, pageSize.value])
// })
// //傳送調整頁數大小
// watch(pageSize, () => {
//   page.value = 1
//   console.log([page.value, pageSize.value])
//   emit("change-page", [page.value, pageSize.value])
// })
// //防止超頁
// watch(pages, () => {
//   page.value = 1
// })

// /* 初始化需求 */
// page.value = props.page
// pageSize.value = props.pageSize

const showModal = ref(false) // 控制模态框显示/隐藏
const selectedCourseId = ref(null) // 存储选中的课程 ID

// 当点击 "修改" 按钮时，显示模态框并设置选定课程的ID
const showCourseDetail = (courseId) => {
  selectedCourseId.value = courseId
  showModal.value = true
}

// 关闭模态框
const closeModal = () => {
  showModal.value = false
}

// onMounted(datas)
// onMounted(() => {
//   // 在組件掛載後獲取資料
//   datas()
// })
</script>
<template>
  <!-- <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
      ">
    <h1>所有課程列表</h1>
  </div> -->
  <!-- <StandardSearch
      :searchOptions="props.dataTitles"
      @get-selected-key="getKey"
      @get-search-rules="getRules"
      @get-number-range="getNumberRange"
    /> -->
  <p v-if="!hasTable">*無權限或查詢失敗</p>
  <StandardTable :page="1" :pageSize="10" :pages="pages" :tableDatas="tableDatas" :dataTitles="dataTitles"
    @get-edit-id="onGetEditId" @get-number-range="onGetNumberRange" @get-sort-rule="onGetSortRule"
    @get-search-rules="onGetSearchRules" @change-page="onGetPage" @get-date-rules="onGetDateRules" />
</template>
<style scoped>
h1 {
  font-size: 28px;
}
</style>
