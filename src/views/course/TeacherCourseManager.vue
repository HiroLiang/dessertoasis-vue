<script setup>
import { ref, onMounted, reactive, computed, watch } from "vue"
import cmsTable from "../../components/Standard/Table.vue"
import StandardSearch from "../../components/Standard/Search.vue"
import { getCoursesByTeacherId } from "@/api"

const allCourses = ref([])
const teacherId = ref(2) //預設為編號2老師的所有課程

const datas = async () => {
  const response = await getCoursesByTeacherId(teacherId.value)
  // teacherId.value=
  allCourses.value = response.data
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

const props = defineProps({
  tableDatas: {
    default: [],
  },
  dataTitles: {
    default: [
      { label: "課程名稱", key: "courseName", type: "String" },
      { label: "開課日期", key: "courseDate", type: "date" },
      { label: "截止日期", key: "closeDate", type: "date" },
      { label: "開課人數", key: "", type: "Number" },
      { label: "已報名人數", key: "remainPlaces", type: "Number" },
      { label: "報名價格", key: "coursePrice", type: "Number" },
      { label: "最後更新日期", key: "updateDate", type: "date" },
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
})

const page = ref(1)

const pageSize = ref(10)

const pages = computed(() => props.pages)

const sortWay = ref(true)

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

const getId = (id) => {
  console.log(id)
}
onMounted(() => {
  datas()
})
</script>
<template>
  <div class="container">
    <h1>我的課程管理</h1>
    <div class="row">
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
            <tr v-for="(data, index) in allCourses">
              <td>{{ index + 1 }}</td>
              <td v-for="title in props.dataTitles">
                <span
                  v-if="title.type === 'String' || title.type === 'Number'"
                  >{{ data[title.key] }}</span
                >
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
                <n-button @click="getEditId(data.id)" strong secondary round
                  >修改</n-button
                >
                <n-button
                  @click="deleteSingleCourse(data.id)"
                  strong
                  secondary
                  round
                  >刪除</n-button
                >
              </td>
            </tr>
          </tbody>
        </n-table>
        <!-- <table class="col-12 table">
        <thead class="table-secondary table-light">
          <tr>
            <th>編號</th>
            <th>名稱</th>
            <th>介紹</th>
            <th>開課日期</th>
            <th>報名截止日期</th>
            <th>開課人數</th>
            <th>已報名人數</th>
            <th>價格</th>
            <th>圖片</th>
            <th>學生名單</th>
            <th>建立日期</th>
            <th>最後修改日期</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
     -->
      </div>
    </div>
  </div>
</template>
<style scoped></style>
