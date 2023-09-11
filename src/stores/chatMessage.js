import { ref } from "vue"
import { defineStore } from "pinia"

export const useChatMessage = defineStore('chatMessage', () => {

    const unreadMessage = ref([])
    const readedMessage = ref([])

    const initMessage = () => {

    }

    return {
        messageData
    }
})