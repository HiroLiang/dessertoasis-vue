<script setup>
import { ref, computed } from 'vue';
import { NInput, NButton, NInputGroup } from 'naive-ui'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

//取得輸入的值
const emit = defineEmits(['get-input-value'])
const getInputValue = (value) => {
    if (value != '' && value != null) {
        emit('get-input-value', value)
        searchValue.value = ''
    }
}

const searchValue = ref('')

const searchType = computed(() => {
    for (let i = 0; i < props.searchOptions.length; i++) {
        const option = props.searchOptions[i];
        if (option.key === props.searchRange) {
            return option.type
        }
    }
    return 'String'
})

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
    },
    searchOptions: {
        default: [
            { key: "name", label: "姓名", type: "String" },
            { key: "age", label: "年齡", type: "Number" },
            { key: "birthday", label: "日期", type: "Date" }
        ]
    }
})

</script>
<template>
    <n-input-group style="width: auto;">
        <span v-if="searchType === 'Date'">
            <VueDatePicker v-model="searchValue" range />
        </span>
        <span v-else>
            <n-input @keypress.enter="getInputValue(searchValue)" v-model:value="searchValue"
                :style="{ width: searchSize + 'px' }" :placeholder="props.myPlaceholder" />
        </span>

        <n-button type="tertiary" ghost @click="getInputValue(searchValue)" style="border-radius: 5px;">
            {{ props.buttonName }}
        </n-button>
    </n-input-group>
</template>