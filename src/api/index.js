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
<<<<<<< HEAD
  return request.get(
    `/reservation/getinmonth?room=${room}&start=${start}&end=${end}`
  )
=======
  return request.get(`/reservation/getinmonth?room=${room}&start=${start}&end=${end}`)
>>>>>>> e05f7d8346cd2fe6e1733cc39521bba2617cb4d3
}

//從controller拿到所有課程，export出Promise物件給vue?
const getAllCourses = () => {
  return request.get("/course/all")
}

export { reqTest, reqDatas, getReservations, getAllCourses }
