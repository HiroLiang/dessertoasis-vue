<script setup>
import { ref, computed } from 'vue';
import { NInput, NButton, NInputGroup, NPopselect } from 'naive-ui'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

/* 定義 emit 方法 */
const emit = defineEmits(['get-input-value'])

/* 定義 props */
const props = defineProps({
    //搜索欄位大小
    searchSize: {
        type: Number,
        default: 200
    },
    //按鈕顯示文字
    buttonName: {
        type: String,
        default: '搜尋'
    },
    //待輸入提示
    myPlaceholder: {
        type: String,
        default: '請輸入搜索'
    },
    //現在搜索條件選項
    searchRange: {
        type: String,
        default: ' '
    },
    //定義所有搜索條件
    searchOptions: {
        default: [
            { key: "name", label: "姓名", type: "String" },
            { key: "age", label: "年齡", type: "Number" },
            { key: "birthday", label: "日期", type: "Date" }
        ]
    },
    //輸入提示
    hintOptions: {
        default: [
            { label: '無對應結果', value: ' ', disabled: true }
        ]
    }
})

/* 定義變數 */
//搜索範圍
const searchValue = ref('')

//搜索條件的數值型態
const searchType = computed(() => {
    searchValue.value = ''
    for (let i = 0; i < props.searchOptions.length; i++) {
        const option = props.searchOptions[i];
        if (option.key === props.searchRange) {
            return option.type
        }
    }
    return 'String'
})

/* meit 傳出方法 */
//傳出 Input
const getInputValue = (value) => {
    if (value != '' && value != null && props.searchRange !== '') {
        emit('get-input-value', value)
        searchValue.value = ''
    }
}

</script>
<template>
    <n-input-group style="width: auto;">
        <span v-if="searchType === 'Date'">
            <VueDatePicker v-model="searchValue" range />
        </span>
        <span v-else>
            <!-- <n-popselect v-model:value="searchValue" trigger="focus" :options="hintOptions" size="medium" scrollable> -->
            <n-input @keypress.enter="getInputValue(searchValue)" v-model:value="searchValue"
                :style="{ width: searchSize + 'px' }" :placeholder="myPlaceholder" />
            <!-- </n-popselect> -->
        </span>

        <n-button type="tertiary" ghost @click="getInputValue(searchValue)" style="border-radius: 5px;">
            {{ buttonName }}
        </n-button>
    </n-input-group>
</template>