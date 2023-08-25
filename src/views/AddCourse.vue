<template>
  <div v-if="isTeacher">新增課程</div>
  <div v-else>非教師用戶</div>
</template>
<script>
import { ref, onMounted } from "vue"
import { checkTeacherStatus } from "@/api"

const checkTeacher = ref([])

const datas = async () => {
  const res = await checkTeacherStatus()
  checkTeacher.value = res.data
}
onMounted(datas)
// import axios from "axios"

// export default {
//   mounted() {
//     this.checkTeacherStatus()
//   },
//   methods: {
//     checkTeacherStatus() {
//       axios
//         .get("/check-teacher")
//         .then((response) => {
//           // 如果 controller 返回 "You are a teacher."，則用戶是教師
//           console.log(response.data)
//           // 是教師=>可以到新增課程頁面
//           if (response.data === "You are a teacher.") {
//           } else {
//             // 不是教師，跳轉到登入畫面
//             this.$router.push("/login")
//           }
//         })
//         .catch((error) => {
//           console.error(error)
//         })
//     },
//   },
// }
</script>
