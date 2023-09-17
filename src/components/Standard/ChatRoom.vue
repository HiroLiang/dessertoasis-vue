<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { reqGetMemberId, reqGetAdmins, reqGetUnreadSum } from '../../api'
import Stomp from 'stompjs'
import SockJS from 'sockjs-client/dist/sockjs.min.js'
import MemberList from './chatroom/MemberList.vue'
import TextRoom from './chatroom/TextRoom.vue'
import { useChatMessage } from '../../stores/chatMessage';

const emit = defineEmits(['get-unread-number'])

const store = useChatMessage()

//初始化需求資料
const chatMessage = ref({
    sender: 5,
    catcher: 4,
    chatMessage: '',
    sendTime: new Date(),
    messageState: ''
})

const friends = ref([])

const catcherName = ref('')

const isMemberSelected = ref(false)

const onGetInputMessage = (input) => {
    chatMessage.value.chatMessage = input
    console.log(chatMessage.value);
    sendMessage()
}

const onGetSelectedCatcher = (catcher, name) => {
    chatMessage.value.catcher = catcher
    isMemberSelected.value = !isMemberSelected.value
    catcherName.value = name
}

const initFriends = async () => {
    const result = await reqGetAdmins(chatMessage.value.sender)
    let admins = result.data
    friends.value = admins
    console.log(friends.value);
}

onBeforeUnmount(() => {
    if (stompClient != null) {
        stompClient.disconnect()
    }
})

//#region -------------------------------- 初始化 websocket 與方法 ------------------------------------ */

const url = ref('http://localhost:8080/chatroom')

//取得 user id
const getSenderId = async () => {
    const id = await reqGetMemberId()
    chatMessage.value.sender = id.data
    console.log(chatMessage.value);
    await initFriends()
}
getSenderId()

//initial chat room
const socket = new SockJS(url.value)
const stompClient = Stomp.over(socket)
stompClient.connect({}, (frame) => {
    console.log(frame);
    stompClient.subscribe('/topic/getResponse/user-' + chatMessage.value.sender, async (res) => {
        console.log(res.body);
        store.messages.push(JSON.parse(res.body))
        await initFriends()
    })
})

const countUnread = async () => {
    const unreadSum = await reqGetUnreadSum(chatMessage.value.sender)
    emit('get-unread-number', unreadSum.data)
}
countUnread()

const sendMessage = () => {
    if (stompClient && chatMessage.value.chatMessage) {
        stompClient.send(`/app/send-private-message`, {}, JSON.stringify(chatMessage.value))
    }
}

//#endregion -------------------------------- 初始化 websocket 與方法 ------------------------------------ */

</script>
<template>
    <div class="message-container">
        <div class="member-container">
            <MemberList :friends="friends" @get-selected-catcher="onGetSelectedCatcher" />
        </div>
        <transition name="tRoom">
            <div v-if="isMemberSelected" class="chatroom-container">
                <TextRoom :catcherName="catcherName" :sender="chatMessage.sender" :catcher="chatMessage.catcher"
                    @get-input-message="onGetInputMessage" />
            </div>
        </transition>
    </div>
</template>
<style scoped>
.message-container {
    overflow: hidden;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.member-container {
    width: 30%;
    flex-grow: 1;
    border-radius: 10px 0 0 10px;
    background-color: rgb(240, 240, 240);
}

.chatroom-container {
    width: 70%;
    background-color: rgb(250, 251, 251);
}

.tRoom-enter-active,
.tRoom-leave-active {
    transition: all 0.5s ease-in-out;
}

.tRoom-enter-from,
.tRoom-leave-to {
    width: 0px;
    opacity: 0.6;
}
</style>