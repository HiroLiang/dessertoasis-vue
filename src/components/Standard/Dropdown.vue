<!-- 
    標籤使用方法：
        1.定義屬性：(1) searchOptions 
        2.定義自定義事件：(1) @get-selected-key => 接收傳值:(選擇到的key)
 -->
<script setup>
import { ref } from 'vue';
import { NButton, NDropdown } from 'naive-ui'
//給予selector初始值
const selectedOption = ref('請選擇')
//定義emit方法
const emit = defineEmits(['get-selected-key'])
const getSelectedKey = (key) => {
    emit('get-selected-key', key)
}
//定義傳入值
const props = defineProps({
    /*
    下拉選單內容
    傳值：[{ label : '展示名' , key : 'key' } , ...] 
    */
    searchOptions: {}
})
//附值給組件屬性
const options = props.searchOptions
//定義組件方法
const handleSelect = (option) => {
    options.forEach(element => {
        if (element.key === option) {
            selectedOption.value = element.label
            getSelectedKey(element.key)
        }
    })
}
</script>

<template>
    <n-dropdown trigger="click" :options="options" @select="handleSelect">
        <n-button class="dropdown-toggle">{{ selectedOption }}</n-button>
    </n-dropdown>
</template>