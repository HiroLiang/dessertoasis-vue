<script setup>
import NavBar from "@/components/NavBar.vue"
import { reactive, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import SweetAlert from "SweetAlert2"
import { getTeacherImage, UploadTeacherImage } from "@/api/index.js"
const navBarList = reactive([
  { title: "食譜", toUrl: "/recipes" },
  { title: "課程", toUrl: "/courses" },
  { title: "商品", toUrl: "/product" },
  { title: "預約甜點教室", toUrl: "/reservation" },
  {
    title: "我的課程",
    toUrl: "/teacher",
  },
])
const showPopup = ref(false)

const router = useRouter()

const showTeacherContract = () => {
  // 使用 SweetAlert2 创建弹出式窗口
  SweetAlert.fire({
    title: "教師合約",
    html: contractContent,
    icon: "info",
    confirmButtonText: "確定",
  })
}
const id = ref(1)
const img = ref(null)
const getImg = async (id) => {
  let res = await getTeacherImage(id)
  const body = res.data
  const header = res.headers["content-type"]

  console.log("body", body)
  console.log("header", header)

  img.value = `data:${header};base64,${body}`
}
/*----------------------------------------------圖檔資料處理區塊-------------------------------------------------------*/
//取得圖片資料
const teacherJsonData = ref(null)
//產生預覽圖
const teacherPicPreviewImageUrl = ref(null)
const teacherPic = ref(null)
const getTeacherImg = (e) => {
  //利用change事件取得圖檔
  const teacherImgData = e.target.files[0]
  teacherPic.value = e.target.files[0]

  if (teacherImgData) {
    //FileReader會自動讀取input中上傳的檔案
    const reader = new FileReader()
    //將圖檔轉成base64編碼
    reader.readAsDataURL(teacherImgData)
    //FileReader讀取完成時觸發onload事件
    reader.onload = (e) => {
      //讀取完成後利用e.target.result取得圖檔的base64編碼數據,
      //並將其進行字串處理取得split後的的第二個元素(資料中base64編碼所在位置)
      const base64Data = e.target.result.split(",")[1]
      //將字串利用物件建立兩個屬性放入對應數據(屬性名稱一定要為fileName: 以及  base64Content:)
      const jsonData = {
        fileName: teacherImgData.name, //用以儲存圖檔檔名(const recipeImgData = e.target.files[0]中的name屬性值)
        base64Content: base64Data, //用以儲存base64字串
      }
      //jsonData物件轉成JSON格式放入物件內,用以傳送給Server
      teacherJsonData.value = JSON.stringify(jsonData)
      //用以利用 onbind img標籤內的src產生預覽圖
      teacherPicPreviewImageUrl.value = e.target.result
      console.log("teacherJsonData")
      console.log(teacherJsonData.value)
      console.log("base64")
      console.log(base64Data)
    }
  }
}
/*----------------------------------------------圖檔資料處理區塊-------------------------------------------------------*/
//teacherBean物件
const data = reactive({
  teacher: {
    teacherName: "",
    teacherContract: "同意，待審核",
    pictureURL: "",
    teacherTel: null,
    teacherMail: "",
    teacherProfile: "",
    teacherAccountStatus: "非教師",
    pictures: [],
  },
})

const contractContent = `甜點教師合約

本協議（以下簡稱「協議」）由以下各方（以下簡稱「合約方」）共同訂立並同意遵守：

甲方（教師）:
姓名: _______________
聯繫地址: ___________
電話號碼: ___________
電子郵件: ___________

乙方（學校或課程平台）:
名稱: 甜點綠洲股份有限公司
地址: ___________________
聯繫人: _________________
電話號碼: ________________
電子郵件: ________________

合約概要：

1. 甲方同意擔任乙方的甜點教師，為學生提供甜點製作課程。

2. 教學內容和時間將在雙方協商一致後確定，並寫入附件A中。

3. 甲方將按照教學計劃和要求提供高品質的甜點製作指導，並確保學生獲得充分的學習機會。

4. 甲方將按照合約規定的報酬標準收取酬金，具體標準和支付方式見附件B。

5. 本合約自簽署之日起生效，有效期為12個月，屆時可以根據需要進行續約。

附件A：課程安排和內容

課程名稱: ___________________________________
課程時間表: __________________________________
課程地點: ___________________________________
課程內容概述: ________________________________

附件B：報酬標準和支付方式

甲方的報酬將根據以下方式支付：
- 報酬金額: _________________________________
- 支付方式: _________________________________

本合約一式兩份，甲方和乙方各執一份，自簽署之日起生效。

甲方（教師）簽名: ____________________________ 日期: ______________

乙方（學校或課程平台）簽名: ______________________ 日期: ______________`
const form = new FormData()

const sendForm = async () => {
  form.append("teacherName", data.teacher.teacherName)
  // form.append("pictureURL", myForm.value)
  form.append("pictureURL", teacherPic.value)
  form.append("teacherTel", data.teacher.teacherTel)
  form.append("email", data.teacher.teacherMail)
  form.append("teacherProfile", data.teacher.teacherProfile)
  form.append("teacherContract", data.teacher.teacherContract)
  form.append("teacherAccountStatus", data.teacher.teacherAccountStatus)
  form.forEach((e) => {
    console.log(e)
  })
  await UploadTeacherImage(form)
  // 成功上传后触发弹出窗口
  alert("您已成功成為教師！")
  // SweetAlert.fire({
  //   title: "成功",
  //   text: "您已成功成為教師！",
  //   icon: "success",
  //   confirmButtonText: "確定",
  // })

  // 清空表单数据或进行其他操作（根据需要）
  data.teacher.teacherName = ""

  // 重定向到老师首页
  router.replace({ path: "/teacher" }) // 请根据您的路由配置修改路径
}
</script>
<template>
  <NavBar :NavBarList="navBarList" />
  <RouterView></RouterView>

  <!-- <button @click="getImg(5)">測試</button>
  <img :src="img" alt="" /> -->
  <!-- <h2>this is a teacher page{{ teacherId }}</h2> -->

  <div class="container">
    <h1 style="margin-top: 30px">成為老師</h1>
    <form @submit.prevent="sendForm">
      <div class="row">
        <div class="col-6 mb-3 mx-auto">
          <h3>上傳圖片</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-6 mb-3 mx-auto">
          <img
            :src="
              teacherPicPreviewImageUrl ||
              'https://fakeimg.pl/636x450/?text=Image'
            "
            alt="預覽圖片"
            class="mb-3 previewImg"
          />
          <input
            @change="getTeacherImg"
            class="form-control pic"
            type="file"
            id="pictureURL"
            name="pictureURL"
            accept="image/*"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-6 mb-3 mx-auto">
          <label for="teacherName" class="form-label">姓名</label>
          <input
            type="text"
            class="form-control"
            id="teacherName"
            placeholder="請輸入姓名"
            name="teacherName"
            v-model="data.teacher.teacherName"
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
            v-model="data.teacher.teacherTel"
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
            v-model="data.teacher.teacherMail"
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
            v-model="data.teacher.teacherProfile"
          ></textarea>
        </div>
      </div>
      <div class="row">
        <div class="form-check mx-auto col-6">
          <input
            class="form-check-input"
            type="checkbox"
            name="teacherContract"
            id="teacherContract"
            v-model="data.teacher.teacherContract"
          />
          <label class="form-check-label" for="flexCheckDefault">
            我同意成為老師

            <button class="btn btn-link" @click="showTeacherContract">
              查看教師合約
            </button>
          </label>
        </div>
        <input
          class="form-check-input"
          type="hidden"
          name="teacherAccountStatus"
          id="teacherAccountStatus"
        />
      </div>
      <div class="row">
        <div class="col-6 mx-auto justify-content-end">
          <button type="submit" class="btn btn-outline-primary">送出</button>
          <button class="btn btn-outline-danger">取消</button>
        </div>
      </div>
    </form>
  </div>
</template>
<style scoped>
.previewImg {
  max-width: 100%;
  max-height: 100%;
}
</style>
