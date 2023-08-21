import request from "./request";

//Test
const reqTest = () => {
    return request.post('/test', `{"name":"John"}`, { headers: { 'Content-Type': 'application/json' } })
}

export { reqTest }