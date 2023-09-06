<template>
  <div class="container">
    <h1 align="center">修改教師個人資訊</h1>
    <div class="row">
      <table class="col-12 table table-hover align-middle">
        <thead class="table-secondary table-light">
          <tr>
            <th>編號</th>
            <th>教師姓名</th>
            <th>教師照片</th>
            <th>連絡電話</th>
            <th>email</th>
            <th>教學經歷</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in teacherInfo" :key="t.id">
            <td>{{ t.id }}</td>
            <td>{{ t.teacherName }}</td>
            <td>{{ t.teacherProfilePic }}</td>
            <td>{{ t.teacherTel }}</td>
            <td>{{ t.teacherMail }}</td>
            <td>{{ t.teacherProfile }}</td>

            <td><button>修改</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue"
import { editTeacherProfile } from "@/api"

let teacherId = 2

const teacherInfo = ref([])
const datas = async () => {
  const res = await editTeacherProfile(teacherId)
  teacherInfo.value.push(res.data)
}
onMounted(datas)
</script>
<style scoped></style>
