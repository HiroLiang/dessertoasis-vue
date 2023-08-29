<script setup>
import { ref } from 'vue';
import { NInput, NButton, NInputGroup } from 'naive-ui'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

//取得輸入的值
const emit = defineEmits(['get-input-value'])
const getSInputValue = (value) => {
    emit('get-input-value', value)
    searchValue.value = ''
}

const searchValue = ref('')

const props = defineProps({
    searchSize: {
        type: Number,
        default: 200
    },
    buttonName: {
        type: String,
        default: '搜尋'
    },
    myPlaceholder: {
        type: String,
        default: '請輸入搜索'
    },
    searchRange: {
        type: String,
        default: ''
    }
})

</script>
<template>
    <n-input-group style="width: auto;">
        <span v-if="!props.searchRange.includes('date')">
            <n-input @keypress.enter="getSInputValue(searchValue)" v-model:value="searchValue"
                :style="{ width: searchSize + 'px' }" :placeholder="props.myPlaceholder" />
        </span>
        <span v-if="props.searchRange.includes('date')">
            <VueDatePicker v-model="searchValue" range />
        </span>
        <n-button type="tertiary" ghost @click="getSInputValue(searchValue)" style="border-radius: 5px;">
            {{ props.buttonName }}
        </n-button>
    </n-input-group>
</template>