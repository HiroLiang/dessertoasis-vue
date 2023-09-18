<script setup>
import { ref, watch, onBeforeMount, reactive } from "vue"
import { useRoute, useRouter } from "vue-router"
import {
  reqGetTeacherData,
  reqDeleteTeacher,
  updateTeacher,
} from "../../../api"
import {
  NButton,
  NSwitch,
  NForm,
  NFormItem,
  NInput,
  NDynamicTags,
  NDatePicker,
  NSelect,
  NRadioGroup,
  NRadioButton,
  NInputNumber,
  useLoadingBar,
} from "naive-ui"
// const loadingBar = useLoadingBar()
// loadingBar.start()

const router = useRouter()

//取得陳列課程Id
const route = useRoute()
const teacherId = ref(0)
teacherId.value = route.query.id
console.log("teacherId", teacherId.value)

const updateDisabled = ref(false)

//teacherBean物件
// const data = reactive({
//   teacher: {

//     teacherName: "",
//     teacherContract: "",

//     teacherTel: null,
//     teacherMail: "",
//     teacherProfile: "",
//     teacherAccountStatus: "非教師",
//   },
// })

//課程資料
const teacherData = ref(null)

//變更.刪除
// const submitChange = async () => {
//   let conf = confirm("是否修改老師資料？")
//   if (conf) {
//     // loadingBar.start()
//     let result = await reqUpdateTeacher(teacherData.value)
//     console.log(result.data)
//     // loadingBar.finish()
//     router.replace({ path: "/cms/managerAllTeacher" })
//   }
// }

const deleteTeacher = async () => {
  let conf = confirm("是否真的要刪除資料？")
  if (conf) {
    let result = await reqDeleteTeacher(teacherData.value.id)
    alert(result.data)
    router.replace({ path: "/cms/managerAllTeacher" })
  }
}

onBeforeMount(async () => {
  let result = await reqGetTeacherData(teacherId.value)
  if (result.data != null) {
    teacherData.value = result.data
    console.log("teacherData", teacherData.value)
    // let arr = []
    // courseData.value.courseList.forEach(tag => {
    //     arr.push(tag.ctag.courseTagName)
    // })
    // dynamicTagsValue.value = arr
    // courseData.value.updateDate = new Date().getTime()
    // courseData.value.courseDate = new Date(courseData.value.courseDate).getTime()
    // courseData.value.closeDate = new Date(courseData.value.closeDate).getTime()
    // loadingBar.finish()
  } else {
    // loadingBar.error()
  }
})
const form = new FormData()
const sendForm = async () => {
  let conf = confirm("是否修改老師資料？")
  if (conf) {
    form.append("id", teacherData.value.id)
    form.append("teacherName", teacherData.value.teacherName)
    form.append("teacherTel", teacherData.value.teacherTel)
    form.append("email", teacherData.value.teacherMail)
    form.append("teacherProfile", teacherData.value.teacherProfile)
    form.append("teacherContract", teacherData.value.teacherContract)
    form.append("teacherAccountStatus", teacherData.value.teacherAccountStatus)
    form.forEach((e) => {
      console.log(e)
    })
    await updateTeacher(form)
    router.replace({ path: "/cms/managerAllTeacher" })
  }
}
</script>
<template>
  <div class="container">
    <h1>修改教師資訊</h1>
    <form @submit.prevent="sendForm">
      <div class="row">
        <div class="col-6 mb-3 mx-auto">
          <input
            type="hidden"
            id="teacherId"
            name="teacherId"
            v-model="teacherData.id"
          />
          <label for="teacherName" class="form-label">姓名</label>
          <input
            type="text"
            class="form-control"
            id="teacherName"
            placeholder="請輸入姓名"
            name="teacherName"
            v-model="teacherData.teacherName"
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
            placeholder="請輸入電話"
            name="teacherTel"
            v-model="teacherData.teacherTel"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-6 mb-3 mx-auto">
          <label for="email" class="form-label">e-mail</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="name@example.com"
            name="email"
            v-model="teacherData.teacherMail"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-6 mb-3 mx-auto">
          <label for="teacherProfile" class="form-label">經歷</label>
          <textarea
            class="form-control"
            id="teacherProfile"
            rows="10"
            name="teacherProfile"
            v-model="teacherData.teacherProfile"
          ></textarea>
        </div>
      </div>
      <div class="row">
        <div class="col-6 mb-3 mx-auto">
          <label for="teacherContract" class="form-label">教師合約</label>
          <select
            class="form-control"
            id="teacherContract"
            name="teacherContract"
            v-model="teacherData.teacherContract"
          >
            <option value="同意">同意</option>
            <option value="不同意">不同意</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-6 mb-3 mx-auto">
          <label for="teacherAccountStatus" class="form-label"
            >教師帳號狀態</label
          >
          <select
            class="form-control"
            id="teacherAccountStatus"
            name="teacherAccountStatus"
            v-model="teacherData.teacherAccountStatus"
          >
            <option value="啟用">啟用</option>
            <option value="停用">停用</option>
            <!-- 添加更多选项，根据需要 -->
          </select>
        </div>
      </div>
      <div class="row">
        <button
          type="submit"
          class="btn btn-outline-primary col-6 mb-3 mx-auto"
        >
          送出
        </button>
      </div>
    </form>
    <div class="row">
      <button
        @click="deleteTeacher"
        class="btn btn-outline-danger col-6 mb-3 mx-auto"
      >
        刪除
      </button>
    </div>
  </div>
</template>
