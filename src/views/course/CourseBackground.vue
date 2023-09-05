<script setup>
import { ref, onMounted, reactive } from "vue"
import { getAllCourses } from "@/api"
import cmsTable from "../../components/Standard/Table.vue"

const courses = ref([])

const datas = async () => {
  const res = await getAllCourses()
  courses.value = res.data
}
const tableDatas = reactive([
  {
    id: 1,
    recipeID: 1,
    recipeTitle: "大恐龍1",
    time: 9,
    createdate: new Date("2020-01-01T11:11:00"),
  },
  {
    id: 2,
    recipeID: 2,
    recipeTitle: "大恐龍2",
    time: 99,
    createdate: new Date("2021-02-01T12:30:00"),
  },
  {
    id: 3,
    recipeID: 3,
    recipeTitle: "大恐龍n",
    time: 999,
    createdate: new Date("2022-11-30T23:11:00"),
  },
])

const title = reactive([
  { label: "課程編號", key: "courseID" },
  { label: "課程名稱", key: "courseName" },
  { label: "老師姓名", key: "teacherName" },
  { label: "開課狀態", key: "courseStatus" },
  { label: "開課日期", key: "courseStartDate" },
  { label: "開課時段", key: "" },
  { label: "上課地點", key: "" },
  { label: "課程分類", key: "" },
  { label: "開課人數", key: "" },
  { label: "報名人數", key: "" },
  { label: "剩餘名額", key: "" },
])

const getId = (id) => {
  console.log(id)
}

onMounted(datas)
</script>
<template>
  <div class="container">
    <h1 align="center">課程管理</h1>
    <div class="row">
      <table class="col-12 table table-hover align-middle">
        <thead class="table-secondary table-light">
          <tr>
            <th>編號</th>
            <th>教師姓名</th>
            <th>課程名稱</th>
            <th>開課狀態</th>
            <th>開課日期</th>
            <th>報名截止日期</th>
            <th>課程介紹</th>
            <th>上課地點</th>
            <th>課程分類</th>
            <th>開課人數</th>
            <th>報名人數</th>
            <th>剩餘名額</th>
            <th>報名價格</th>
            <th>課程圖片</th>
            <th>課程影片</th>
            <th>課程食譜</th>
            <th>課程標籤</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="{
              courseId,
              teacherName,
              courseName,
              courseStatus,
              courseDate,
              regDeadline,
              courseDescription,
              courseLocation,
              courseSortId,
              remainingPlaces,
              coursePrice,
              coursePictureUrl,
              courseVideoId,
              recipeId,
              tagId,
            } in courses"
            :key="courseId"
          >
            <td>{{ courseId }}</td>
            <td>{{ teacherName }}</td>
            <td>{{ courseName }}</td>
            <td>{{ courseStatus }}</td>
            <td>{{ courseDate }}</td>
            <td>{{ regDeadline }}</td>
            <td>{{ courseDescription }}</td>
            <td>{{ courseLocation }}</td>
            <td>{{ courseSortId }}</td>
            <td>{{ remainingPlaces }}</td>
            <td>{{ coursePrice }}</td>
            <td>{{ coursePictureUrl }}</td>
            <td>{{ courseVideoId }}</td>
            <td>{{ recipeId }}</td>
            <td>{{ tagId }}</td>
            <td><button>新增</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <cmsTable
      :dataTitles="title"
      :tableDatas="tableDatas"
      @get-edit-id="getId"
    ></cmsTable>
  </div>
</template>
<style scoped></style>
