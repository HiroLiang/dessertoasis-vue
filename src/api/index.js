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
const reqSession = () => request.post("/memberSession")

const reqGetMemberId = () => request.get("/member/loggedInUserId")

//拿到密鑰
const reqSecretKey = () => request.get("/getSecretKey")

//拿解密後的狀態
const reqUserPermission = () => request.get("/checkUserPermission")

//更新密碼
const reqChangepassword = (requestData) => {
  const requestBody = {
    oldPassword: requestData.oldPassword,
    newPassword: requestData.newPassword,
  }
  return request.post("/member/changepassword", requestBody, jsonHeader)
}
//更新會員資料
const reqChangeMember = (detail) => {
  return request.put("/member/update", detail, jsonHeader)
}
//傳圖到特定路徑
const memberImg = (file) => {
  console.log(file)
  return request.post("/member/uploadMemberImg", file)
}

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
  console.log(file)
  return request.post("/test/uploadimg", file)
}
//送出建立食譜頁面資料
const addRecipe = (formData) => {
  return request.post("/recipe/addrecipe", formData)
}

//取得總頁數
const reqGetCmsRecipePages = (condition) => {
  return request.post("/recipe/pages", condition, jsonHeader)
}

const reqGetFrontRecipePages = (condition) => {
  return request.post("/recipe/recipeFrontPagenation", condition, jsonHeader)
}

//取得成品圖
const getRecipePicture = (recipeId) => {
  return request.post("recipe/getPic", recipeId, jsonHeader)
}

const getStepPictures = (recipeId) => {
  return request.post("recipe/getStepPics", recipeId, jsonHeader)
}

const getRecipe = (recipeId) => {
  return request.get(`recipe/getRecipe?recipeId=${recipeId}`, jsonHeader)
}
/*----------------------------------------  食譜後台相關請求  -------------------------------------------*/
//取得現在頁數內的資料
const reqGetRecipePage = (condition) => {
  return request.post("/recipe/pagenation", condition, jsonHeader)
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

// 取出會員購物車商品數量
const reqGetCartCount = () => {
  return request.get(`/cart/count`)
}

/*----------------------------------------  訂單相關請求  -------------------------------------------*/

// 新增訂單
const reqInsertOrder = (data) => {
  return request.post(`/order`, data)
}

// 取得單一訂單
const reqGetOrder = (ordId) => {
  return request.get(`/order/${ordId}`)
}

// 修改訂單狀態
const reqUpdateOrdStatus = (ordId, ordStatus) => {
  return request.patch(`/order/${ordId}?ordStatus=${ordStatus}`)
}

// 刪除訂單
const reqDeleteOrder = (ordId) => {
  return request.delete(`/order/${ordId}`)
}

// 取得會員的訂單
const reqGetMemberOrders = (page) => {
  return request.get(`/order/member/page/${page}`)
}

// 取得會員的所有預約
const reqGetMemberReservations = () => {
  return request.get(`/order/reservation`)
}

const reqGetOrderPage = (condition) => {
  return request.post("/order/pagenation", condition, jsonHeader)
}

//取得總頁數
const reqGetCmsOrderPages = (condition) => {
  return request.post("/order/pages", condition, jsonHeader)
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

//查詢單筆課程
const showSingleCourse = (courseId) => {
  return request.get(`/course/${courseId}`)
}

const getCourse = (page, pageSize) => {
  return request.get(`/course/search?page=${page}&pageSize=${pageSize}`)
}

const getAllCourse = (page, pageSize, dataTitles) => {
  return request.get(
    `/course/search?page=${page}&pageSize=${pageSize}&sortBy=${dataTitles}`
  )
}

const searchCourse = (criteria, jsonHeader) =>
  request.post("/course/criteria", criteria, jsonHeader)

//課程分頁
const reqGetCoursePage = (condition) => {
  return request.post("/course/pagenation", condition, jsonHeader)
}

//取得總頁數
const reqGetCmsCoursePages = (condition) => {
  return request.post("/course/pages", condition, jsonHeader)
}

//取得圖片
const UploadTeacherImage = (formData) => {
  return request.post(`/teacher/uploadImage`, formData)
}
const getTeacherImage = (id) => {
  return request.post("teacher/getImage", id, jsonHeader)
}

const reqLoadPicture = (courseImgURL) => {
  return request.get(`/course/base64/image?path=${courseImgURL}`)
}
//取得數值範圍
const reqGetCourseNumberRange = (condition) => {
  return request.post("/course/number-range", condition, jsonHeader)
}

//#region ----------------------------------- 課程後台請求  ---------------------------------------*/

//取得單一課程資料
const reqGetCourseData = (id) => {
  return request.get(`course/course-desplay?id=${id}`)
}

//刪除一筆課程
const reqDeleteCourse = (id) => {
  return request.delete(`/course/${id}`)
}

const getTeacher = (teacherId) => {
  return request.get(`/teacher/${teacherId}`, jsonHeader)
}

const reqGetTeacherPage = (condition) => {
  return request.post("/teacher/pagenation", condition, jsonHeader)
}

//取得總頁數
const reqGetCmsTeacherPages = (condition) => {
  return request.post("/teacher/pages", condition, jsonHeader)
}

//更新課程
const reqUpdateCourse = (courseData) => {
  return request.post("course/updateCourse", courseData, jsonHeader)
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

const getProd = (page, pageSize, queryString) => {
  return request.get(
    `/product/search?page=${page}&pageSize=${pageSize}&${queryString}`
  )
}
const getProd1 = (queryParams) => {
  return request.get(`/product/search?${queryParams}`)
}

const reqGetProductPage = (condition) => {
  return request.post("/product/pagenation", condition, jsonHeader)
}

const AddProduct = (productData) => {
  return request.post("/product/add", productData, jsonHeader)
}

const UploadProdImage = (
  productId,
  imageFormData,
  config,
  thumbnailFormData,
  thumbnailConfig
) => {
  return request.post(
    `/product/uploadImage?productId=${productId}`,
    imageFormData,
    config,
    thumbnailFormData,
    thumbnailConfig
  )
}
const getProductImage = (id) => {
  return request.post("product/getImage", id, jsonHeader)
}

const getAllProductImage = (id) => {
  return request.post("product/getAllImage", id, jsonHeader)
}

//取得總頁數
const reqGetCmsProductPages = (condition) => {
  return request.post("/product/pages", condition, jsonHeader)
}
// const SearchProd = (page, pageSize, dataTitles, criteria, jsonHeader) =>
// request.post(`/product/criter?page=${page}&pageSize=${pageSize}&sortBy=${dataTitles}`, criteria, jsonHeader);

/**----------------------------------------  搜索相關請求  -------------------------------------------*/

/**取得搜索提示(暫無用)*/
const reqGetHint = (table, column, searchValue) =>
  request.get(
    `/getSearchHint?tableName=${table}&columnName=${column}&searchValue=${searchValue}`
  )

/**取得分類資訊*/
const reqGetCategory = (id) => request.get(`/category/find?categoryId=${id}`)

/**取得我的最愛資訊*/
const reqGetFavoriteList = () => request.get("/user-favorite-list")

/**新增/刪除最愛*/
const reqUpdateList = (categoryId, itemId) =>
  request.post(
    "/favorite-list/updateList",
    `{"categoryId":"${categoryId}","itemId":"${itemId}"}`,
    jsonHeader
  )

/*----------------------------------------  聊天室相關請求  -------------------------------------------*/

const reqGetChatDatas = (sender, catcher) => {
  return request.get(`/message/history?sender=${sender}&catcher=${catcher}`)
}

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
  reqGetMemberId,
  reqChangepassword,
  memberImg,
  reqChangeMember,

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
  reqGetFrontRecipePages,
  getRecipePicture,
  getStepPictures,
  getRecipe,

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
  reqGetCartCount,

  // 訂單用
  reqGetOrder,
  reqUpdateOrdStatus,
  reqDeleteOrder,
  reqInsertOrder,
  reqGetMemberOrders,
  reqGetMemberReservations,
  reqGetOrderPage,
  reqGetCmsOrderPages,

  //課程用
  getAllCourses,
  checkTeacherStatus,
  editTeacherProfile,
  deleteCourse,
  getCoursesByTeacherId,
  showSingleCourse,
  getCourse,
  getAllCourse,
  searchCourse,
  reqGetCoursePage,
  reqGetCmsCoursePages,
  getTeacher,
  reqGetTeacherPage,
  reqGetCmsTeacherPages,
  UploadTeacherImage,
  getTeacherImage,

  //#region 課程後台
  // reqGetCourseData,
  reqLoadPicture,
  reqGetCourseNumberRange,

  //#region 課程後台
  reqGetCourseData,
  reqUpdateCourse,
  reqDeleteCourse,

  //#endregion 課程後台

  /*--------商品用-------*/
  getAllProd,
  SearchProd,
  getProd,
  getProd1,
  reqGetProductPage,
  reqGetCmsProductPages,
  AddProduct,
  UploadProdImage,
  getProductImage,
  getAllProductImage,
  /*----------------------------------------  搜索相關請求  -------------------------------------------*/
  reqGetHint,
  reqGetCategory,
  reqGetFavoriteList,
  reqUpdateList,

  /*----------------------------------------  聊天室相關請求  -------------------------------------------*/
  reqGetChatDatas,
}
