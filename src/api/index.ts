import request from "./request";

//Test
const reqTest = () => {
    return request.post('/test', `{"name":"John"}`, { headers: { 'Content-Type': 'application/json' } })
}

//CMS食譜測試
const reqDatas = () => {
    return request.get('/recipe/all')
}

export { reqTest, reqDatas }