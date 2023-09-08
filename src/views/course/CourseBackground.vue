<script setup>
import { ref, onMounted, reactive, computed, watch } from "vue"
import SweetAlert from "SweetAlert2"
import StandardSearch from "../../components/Standard/Search.vue"
import { getAllCourses } from "@/api"
import { deleteCourse } from "@/api"

const courses = ref([])
const datas = async () => {
  try {
    const res = await getAllCourses()
    // 將從後端獲取的資料 courses 指定給 tableDatas
    // tableDatas.value = courses.value
    courses.value = res.data
  } catch (error) {
    console.error(error)
  }
}
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

/* 自定義方法 */
const emit = defineEmits([
  "get-selected-key",
  "get-edit-id",
  "get-search-rules",
  "get-number-range",
  "get-sort-rule",
  "change-page",
  "get-date-rules",
])

/* 定義傳入值 */
const props = defineProps({
  /*
    表格資料
    格式：[ { id : id , title1 : text1 ( , xxdatexx : Date ... ) } ]
    */
  tableDatas: {
    default: [],
  },
  /*
    表格標頭
    格式： [{ label : ' 展示名 ', key : ' key ' , type : ' 資料型態 '} , ...]
    */
  dataTitles: {
    default: [
      { label: "課程編號", key: "courseId", type: "Number" },
      { label: "課程名稱", key: "courseName", type: "String" },
      { label: "教師姓名", key: "teacherName", type: "String" },
      { label: "開課日期", key: "courseDate", type: "date" },
      { label: "報名截止", key: "closeDate", type: "date" },
      { label: "上課地點", key: "coursePlace", type: "String" },
      { label: "剩餘名額", key: "remainPlaces", type: "Number" },
      { label: "報名價格", key: "coursePrice", type: "Number" },
      { label: "課程分類", key: "categoryName", type: "String" },
      { label: "開課狀態", key: "courseStatus", type: "String" },
    ],
  },
  page: {
    default: 1,
  },
  pageSize: {
    default: 10,
  },
  pages: {
    default: 100,
  },
  courseId: {
    type: Number,
  },
})

/* 分頁資訊 */
//現在頁面
const page = ref(1)
//單頁筆數
const pageSize = ref(10)
//總頁數
const pages = computed(() => props.pages)
/* 排序資訊 */
//ASC or DESC
const sortWay = ref(true)
//排序key
const nowSortBy = ref("")
/* 定義傳出值方法 */
//傳出日期、模糊搜索條件 ( 可多值 )
const getRules = (rules) => {
  let dateRules = []
  let searchRules = []
  for (let i = 0; i < rules.length; i++) {
    if (rules[i].type === "Date") {
      dateRules.push(rules[i])
    } else {
      searchRules.push(rules[i])
    }
  }
  emit("get-date-rules", dateRules)
  emit("get-search-rules", searchRules)
}
//傳出數字範圍條件 ( 單一條件 )
const getNumberRange = (numberRange) => {
  emit("get-number-range", numberRange)
}
//傳出排序條件 ( 單一條件 )
const getSortRule = (key) => {
  if (nowSortBy.value != key) {
    nowSortBy.value = key
    sortWay.value = true
  }
  if (sortWay.value) {
    sortWay.value = false
    emit("get-sort-rule", [key, "ASC"])
  } else {
    sortWay.value = true
    emit("get-sort-rule", [key, "DESC"])
  }
}
//傳出修改對象 id ( 提供跳轉頁面後所需資料 )
const getEditId = (id) => {
  emit("get-edit-id", id)
}

//傳出 search key
const getKey = (key) => {
  emit("get-selected-key", key)
}

/* 一般方法 */
//格式化日期
const formattedDate = (date) => {
  const options = {
    year: "numeric",
    month: "narrow",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }

  return date.toLocaleDateString("zh-TW", options)
}
// console.log(formattedDate)
/* 監視屬性 */
//傳送換頁需求
watch(page, () => {
  console.log([page.value, pageSize.value])
  emit("change-page", [page.value, pageSize.value])
})
//傳送調整頁數大小
watch(pageSize, () => {
  page.value = 1
  console.log([page.value, pageSize.value])
  emit("change-page", [page.value, pageSize.value])
})
//防止超頁
watch(pages, () => {
  page.value = 1
})

/* 初始化需求 */
page.value = props.page
pageSize.value = props.pageSize

// onMounted(datas)
onMounted(() => {
  // 在組件掛載後獲取資料
  datas()
})
</script>
<template>
  <div class="container">
    <h1 align="center">所有課程列表</h1>
    <StandardSearch
      :searchOptions="props.dataTitles"
      @get-selected-key="getKey"
      @get-search-rules="getRules"
      @get-number-range="getNumberRange"
    />
    <div class="tableArea">
      <n-table :bordered="false" :single-line="false" size="small">
        <thead>
          <tr>
            <th>No.</th>
            <th
              v-for="title in props.dataTitles"
              @click="getSortRule(title.key)"
              class="sortableTh"
            >
              {{ title.label }}
              <font-awesome-icon
                v-if="nowSortBy === title.key && sortWay"
                :icon="['fas', 'angle-up']"
                size="2xs"
                style="color: #f80000"
              />
              <font-awesome-icon
                v-else-if="nowSortBy === title.key && !sortWay"
                :icon="['fas', 'angle-down']"
                size="2xs"
                style="color: #ff0000"
              />
              <font-awesome-icon
                v-else
                :icon="['fas', 'angle-down']"
                size="2xs"
              />
            </th>
            <th>修改</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in courses">
            <td>{{ index + 1 }}</td>
            <td v-for="title in props.dataTitles">
              <span v-if="title.type === 'String' || title.type === 'Number'">{{
                data[title.key]
              }}</span>
              <span v-else-if="title.type === 'Date'">{{
                formattedDate(data[title.key])
              }}</span>
              <!-- <span v-else-if="title.type === 'Date'">
                {{
                  data[title.key] ? formattedDate(data[title.key]) : ""
                }}</span
              > -->
              <span v-else>{{ data[title.key] }}</span>
            </td>
            <td>
              <!-- <router-link
                :to="{ name: 'CourseDetail', params: { id: data.id } }"
              > -->
              <n-button @click="getEditId(data.id)" strong secondary round
                >修改</n-button
              >
              <!-- </router-link> -->
              <n-button
                @click="deleteSingleCourse(data.courseId)"
                strong
                secondary
                round
                >刪除</n-button
              >
              <!-- 弹出框内容 -->
              <SweetAlert
                v-if="showSuccessAlert"
                type="success"
                title="删除成功"
                confirmButtonText="确定"
                @confirm="hideSuccessAlert"
              >
                课程已成功删除。
              </SweetAlert>
            </td>
          </tr>
        </tbody>
      </n-table>
    </div>
  </div>
</template>
<style scoped></style>
