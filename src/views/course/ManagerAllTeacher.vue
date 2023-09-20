<script setup>
import { ref, onMounted, reactive, computed, watch } from "vue"
import SweetAlert from "SweetAlert2"
import { useRouter } from "vue-router"
import StandardTable from "../../components/Standard/Table.vue"
import { useSortCondition } from "../../stores/sortCondition.js"
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
  { label: "教師姓名", key: "teacherName", type: "String" },
  { label: "老師電話", key: "teacherTel", type: "String" },
  { label: "老師信箱", key: "teacherMail", type: "String" },
  { label: "教師合約", key: "teacherContract", type: "String" },
  { label: "帳號狀態", key: "teacherAccountStatus", type: "String" },
  // { label: "剩餘名額", key: "remainPlaces", type: "String" },
  // { label: "報名價格", key: "coursePrice", type: "String" },
  // { label: "課程分類", key: "categoryName", type: "String" },
  { label: "會員名稱", key: "account", type: "String" },
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
  let num = await store.getTeacherPages()
  pages.value = num.data
}

/**傳值送 Pinia 整合搜索條件 */
//換頁
const onGetPage = async (newPage) => {
  let result = await store.setTeacherPageChange(newPage)
  if (result != null) {
    let datas = result.data
    updateDatas(datas)
  }
}

//搜索條件(多筆)
const onGetSearchRules = async (rules) => {
  let result = await store.setTeacherSearchRules(rules)
  if (result != null) {
    let datas = result.data
    updateDatas(datas)
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
  let result = await store.setTeacherNumberRange(range)
  if (result != null) {
    let datas = result.data
    updateDatas(datas)
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
  router.push({ path: "/cms/editTeacher", query: { id } })
}

const showSuccessAlert = ref(false)
// const deleteSingleCourse = async (courseId) => {
//   try {
//     const response = await deleteCourse(courseId)
//     console.log(response)
//     if (response.status === 200) {
//       // 删除成功，显示 SweetAlert2 提示框
//       SweetAlert.fire({
//         icon: "success",
//         title: "删除成功",
//       })
//       // 更新数据
//       datas()
//     } else {
//       console.log("刪除課程失敗")
//     }
//   } catch (error) {
//     console.log(response)
//     console.error(error)
//   }
// }

const hideSuccessAlert = () => {
  showSuccessAlert.value = false
}

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
  <div class="container">
    <h1
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
      "
    >
      所有教師列表
    </h1>
    <p v-if="!hasTable">*無權限或查詢失敗</p>
    <StandardTable
      :page="1"
      :pageSize="10"
      :pages="pages"
      :tableDatas="tableDatas"
      :dataTitles="dataTitles"
      @get-edit-id="onGetEditId"
      @get-number-range="onGetNumberRange"
      @get-sort-rule="onGetSortRule"
      @get-search-rules="onGetSearchRules"
      @change-page="onGetPage"
      @get-date-rules="onGetDateRules"
    />
  </div>
</template>
<style scoped>
h1 {
  font-size: 28px;
}
</style>
