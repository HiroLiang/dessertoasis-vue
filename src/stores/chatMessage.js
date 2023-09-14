import { ref } from "vue"
import { defineStore } from "pinia"
import { reqGetChatDatas } from "../api"

export const useChatMessage = defineStore('chatMessage', () => {

    const messages = ref([])

    const initMessages = async (sender, catcher) => {
        let list = await reqGetChatDatas(sender, catcher)
        console.log(list.data);
    }

    return {
        messages,
        initMessages
    }
})