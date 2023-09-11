<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router';
import Stomp from 'stompjs'
import SockJS from 'sockjs-client/dist/sockjs.min.js'

const route = useRoute()

const chatMessage = ref({
    sender: 1,
    catcher: 1,
    message: 'aaaa',
    sendTime: new Date(),
    messageState: 'UNREAD'
})

const userId = ref('guest')

const url = ref('http://localhost:8080/chatroom')

//initial chat room
const socket = new SockJS(url.value)
const stompClient = Stomp.over(socket)
stompClient.connect({}, (frame) => {
    console.log(frame);
    stompClient.subscribe('/topic/getResponse', (res) => {
        let msg = JSON.parse(res.body)
        console.log(msg);
    })
})

onBeforeUnmount(() => {
    if (stompClient != null) {
        stompClient.disconnect()
    }
})
</script>
<template></template>