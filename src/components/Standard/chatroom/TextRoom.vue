<script setup>
import { ref, computed, watch, onUpdated, onMounted, onUnmounted } from 'vue';
import { NInput } from 'naive-ui'
import { useChatMessage } from '../../../stores/chatMessage';

const store = useChatMessage()

const textArea = ref(null)
const inputInstRef = ref(null)

const emit = defineEmits(['get-input-message'])

const props = defineProps({
    catcher: {
        type: Number,
        default: 4
    },
    sender: {
        type: Number,
        default: 5
    },
    catcherName: {
        type: String,
        default: '老王'
    }
})


const inputMessage = ref('')

const msgLoading = ref(false)

const messages = computed(() => {
    return store.messages
})

const msgLength = ref(0)

const msgHeight = ref(0)

//無用
const followEnter = () => {
    if (inputInstRef.value) {
        inputInstRef.value.scrollTo({
            top: 1000,
            behavior: 'smooth',
        })
    }
}

//監聽滾動
const checkScroll = () => {
    if (textArea.value) {
        const container = textArea.value
        if (container.scrollTop <= 0) {
            console.log('go!');
            msgHeight.value = textArea.value.scrollHeight
            store.getMorePage(props.sender, props.catcher)
        }
    }
}

//滾動到底部
const scrollToBottom = (to, way) => {
    if (textArea.value) {
        textArea.value.scroll({
            top: to,
            behavior: way,
        })
    }
}

const getInputMessage = (e) => {
    if (inputMessage.value !== '' && !e.shiftKey) {
        emit('get-input-message', inputMessage.value)
        inputMessage.value = ''
    } else if (e.shiftKey) {
        inputMessage.value += '\n'
        followEnter()
    }
}

watch(messages, () => {

})

onUpdated(() => {
    if (msgLength.value === 0) {
        scrollToBottom(textArea.value.scrollHeight, 'smooth')
        msgLength.value = messages.value.length
    } else if (messages.value.length === msgLength.value) {
        msgLength.value = messages.value.length
    } else if (messages.value.length - msgLength.value < 3) {
        scrollToBottom(textArea.value.scrollHeight, 'smooth')
        msgLength.value = messages.value.length
    } else if (messages.value.length - msgLength.value >= 3) {
        scrollToBottom(textArea.value.scrollHeight - msgHeight.value + 10, 'instant')
        msgLength.value = messages.value.length
    }
})

onMounted(() => {
    console.log('我是' + props.sender + '，在與' + props.catcher + '聊天');
    store.initMessages(props.sender, props.catcher)
})

onUnmounted(() => {
    store.resetChatMessage()
})

</script>
<template>
    <div class="room-container">
        <div style="display: flex;justify-content: center; align-items: center;">
            <h2>{{ catcherName }} </h2>
        </div>
        <div class="text-area" ref="textArea" @scroll="checkScroll">
            <template v-for="msg in messages" :key="msg.id">
                <div v-if="msg.catcher == sender" class="singleMessageContainer-catcher">
                    <div class="profilePicContainer">
                        <img src="/images/navbar/user-interface.png" alt="">
                    </div>
                    <div>
                        <p>{{ catcherName }}</p>
                        <div class="singleMessage">
                            {{ msg.chatMessage }}
                        </div>
                    </div>
                </div>
                <div v-else class="singleMessageContainer-sender">
                    <div style="display: flex; flex-direction: column;justify-content: right;margin: 0;">
                        <div style="display: flex;justify-content: right;margin-right: 10px;">
                            <p>{{ }}</p>
                        </div>
                        <div class="singleMessage-sender">
                            {{ msg.chatMessage }}
                        </div>
                    </div>
                    <div class="profilePicContainer">
                        <img src="/images/navbar/user-interface.png" alt="">
                    </div>
                </div>
            </template>
        </div>
        <div class="input-area">
            <NInput ref="inputInstRef" v-model:value="inputMessage" @keypress.enter.prevent="getInputMessage"
                type="textarea" placeholder="請輸入訊息" :autosize="{ minRows: 1, maxRows: 3 }" :loading="msgLoading" />
        </div>
    </div>
</template>
<style scoped>
h2 {
    font-size: 24px;
}

p {
    opacity: 0.7;
    margin: 0;
    font-size: 12px;
    padding-left: 20px;
}

.room-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.text-area {
    width: 100%;
    height: auto;
    overflow-y: scroll;
}

.singleMessageContainer-catcher {
    margin-top: 10px;
    margin-bottom: 5px;
    padding-left: 10px;
    display: flex;
    justify-content: left;
    height: auto;
    overflow: hidden;
}

.singleMessageContainer-sender {
    margin-top: 15px;
    margin-bottom: 5px;
    padding-right: 10px;
    display: flex;
    justify-content: right;
    height: auto;
    overflow: hidden;
}

.singleMessage-sender {
    background: #f4f2f2;
    height: auto;
    margin: 0 20px;
    padding: 10px;
    position: relative;
    width: auto;
    max-width: 80%;
    border-radius: 10px;
    font-size: 14px;
}

.singleMessage-sender::before {
    border-color: #f4f2f2 transparent transparent #f4f2f2;
    border-style: solid;
    border-width: 5px;
    content: "";
    height: 0px;
    position: absolute;
    top: 10px;
    left: 100%;
    width: 0px;
}

.singleMessage {
    background: #b9e2e2;
    height: auto;
    margin: 0 20px;
    padding: 10px;
    position: relative;
    width: auto;
    max-width: 80%;
    border-radius: 10px;
    font-size: 14px;
}

.singleMessage::before {
    border-color: #b9e2e2 #b9e2e2 transparent transparent;
    border-style: solid;
    border-width: 5px;
    content: "";
    height: 0px;
    position: absolute;
    top: 10px;
    left: -10px;
    width: 0px;
}

.profilePicContainer {
    height: 24px;
    width: 24px;
}

.profilePicContainer>img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.input-area {
    background-color: aliceblue;
}
</style>