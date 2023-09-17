<script setup>
import { reactive, computed, ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { getTeacher, editTeacherProfile, reqSession } from "@/api"
const router = useRouter()
// const teacherId = computed(() => {
//   console.log(router.query)
//   return router.query.id
// })
const teacherId = ref("")
const memberId = ref("")
// const teacherName = ref("aa")
// 使用ref初始化teacherData
const teacherData = ref({
  teacherName: "",
  // 其他属性
})

const getTeacherData = async () => {
  //   console.log(teacherId.value)

  // const sessionResponse = await reqSession()
  // const sessionData = sessionResponse.data

  // memberId.value = sessionData.id
  // console.log(memberId)
  // teacherId.value = sessionData.id
  let response = await getTeacher(teacherId)
  console.log("teacherId")
  //   console.log("response")
  //   console.log(response.data)
  const teacherData = response.data
  console.log(teacherData)
}
// 在mounted钩子中获取数据
onMounted(async () => {
  try {
    const sessionResponse = await reqSession()
    const sessionData = sessionResponse.data

    memberId.value = sessionData.id

    const response = await getTeacher(teacherId) // 请确保teacherId已定义
    teacherData.value = response.data
  } catch (error) {
    console.error("API请求失败：", error)
  }
})

const myForm = ref(null)

const updateTeacher = async () => {
  console.log("FormData:", FormData)
  console.log("myForm", myForm)

  let updateTeacherDetail = {
    id: teacherId.value,
    teacherName: teacherName.value,
    teacherTel: teacherTel.value,
    teacherMail: teacherMail.value,
    teacherProfile: teacherProfile.value,
  }
  console.log("teacherID", updateTeacherDetail.id)

  const res = await editTeacherProfile(updateTeacherDetail)
  console.log(res.data)
  alert("更新成功")
  location.reload()
}

const editTeacherData = async () => {}

/*----------------------﹀﹀﹀﹀﹀﹀﹀﹀前端接收圖片範例﹀﹀﹀﹀﹀﹀﹀﹀--------------------------*/
// const img = ref(null)
// const getImg = async (id) => {
//   let res = await getRecipePicture(id)
//   const body = res.data
//   const header = res.headers["content-type"]

//   console.log(body)
//   console.log(header)

//   img.value = `data:${header};base64,${body}`
// }
// /*----------------------﹀﹀﹀﹀﹀﹀﹀﹀前端接收圖片範例﹀﹀﹀﹀﹀﹀﹀﹀--------------------------*/
// const getRecipeData = async () => {
//   console.log(recipeId.value)

//   let res = await getRecipe(recipeId.value)
//   console.log("recipeId")

//   console.log("response")
//   console.log(res.data)
// }
</script>
<template>
  <h1>編輯老師個人資訊</h1>
  <!-- <button @click="getTeacherData(teacherId)">測試取得食譜資料</button>

  <h2>this is a teacher page{{ teacherId }}</h2> -->
  <div class="container">
    <form class="file-upload" @submit.prevent="updateTeacher" ref="myForm">
      <div class="row">
        <div class="col-6 mb-3 mx-auto">
          <!-- <label for="exampleFormControlInput1" class="form-label">照片</label>
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="請輸入姓名"
        /> -->
          <!-- <div class="imgContainer">
            <img
              src="https://fakeimg.pl/1180x550/?text=Image"
              alt=""
              class="img-fluid rounded"
            />
          </div> -->
        </div>
      </div>
      <div class="row">
        <div class="col-6 mb-3 mx-auto">
          <label for="teacherName" class="form-label">姓名</label>
          <input
            type="text"
            class="form-control"
            id="teacherName"
            name="teacherName"
            placeholder="請輸入姓名"
            :value="teacherData.teacherName"
          />
          <!-- <p>{{ teacherData.teacherName }}</p> -->
        </div>
      </div>
      <div class="row">
        <div class="col-6 mb-3 mx-auto">
          <label for="teacherTel" class="form-label">電話</label>
          <input
            type="text"
            class="form-control"
            id="teacherTel"
            name="teacherTel"
            placeholder="請輸入電話"
            :value="teacherData.teacherTel"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-6 mb-3 mx-auto">
          <label for="teacherMail" class="form-label">e-mail</label>
          <input
            type="email"
            class="form-control"
            id="teacherMail"
            name="teacherMail"
            placeholder="name@example.com"
            :value="teacherData.teacherMail"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-6 mb-3 mx-auto">
          <label for="teacherProfile" class="form-label">經歷</label>
          <textarea
            class="form-control"
            id="teacherProfile"
            name="teacherProfile"
            rows="10"
            :value="teacherData.teacherProfile"
          ></textarea>
        </div>
      </div>
      <div class="row">
        <div class="mx-auto col-6 justify-content-between">
          <button type="submit" class="btn btn-outline-primary">送出</button>

          <button class="btn btn-outline-danger">取消</button>
        </div>
      </div>
    </form>
  </div>
</template>
