<script setup>
import { ref, onMounted, reactive } from "vue"
import cmsTable from "../../components/Standard/Table.vue"
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
  { label: "編號", key: "recipeID" },
  { label: "名稱", key: "recipeTitle" },
  { label: "簡介", key: "createdate" },
  { label: "分類", key: "categoryID" },
  { label: "撰寫者", key: "recipeAuthorID" },
  { label: "製作時間", key: "cookingTime" },
  { label: "難易度", key: "difficulty" },
  { label: "步驟內容", key: "recipeSteps" },
  { label: "建立時間", key: "recipeCreateDate" },
  { label: "訪問計數器", key: "recipeVisitCount" },
  { label: "公開狀態", key: "recipeStatus" },
])

const getId = (id) => {
  console.log(id)
}
</script>
<template>
  <div class="container">
    <h1>我的課程管理</h1>
    <div class="row">
      <table class="col-12 table">
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
    <cmsTable
      :dataTitles="title"
      :tableDatas="tableDatas"
      @get-edit-id="getId"
    ></cmsTable>
  </div>
</template>
<style scoped></style>
