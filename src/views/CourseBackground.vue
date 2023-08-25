<script setup lang="ts">
import { ref, onMounted } from "vue"
import { getAllCourses } from "../api/index.js"

const courses = ref([])

const datas = async () => {
  const res = await getAllCourses()
  courses.value = res.data
}
onMounted(datas)
</script>
<template>
  <div class="container">
    <h1 align="center">課程管理</h1>
    <div class="row">
      <table class="col-12">
        <thead>
          <tr>
            <th>編號</th>
            <th>教師姓名</th>
            <th>名稱</th>
            <th>狀態</th>
            <th>開課日期</th>
            <th>報名截止日期</th>
            <th>課程介紹</th>
            <th>上課地點</th>
            <th>分類</th>
            <th>剩餘名額</th>
            <th>報名價格</th>
            <th>課程圖片</th>
            <th>課程影片</th>
            <th>課程食譜</th>
            <th>課程標籤</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="{
              courseId,
              teacherId,
              courseName,
              courseStatus,
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
            <td>{{ teacherId }}</td>
            <td>{{ courseName }}</td>
            <td>{{ courseStatus }}</td>
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
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style scoped></style>
