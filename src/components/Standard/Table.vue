<!-- 
    使用方法：
        傳值：
            (1)tableDatas：資料內容
            (2)dataTitles：資料標題、排序與型態
            (3)page：現在頁數
            (4)pages：總頁數
            (5)pageSize：單頁筆數
        自定義方法：
            (1)get-search-rules：取得Like搜索
            (2)get-number-range：取得範圍搜索
            (3)get-sort-rule：取得排序規則
            (4)change-page：換頁、換筆數
            (5)get-date-rules：取得日期範圍
            (6)get-edit-id：取得修改ID
 -->
<script setup>
import { ref, watch } from 'vue'
import StandardSearch from './Search.vue'
import { NTable, NPagination } from 'naive-ui'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const emit = defineEmits(['get-edit-id', 'get-search-rules', 'get-number-range', 'get-sort-rule', 'change-page', 'get-date-rules'])

const props = defineProps({
    /*
    表格資料
    格式：[ { id : id , title1 : text1 ( , xxdatexx : Date ... ) } ]
    */
    tableDatas: {
        default: [
            { id: 1, name: "大恐龍1", age: 9, date: new Date("2020-01-01T11:11:00") },
            { id: 2, name: "大恐龍2", age: 99, date: new Date("2021-02-01T12:30:00") },
            { id: 3, name: "大恐龍n", age: 999, date: new Date("2022-11-30T23:11:00") }
        ]
    },
    /*
    表格標頭
    格式： [{ label : ' 展示名 ', key : ' key ' , type : ' 資料型態 '} , ...] 
    */
    dataTitles: {
        default: [
            { label: "名字", key: "name", type: "String" },
            { label: "年齡", key: "age", type: "Number" },
            { label: "日期", key: "date", type: "Date" }
        ]
    },
    page: {
        default: 2
    },
    pageSize: {
        default: 10
    },
    pages: {
        default: 100
    }
})

const page = ref(1)

const pages = ref(50)

const pageSize = ref(10)

const sortWay = ref(true)

const getRules = (rules) => {
    let dateRules = []
    let searchRules = []
    for (let i = 0; i < rules.length; i++) {
        if (rules[i].type === 'Date') {
            dateRules.push(rules[i])
        } else {
            searchRules.push(rules[i])
        }
    }
    emit('get-date-rules', dateRules)
    emit('get-search-rules', searchRules)
}
const getNumberRange = (numberRange) => {
    console.log(numberRange)
    emit('get-number-range', numberRange)
}

const getSortRule = (key) => {
    if (sortWay.value) {
        sortWay.value = false
        emit('get-sort-rule', [key, 'ASC'])
    } else {
        sortWay.value = true
        emit('get-sort-rule', [key, 'DESC'])
    }
}

const getEditId = (id) => {
    emit('get-edit-id', id)
}

const formattedDate = (date) => {
    const options = { year: 'numeric', month: 'narrow', day: '2-digit', hour: '2-digit', minute: '2-digit', }
    return date.toLocaleDateString('zh-TW', options)
}

watch(page, () => {
    console.log([page.value, pageSize.value]);
    emit('change-page', [page.value, pageSize.value])
})

watch(pageSize, () => {
    console.log([page.value, pageSize.value]);
    emit('change-page', [page.value, pageSize.value])
})


page.value = props.page
pages.value = props.pages
pageSize.value = props.pageSize


</script>
<template>
    <StandardSearch :searchOptions="props.dataTitles" @get-search-rules="getRules" @get-number-range="getNumberRange" />
    <div class="tableArea">
        <n-table :bordered="false" :single-line="false" size="small">
            <thead>
                <tr>
                    <th>No.</th>
                    <th v-for="title in props.dataTitles" @click="getSortRule(title.key)" class="sortableTh">
                        {{ title.label }}
                        <font-awesome-icon :icon="['fas', 'angle-down']" size="2xs" />
                    </th>
                    <th>修改</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(data, index) in props.tableDatas">
                    <td>{{ index + 1 }}</td>
                    <td v-for="title in props.dataTitles">
                        <span v-if="title.type === 'String' || title.type === 'Number'">{{ data[title.key] }}</span>
                        <span v-else-if="title.type === 'Date'">{{ formattedDate(data[title.key]) }}</span>
                        <span v-else>{{ data[title.key] }}</span>
                    </td>
                    <td>
                        <n-button @click="getEditId(data.id)" strong secondary round>修改</n-button>
                    </td>
                </tr>
            </tbody>
        </n-table>
    </div>
    <n-pagination v-model:page="page" :page-count="pages" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
        size="medium" show-quick-jumper show-size-picker />
</template>
<style scoped>
.sortableTh {
    cursor: pointer;
}

.tableArea {
    height: auto;
    max-height: 520px;
    overflow: scroll;
}
</style>