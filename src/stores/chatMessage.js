import { ref } from "vue"
import { defineStore } from "pinia"
import { reqGetChatDatas, reqReadMessage } from "../api"

export const useChatMessage = defineStore('chatMessage', () => {

    const messages = ref([])

    const page = ref(0)

    const initMessages = async (sender, catcher) => {
        messages.value = []
        page.value = 0
        let list = await reqGetChatDatas(sender, catcher, page.value)
        messages.value = list.data.content.reverse()
        console.log(list.data);
        messages.value.forEach(msg => {
            if (msg.messageState === 'UNREAD' && msg.catcher === sender) {
                reqReadMessage(msg)
            }
        })
    }

    const getMorePage = async (sender, catcher) => {
        page.value += 1
        let list = await reqGetChatDatas(sender, catcher, page.value)
        let result = list.data.content.reverse()
        messages.value = result.concat(messages.value)
        console.log(messages.value);
    }

    const resetChatMessage = () => {
        messages.value = []
        page.value = 0
    }

    return {
        messages,
        initMessages,
        resetChatMessage,
        getMorePage,
    }
})