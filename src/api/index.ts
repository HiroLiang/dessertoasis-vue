import request from "./request";

//Test
const reqTest = () => {
    return request.post('/test', `{"name":"John"}`, { headers: { 'Content-Type': 'application/json' } })
}

//CMS食譜測試
const reqDatas = () => {
    return request.get('/recipe/all')
}

const getReservations = (roomId: number, year: number, month: number) => {
    return request.get(`/reservation/getinmonth?roomId=${roomId}&year=${year}&month=${month}`)
}

export { reqTest, reqDatas, getReservations }