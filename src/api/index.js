import request from "./request"

const jsonHeader = { headers: { "Content-Type": "application/json" } }

//Test
const reqTest = () => request.post("/test", `{"name":"John"}`, jsonHeader)

//登入
const reqSignIn = (account, passwords) =>
  request.post(
    "/memberLogin",
    `{"account": "${account}","passwords": "${passwords}"}`,
    jsonHeader
  )

//註冊
const reqSignUp = (userData) =>
  request.post("/memberRegister", userData, jsonHeader)

//登出
const reqSignOut = () => {
  return request.post("/memberLogout", null, jsonHeader)
}

//查詢單筆會員
const reqMember = (id) => {
  return request.get(`/member/${id}`)
}
//查詢單筆會員詳細資料
const reqMemberDetail = (id) => {
  return request.get(`/member/${id}/details`)
}

//查詢全部會員
const reqGetAllMembers = () => request.get("/member/all", {})

//從session 拿出member資料
const reqSession = () => request.get("/memberSession")

//拿到密鑰
const reqSecretKey = () => request.get("/getSecretKey");

//拿解密後的狀態
const reqUserPermission = () => request.get("/checkUserPermission");

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
  console.log("categoryId:" + categoryId)
  return request.get(`/recipe/get10categoryRecipes?cid=${categoryId}`)
}
//測試圖檔上傳可正確儲存到設定位置
const imgTest = (file) => {
  console.log(file);
  return request.post("/test/uploadimg", file)
}
//送出建立食譜頁面資料
const addRecipe = (formData) => {
  return request.post("/recipe/addrecipe", formData)
}

const reqGetRecipePage = (condition) => {
  return request.post('/recipe/pagenation', condition, jsonHeader)
}

//取得總頁數
const reqGetCmsRecipePages = (condition) => {
  return request.post('/recipe/pages', condition, jsonHeader)
}

/*----------------------------------------  教室相關請求  -------------------------------------------*/

// 取出指定教室兩日期之間的預約資料
const getReservations = (room, start, end) => {
  return request.get(`/reservations/${room}?start=${start}&end=${end}`)
}

// 取出所有教室
const getClassrooms = () => {
  return request.get("/classrooms")
}

/*----------------------------------------  購物車相關請求  -------------------------------------------*/

// 加入購物車
const addToCart = (data) => {
  return request.post(`/cart`, data)
}

// 取得商品購物車內容
const getProductCart = () => {
  return request.get(`/cart/product`)
}

// 取得課程購物車內容
const getCourseCart = () => {
  return request.get(`/cart/course`)
}

// 取得預約教室購物車內容
const getReservationCart = () => {
  return request.get(`/cart/reservation`)
}

// 更新購物車商品數量
const reqUpdateProdQuantities = (data) => {
  return request.patch(`/cart/product`, data)
}

// 刪除購物車內容
const deleteCart = (cartId) => {
  return request.delete(`/cart/${cartId}`)
}

/*----------------------------------------  訂單相關請求  -------------------------------------------*/

// 新增訂單
const insertOrder = (data) => {
  return request.post(`/order`, data)
}

// 取得單一訂單
const getOrder = (ordId) => {
  return request.get(`/order/${ordId}`)
}

const reqGetOrderPage = (condition) => {
  return request.post('/order/pagenation', condition, jsonHeader)
}

//取得總頁數
const reqGetCmsOrderPages = (condition) => {
  return request.post('/order/pages', condition, jsonHeader)
}

/*---------------------------------------- 課程相關請求  -------------------------------------------*/

//從controller拿到所有課程，export出Promise物件給vue?
const getAllCourses = () => {
  return request.get(`/course/all`)
}

//檢查教師身分
const checkTeacherStatus = () => {
  return request.get(`/set-teacher-cookie`)
}

//列出該教師個人資料
const editTeacherProfile = (teacherId) => {
  return request.get(`/teacher/${teacherId}`)
}

//列出該教師所有課程
const getCoursesByTeacherId = (teacherId) => {
  return request.get(`/course/teacher/${teacherId}`)
}

//刪除課程by Id
const deleteCourse = (courseId) => {
  return request.delete(`/course/${courseId}`)
}

/*---------------------------------------- 商品相關請求  -------------------------------------------*/
//取得所有商品(分頁、一頁顯示幾個、排序)
const getAllProd = (page, pageSize, dataTitles) => {
  return request.get(
    `/product/search?page=${page}&pageSize=${pageSize}&sortBy=${dataTitles}`
  )
}
const SearchProd = (criteria, jsonHeader) =>
  request.post("/product/criteria", criteria, jsonHeader)

// const SearchProd = (page, pageSize, dataTitles, criteria, jsonHeader) =>
// request.post(`/product/criter?page=${page}&pageSize=${pageSize}&sortBy=${dataTitles}`, criteria, jsonHeader);

/*----------------------------------------  搜索相關請求  -------------------------------------------*/

//取得搜索提示(暫無用)
const reqGetHint = (table, column, searchValue) =>
  request.get(
    `/getSearchHint?tableName=${table}&columnName=${column}&searchValue=${searchValue}`
  )

//取得分類資訊
const reqGetCategory = (id) => request.get(`/category/find?categoryId=${id}`)

//取得我的最愛資訊
const reqGetFavoriteList = () => request.get('/user-favorite-list')

//新增/刪除最愛
const reqUpdateList = (categoryId, itemId) => request.post('/favorite-list/updateList', `{"categoryId":"${categoryId}","itemId":"${itemId}"}`, jsonHeader)



export {
  //會員用
  reqSignIn,
  reqSignUp,
  reqSignOut,
  reqMember,
  reqMemberDetail,
  reqGetAllMembers,
  reqSession,
  reqSecretKey,
  reqUserPermission,
  /*--------食譜用-------*/
  reqTop10HotRecipe,
  reqTop10LatestRecipe,
  req10CategoryRecipe,
  reqTest,
  reqDatas,
  imgTest,
  addRecipe,
  reqGetRecipePage,
  reqGetCmsRecipePages,

  // 教室用
  getReservations,
  getClassrooms,

  // 購物車用
  addToCart,
  getProductCart,
  getCourseCart,
  getReservationCart,
  reqUpdateProdQuantities,
  deleteCart,

  // 訂單用
  insertOrder,
  reqGetOrderPage,
  reqGetCmsOrderPages,

  //課程用
  getAllCourses,
  getOrder,
  checkTeacherStatus,
  editTeacherProfile,
  deleteCourse,
  getCoursesByTeacherId,

  /*--------商品用-------*/
  getAllProd,
  SearchProd,
  /*----------------------------------------  搜索相關請求  -------------------------------------------*/
  reqGetHint,
  reqGetCategory,
  reqGetFavoriteList,
  reqUpdateList
}
