<!-- 
    標籤使用方法：
        1.定義屬性：
            (1) tableDatas ( 第一項必須是 id ) 
            (2) dataTitles ( 照想顯示的順序給{ label , key } )
        2.定義自定義事件：get-edit-id : 取得要修改的id值
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

//搜索條件
const searchRule = reactive([])

//分頁數
const pages = computed(() => {
    return Math.ceil(allDatas.value.length / pageSize.value)
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

const allDatas = computed(() => {
    let datas = []
    let check = false
    if (searchRule.length > 0) {
        props.tableDatas.forEach(data => {
            for (let i = 0; i < searchRule.length; i++) {
                let rule = searchRule[i]
                if (typeof data[rule.key] === 'string' && data[rule.key].includes(rule.input)) {
                    check = true
                } else if (typeof data[rule.key] === 'number' && data[rule.key] == rule.input) {
                    check = true
                } else {
                    check = false
                    break
                }
            }
            if (check) {
                check = false
                datas.push(data)
            }
        })
        return datas
    } else {
        return props.tableDatas
    }
})


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
    let usedDatas = []
    let from = (page.value - 1) * pageSize.value
    let to = from + pageSize.value
    for (let i = from; i < to && i < allDatas.value.length; i++) {
        usedDatas.push(allDatas.value[i])
    }
    return usedDatas
})

//刪除搜索條件
const deleteRule = (index) => {
    searchRule.splice(index, 1)
}

//監測單頁筆數改變，防止超頁
watch(pageSize, () => {
    page.value = 1
})

//監測新搜索條件
watch(searchValue, () => {
    if (searchValue.value !== '' && searchValue.value !== null) {
        if (searchRange.value !== '') {
            searchRule.push({ key: searchRange.value, input: searchValue.value })
        } else {
            searchRule.push({ key: props.dataTitles[0].key, input: searchValue.value })
        }
        page.value = 1
    }
})

const emit = defineEmits(['get-edit-id'])
const getEditId = (id) => {
    emit('get-edit-id', id)
}
</script>
<template>
    <div style="display: flex; justify-content: left; align-items: center;">
        <StandardDrorpdown :searchOptions="searchOptions" @get-selected-key="getKey" />
        <StandardInput @get-input-value="getValue" />
        <n-button v-for="(rule, index) in searchRule" size="tiny" @mouseenter="showX = true" @mouseleave="showX = false"
            quaternary round class="deleteBtn" @click="deleteRule(index)">
            {{ rule.input }}
        </n-button>
    </div>
    <n-table :bordered="false" :single-line="false" size="small">
        <thead>
            <tr>
                <th>No.</th>
                <th v-for="title in props.dataTitles">{{ title.label }}</th>
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
                    <n-button @click="getEditId(data.id)" strong secondary round>修改</n-button>
                </td>
            </tr>
        </tbody>
    </n-table>
    <n-pagination v-model:page="page" :page-count="pages" v-model:page-size="pageSize" :page-sizes="[5, 10]" size="medium"
        show-quick-jumper show-size-picker />
</template>
<style scoped>
.deleteBtn {
    width: auto;
    padding-left: 20px;
    padding-right: 30px;
    margin-left: 10px;
    background-color: rgb(244, 244, 244);
}

.deleteBtn:hover {
    background-color: rgb(253, 214, 214);
    text-decoration: line-through;
}

.deleteBtn::before {
    content: 'x';
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: rgb(162, 162, 162);
    font-weight: bold;
    opacity: 0;
}

.deleteBtn:hover::before {
    opacity: 1;
}
</style>