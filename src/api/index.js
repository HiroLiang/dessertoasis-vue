import request from "./request"

//Test
const reqTest = () => {
  return request.post("/test", `{"name":"John"}`, {
    headers: { "Content-Type": "application/json" },
  })
}

//CMS食譜測試
const reqDatas = () => {
  return request.get("/recipe/all")
}

// 取出指定教室兩日期之間的預約資料
const getReservations = (room, start, end) => {
  return request.get(
    `/reservation/getinmonth?room=${room}&start=${start}&end=${end}`
  )
}

//從controller拿到所有課程，export出Promise物件給vue?
const getAllCourses = () => {
  return request.get("/course/withTName")
}

//檢查教師身分
const checkTeacherStatus = () => {
  return request.get("/check-teacher")
}

export { reqTest, reqDatas, getReservations, getAllCourses, checkTeacherStatus }
