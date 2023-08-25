<!-- 
    標籤使用方法：
        1.定義屬性：(1) tableDatas (2) dataTitles
        2.定義自定義事件：無
 -->
<script setup>
import StandardInput from './Input.vue'
import StandardDrorpdown from './Dropdown.vue'
import { ref, computed, watch, reactive } from 'vue'
import { NTable, NPagination, NButton } from 'naive-ui'

//當前頁碼
const page = ref(1)

//單頁顯示筆數
const pageSize = ref(5)

//搜索範圍
const searchRange = ref('')

//搜索值
const searchValue = ref('')

//分頁數
const pages = computed(() => {
    return Math.ceil(allDatas.length / pageSize.value)
})

//可傳入值
const props = defineProps({
    /*
    表格資料
    格式：[ { id : id , title1 : text1 ( , title2 : text2 ... ) } ]
    */
    tableDatas: {
        default: [
            { id: 1, name: "大恐龍1", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍", age: 999, text: "你沒有傳資料" },
            { id: 1, name: "大恐龍n", age: 999, text: "你沒有傳資料" },
        ]
    },
    /*
    表格標頭
    格式： [{ label : ' 展示名 ', key : ' key '} , ...] 
    */
    dataTitles: {
        default: [{ label: "名字", key: "name" }, { label: "年齡", key: "age" }, { label: "備註", key: "text" }]
    }
})

let allDatas = props.tableDatas

console.log(allDatas[0]);

//定義搜索選項
const searchOptions = reactive(props.dataTitles)

//接收搜索範圍
const getKey = (key) => {
    searchRange.value = key
}

const getValue = (value) => {
    searchValue.value = value
}

//顯示頁面
const showedDatas = computed(() => {
    let from = (page.value - 1) * pageSize.value
    let to = from + pageSize.value
    let datas = allDatas.slice(from, to)
    return datas
})

//監測單頁筆數改變，防止超頁
watch(pageSize, () => {
    page.value = 1
})

watch(searchValue, () => {
    let datas = []
    if (searchValue.value !== null && searchValue.value !== '') {
        if (searchRange.value !== null && searchRange.value !== '') {
            props.tableDatas.forEach(element => {
                if (typeof element[searchRange.value] === 'string') {
                    if (element[searchRange.value].includes(searchValue.value)) {
                        datas.push(element)
                    }
                } else if (typeof element[searchRange.value] === 'number') {
                    if (element[searchRange.value] === parseFloat(searchValue.value)) {
                        datas.push(element)
                    }
                }
            })
            allDatas = datas
        } else {
            allDatas = props.tableDatas
        }
    } else {
        allDatas = props.tableDatas
    }
    page.value = 2
    page.value = 1
    pageSize.value = 3
    pageSize.value = 5
})
</script>
<template>
    <div style="display: flex; justify-content: left;">
        <StandardDrorpdown :searchOptions="searchOptions" @get-selected-key="getKey" />
        <StandardInput @get-input-value="getValue" />
    </div>
    <n-table :bordered="false" :single-line="false" size="small">
        <thead>
            <tr>
                <th>No.</th>
                <th v-for="title in props.dataTitles">{{ title.lable }}</th>
                <th>修改</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(data, index) in showedDatas">
                <td v-for="(value, key) in data">
                    <span v-if="key !== 'id'">{{ value }}</span>
                    <span v-if="key === 'id'">{{ index + 1 }}</span>
                </td>
                <td>
                    <n-button strong secondary round>修改</n-button>
                </td>
            </tr>
        </tbody>
    </n-table>
    <n-pagination v-model:page="page" :page-count="pages" v-model:page-size="pageSize" :page-sizes="[5, 10]" size="medium"
        show-quick-jumper show-size-picker />
</template>