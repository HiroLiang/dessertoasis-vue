import request from "./request"

const jsonHeader = { headers: { "Content-Type": "application/json" } }

//Test
const reqTest = () => request.post("/test", `{"name":"John"}`, jsonHeader)

//登入
const reqSignIn = (account, passwords) => request.post("/memberLogin", `{"account": "${account}","passwords": "${passwords}"}`, jsonHeader)

//註冊
const reqSignUp = (userData) => request.post("/memberRegister", userData, jsonHeader)

//CMS食譜測試
const reqDatas = () => {
  return request.get("/recipe/all")
}

// 取出指定教室兩日期之間的預約資料
const getReservations = (room, start, end) => {
  return request.get(
    `/reservations/${room}?start=${start}&end=${end}`
  )
}

// 取出所有教室
const getClassrooms = () => {
  return request.get("/classrooms")
}

// 加入購物車
const addToCart = (data) => {
  return request.post("/cart", data)
}

// 加入預約教室購物車
const addToReservationCart = (data) => {
  return request.post("/reservationCart", data)
}

//從controller拿到所有課程，export出Promise物件給vue?
const getAllCourses = () => {
  return request.get("/course/withTName")
}

//檢查教師身分
const checkTeacherStatus = () => {
  return request.get("/set-teacher-cookie")
}

export {
  //會員用
  reqSignIn,
  reqSignUp,

  reqTest,
  reqDatas,
  getReservations,
  getClassrooms,
  getAllCourses,
  checkTeacherStatus,
  addToCart,
  addToReservationCart
}
