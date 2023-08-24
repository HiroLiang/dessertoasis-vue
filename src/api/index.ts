import request from "./request";

//Test
const reqTest = () => {
    return request.post('/test', `{"name":"John"}`, { headers: { 'Content-Type': 'application/json' } })
}

//CMS食譜測試
const reqDatas = () => {
    return request.get('/recipe/all')
}

const getReservations = (room: number, start: string, end: string) => {
    return request.get(`/reservation/getinmonth?room=${room}&start=${start}&end=${end}`)
}

export { reqTest, reqDatas, getReservations }