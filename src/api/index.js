import request from "./request"

const jsonHeader = { headers: { "Content-Type": "application/json" } }

//Test
const reqTest = () => request.post("/test", `{"name":"John"}`, jsonHeader)

//登入
const reqSignIn = (account, passwords) => request.post("/memberLogin", `{"account": "${account}","passwords": "${passwords}"}`, jsonHeader)

//註冊
const reqSignUp = (userData) => request.post("/memberRegister", userData, jsonHeader)

//登出
const reqSignOut = () => { return request.post("/memberLogout", null, jsonHeader); }

/*----------------------------------------  食譜相關請求  -------------------------------------------*/
//CMS食譜測試
const reqDatas = () => {
  return request.get("/recipe/all")
}

//取前10筆熱門食譜
const reqTop10HotRecipe = () => {
  return request.get("/recipe/hottest10Recipes")
}

//取前10筆最新食譜
const reqTop10LatestRecipe = () => {
  return request.get("/recipe/latest10Recipes")
}

//取前10筆特定種類食譜
const req10CategoryRecipe = (categoryId) => {
  console.log('categoryId:' + categoryId);
  return request.get(`/recipe/get10categoryRecipes?cid=${categoryId}`)
}

/*----------------------------------------  教室相關請求  -------------------------------------------*/

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

/*----------------------------------------  購物車、訂單相關請求  -------------------------------------------*/

// 加入購物車
const addToCart = (memberId, data) => {
  return request.post(`/cart/${memberId}`, data)
}

// 加入預約教室購物車
const addToReservationCart = (roomId, data) => {
  return request.post(`/reservationCart/room/${roomId}`, data)
}

// 取得商品購物車內容
const getProductCart = (memberId) => {
  return request.get(`/cart/product/${memberId}`)
}

// 取得課程購物車內容
const getCourseCart = (memberId) => {
  return request.get(`/cart/course/${memberId}`)
}

// 取得預約教室購物車內容
const getReservationCart = (memberId) => {
  return request.get(`/cart/reservation/${memberId}`)
}

// 刪除購物車內容
const deleteCart = (cartId) => {
  return request.delete(`/cart/${cartId}`)
}

// 新增訂單
const insertOrder = (memberId, data) => {
  return request.post(`/order/${memberId}`, data)
}

/*---------------------------------------- 課程相關請求  -------------------------------------------*/

//從controller拿到所有課程，export出Promise物件給vue?
const getAllCourses = () => {
  return request.get("/course/withTName")
}

//檢查教師身分
const checkTeacherStatus = () => {
  return request.get("/set-teacher-cookie")
}

/*----------------------------------------  搜索相關請求  -------------------------------------------*/

//取得搜索提示(暫無用)
const reqGetHint = (table, column, searchValue) => request.get(`/getSearchHint?tableName=${table}&columnName=${column}&searchValue=${searchValue}`)


export {
  //會員用
  reqSignIn,
  reqSignUp,
  reqSignOut,
  /*--------食譜用-------*/
  reqTop10HotRecipe,
  reqTop10LatestRecipe,
  req10CategoryRecipe,

  reqTest,
  reqDatas,

  // 教室用
  getReservations,
  getClassrooms,

  // 購物車用
  addToCart,
  addToReservationCart,
  getProductCart,
  getCourseCart,
  getReservationCart,
  deleteCart,

  // 訂單用
  insertOrder,

  getAllCourses,
  checkTeacherStatus,

  /*----------------------------------------  搜索相關請求  -------------------------------------------*/
  reqGetHint
}
