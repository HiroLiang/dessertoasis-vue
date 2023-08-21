import request from "./reauest";

//Test
const reqTest = () => {
    return request.post('/test', `{"name":"John"}`, { headers: { 'Content-Type': 'application/json' } })
}

export { reqTest }