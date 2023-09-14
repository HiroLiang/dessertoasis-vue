<script setup>
import { ref, computed } from 'vue';
import { NInput } from 'naive-ui'
import { useChatMessage } from '../../../stores/chatMessage';

const store = useChatMessage()

const emit = defineEmits(['get-input-message'])

const props = defineProps({
    catcher: {
        type: Number,
        default: 4
    },
    sender: {
        type: Number,
        default: 5
    }

})

const inputMessage = ref('')

const inputInstRef = ref(null);

const msgLoading = ref(false)

const catcher = computed(() => props.catcher)

const getInputMessage = (e) => {
    if (inputMessage.value !== '' && !e.shiftKey) {
        emit('get-input-message', inputMessage.value)
        inputMessage.value = ''
    } else if (e.shiftKey) {
        inputMessage.value += '\n'
        inputInstRef.value.scrollTo({
            behavior: "smooth",
            left: 1e4
        });
        console.log(inputInstRef.value);
    }
}


const getText = async () => {
    await store.initMessages(props.sender, catcher.value)
}
// @keypress.enter.prevent="getInputMessage"
</script>
<template>
    <div class="room-container">
        <div class="text-area">
            <button @click="getText">click</button>
        </div>
        <div class="input-area">
            <NInput ref="inputInstRef" v-model:value="inputMessage" @keypress.enter.prevent="getInputMessage"
                type="textarea" placeholder="請輸入訊息" :autosize="{ minRows: 1, maxRows: 3 }" :loading="msgLoading" />
        </div>
    </div>
</template>
<style scoped>
.room-container {
    background-color: rgb(133, 160, 95);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>