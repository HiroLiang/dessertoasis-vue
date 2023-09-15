<script setup>
import NavBar from "@/components/NavBar.vue"
import { reactive, ref } from "vue"
import SweetAlert from "SweetAlert2"
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

const showTeacherContract = () => {
  // 使用 SweetAlert2 创建弹出式窗口
  SweetAlert.fire({
    title: "教师合同",
    html: contractContent,
    icon: "info",
    confirmButtonText: "确定",
  })
}
const contractContent = `甜点教师合同

本協議（以下簡稱「協議」）由以下各方（以下簡稱「合同方」）共同訂立並同意遵守：

甲方（教師）:
姓名: ________________________________________
聯繫地址: ___________________________________
電話號碼: ___________________________________
電子郵件: ___________________________________

乙方（學校或課程平台）:
名稱: ________________________________________
地址: ________________________________________
聯繫人: ______________________________________
電話號碼: ____________________________________
電子郵件: _____________________________________

合同概要：

1. 甲方同意擔任乙方的甜點教師，為學生提供甜點製作課程。

2. 教學內容和時間將在雙方協商一致後確定，並寫入附件A中。

3. 甲方將按照教學計劃和要求提供高質量的甜點製作指導，並確保學生獲得充分的學習機會。

4. 甲方將按照合同規定的報酬標準收取酬金，具體標準和支付方式見附件B。

5. 本合同自簽署之日起生效，有效期為______個月，屆時可以根據需要進行續約。

附件A：課程安排和內容

課程名稱: ___________________________________
課程時間表: __________________________________
課程地點: ___________________________________
課程內容概述: ________________________________

附件B：報酬標準和支付方式

甲方的報酬將根據以下方式支付：
- 報酬金額: _________________________________
- 支付方式: _________________________________

本合同一式兩份，甲方和乙方各執一份，自簽署之日起生效。

甲方（教師）簽名: ____________________________ 日期: ______________

乙方（學校或課程平台）簽名: ______________________ 日期: ______________`
</script>
<template>
  <NavBar :NavBarList="navBarList" />
  <RouterView></RouterView>
  <h1>成為老師</h1>
  <div class="container">
    <div class="row">
      <div class="col-6 mb-3 mx-auto">
        <!-- <label for="exampleFormControlInput1" class="form-label">照片</label>
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="請輸入姓名"
        /> -->
        <div class="imgContainer">
          <img
            src="https://fakeimg.pl/1180x550/?text=Image"
            alt=""
            class="img-fluid rounded"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6 mb-3 mx-auto">
        <label for="exampleFormControlInput1" class="form-label">姓名</label>
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="請輸入姓名"
        />
        <!-- <p>{{ teacherData.teacherName }}</p> -->
      </div>
    </div>
    <div class="row">
      <div class="col-6 mb-3 mx-auto">
        <label for="exampleFormControlInput1" class="form-label">電話</label>
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="請輸入電話"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-6 mb-3 mx-auto">
        <label for="exampleFormControlInput1" class="form-label">e-mail</label>
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-6 mb-3 mx-auto">
        <label for="exampleFormControlTextarea1" class="form-label">經歷</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="10"
        ></textarea>
      </div>
    </div>
    <div class="row">
      <div class="form-check mx-auto col-6">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
        />
        <label class="form-check-label" for="flexCheckDefault">
          我同意成為老師

          <button class="btn btn-link" @click="showTeacherContract">
            查看教師合約
          </button>
        </label>
      </div>
    </div>
    <div class="row">
      <div class="col-6 mx-auto justify-content-end">
        <button class="btn btn-outline-primary">修改</button>
        <button class="btn btn-outline-danger">取消</button>
      </div>
    </div>
  </div>
</template>
