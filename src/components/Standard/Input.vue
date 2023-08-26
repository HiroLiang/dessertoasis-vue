<script setup>
import { ref } from 'vue';
import { NInput, NButton, NInputGroup } from 'naive-ui'

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
    }
})

</script>
<template>
    <n-input-group style="width: auto;">
        <n-input @keyup.enter="getSInputValue(searchValue)" v-model:value="searchValue"
            :style="{ width: searchSize + 'px' }" :placeholder="props.myPlaceholder" />
        <n-button type="tertiary" ghost @click="getSInputValue(searchValue)" style="border-radius: 5px;">
            {{ props.buttonName }}
        </n-button>
    </n-input-group>
</template>