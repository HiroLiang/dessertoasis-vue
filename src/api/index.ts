import request from "./request";

//Test
const reqTest = () => {
    return request.post('/test2', `{"name":"John"}`, { headers: { 'Content-Type': 'application/json' } })
}

export { reqTest }