<script setup lang="ts">
import SockJS from 'sockjs-client/dist/sockjs.min.js'
import Stomp from 'stompjs'
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
let stompClient: any = null
const baseUrl = 'http://localhost:8080/chatroom'
const userName = ref('King')
const message = ref('')
const messages = reactive(['hi', 'hi there'])
const sendMessage = () => {
    if (message.value && stompClient) {
        let chatMsg = {
            sender: userName.value,
            content: message.value,
            type: 'CHAT'
        }
        stompClient.send('/app/chat', {}, JSON.stringify(chatMsg))
        message.value = ''
    }
}
onMounted(() => {
    if (userName) {
        var socket = new SockJS(baseUrl)
        stompClient = Stomp.over(socket)
        stompClient.connect({}, () => {
            stompClient.subscribe('/topic/public', (payload: any) => {
                let msg = JSON.parse(payload.body)
                console.log(msg);
                if (msg.type == 'JOIN') {
                    messages.push('New member ' + msg.sender + ' join now!')
                } else if (msg.type == 'LEAVE') {
                    messages.push(msg.sender + 'leave')
                } else {
                    messages.push(msg.content)
                }
            })
            stompClient.send('/app/join', {}, JSON.stringify({
                sender: userName.value,
                type: 'JOIN'
            }))
            console.log(stompClient);
        }, (error: any) => {
            console.log('error : ' + error);

        })
    }
})

onBeforeUnmount(() => {
    if (stompClient) {
        stompClient.disconnect()
    }
})

</script>
<template>
    <h1>群聊測試</h1>
    <ul>
        <li v-for="mes in messages">{{ mes }}</li>
    </ul>
    <div>
        <input @keyup.enter="sendMessage" type="text" v-model="message">
        <button @click="sendMessage">send</button>
    </div>
</template>