<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import chatroom from '../../../components/Standard/ChatRoom.vue'

/* 自定義方法 */
const emit = defineEmits(['show-sidebar'])

const props = defineProps({
    navTitle: {}
})

/* 定義變數 */
// Sidebar controller
const ifSidbar = ref(false)

const showChatRoom = ref(false)

/* 定義傳出值方法 */
// Sidebar control btn event
const showSide = () => {
    ifSidbar.value = !ifSidbar.value
    emit('show-sidebar', ifSidbar.value)
}
</script>
<template>
    <nav class="navbar navbar-light bg-light" id="navbar">
        <div class="container-fluid">
            <div>
                <a class="navbar-brand sidebarController" @click="showSide">
                    <font-awesome-icon :icon="['fas', 'bars']" />
                </a>
            </div>
            <div>
                <h2>{{ navTitle }}</h2>
            </div>
            <div class="rightSideOptions">
                <div style="width: 32px;">
                    <div @click="showChatRoom = true" class="message-icon-container">
                        <font-awesome-icon :icon="['fas', 'comment-dots']" size="xl" />
                        <i class="message-icon fas fa-envelope"></i>
                        <span class="message-count">3</span>
                    </div>
                </div>
                <div>
                    <font-awesome-icon :icon="['fas', 'angle-down']" size="xs" />
                    <h3>員工工作選項</h3>
                </div>
            </div>
        </div>
    </nav>
    <transition name="chat">
        <div v-show="showChatRoom" @click="showChatRoom = false" class="chatRoomJustPosition">
            <div class="chatRoomContainer" @click.stop>
                <chatroom />
            </div>
        </div>
    </transition>
</template>
<style scoped>
h3 {
    margin: 0;
    display: block;
    font-size: 18px;
}

.sidebarController {
    cursor: pointer;
}

.rightSideOptions {
    display: flex;
    margin-right: 20px;
}

.rightSideOptions div {
    padding-left: 10px;
    padding-right: 10px;
    height: 36px;
    background-color: rgb(229, 236, 244);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.message-icon-container {
    position: relative;
}

.message-count {
    position: absolute;
    width: 16px;
    height: 16px;
    top: 0px;
    right: 0px;
    background-color: red;
    color: white;
    border-radius: 50%;
    padding-left: 3px;
    font-size: 2px;
}

.chatRoomJustPosition {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 1;
}

.chatRoomContainer {
    padding: 20px;
    height: 80%;
    width: 70%;
    overflow: hidden;
    border: 2px double rgb(182, 139, 139);
    border-radius: 10px;
    background-color: rgb(255, 249, 249);
}

.chat-enter-active,
.chat-leave-active {
    transition: all 0.5s ease-in-out;
}

.chat-enter-from,
.chat-leave-to {
    opacity: 0.5;
    transform: translateY(-44%) translateX(35%) scale(0);
}
</style>