<!-- 
    標籤使用方法：
        1.定義屬性：
            (1) tableDatas ( 第一項必須是 id , 含有date即會被以日期解釋) 
            (2) dataTitles ( 照想顯示的順序給{ label , key } )
        2.定義自定義事件：get-edit-id : 取得要修改的id值
 -->
<script setup>
import StandardInput from './Input.vue'
import StandardDrorpdown from './Dropdown.vue'
import { ref, computed, watch, reactive } from 'vue'
import { NTable, NPagination, NButton, NSpace, NSlider, NInputNumber } from 'naive-ui'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

//當前頁碼
const page = ref(1)

//單頁顯示筆數
const pageSize = ref(10)

//搜索範圍
const searchRange = ref('')

//搜索值
const searchValue = ref('')

//設定數字篩選範圍
const rangeIsNumber = ref(false)
const numberRange = ref([0, 100])
const numberMax = computed(() => {
    if (typeof props.tableDatas[0][searchRange.value] === 'number') {
        let max = -10000000
        props.tableDatas.forEach(data => {
            if (data[searchRange.value] > max) {
                max = data[searchRange.value]
            }
        })
        return max
    } else {
        return 100
    }
})
const numberMin = computed(() => {
    if (typeof props.tableDatas[0][searchRange.value] === 'number') {
        let min = 10000000
        props.tableDatas.forEach(data => {
            if (data[searchRange.value] < min) {
                min = data[searchRange.value]
            }
        })
        return min
    } else {
        return 0
    }
})

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
    格式： [{ label : ' 展示名 ', key : ' key '} , ...] 
    */
    dataTitles: {
        default: [{ label: "名字", key: "name" }, { label: "年齡", key: "age" }, { label: "日期", key: "date" }]
    }
})

//數據篩選
const allDatas = computed(() => {
    let numberFiltedDatas = []
    if (rangeIsNumber.value) {
        props.tableDatas.forEach(data => {
            if (data[searchRange.value] >= numberRange.value[0] && data[searchRange.value] <= numberRange.value[1]) {
                numberFiltedDatas.push(data)
            }
        })
    } else {
        numberFiltedDatas = props.tableDatas
    }
    let datas = []
    let check = false
    if (searchRule.length > 0) {
        numberFiltedDatas.forEach(data => {
            for (let i = 0; i < searchRule.length; i++) {
                let rule = searchRule[i]
                if (typeof data[rule.key] === 'string' && data[rule.key].includes(rule.input)) {
                    check = true
                } else if (typeof data[rule.key] === 'number' && data[rule.key] == rule.input) {
                    check = true
                } else if ((rule.key.includes('date') || rule.key.includes('Date')) && data[rule.key] >= rule.start && data[rule.key] <= rule.end) {
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
        return numberFiltedDatas
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

//顯示用數據
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

const formattedDate = (date) => {
    const options = { year: 'numeric', month: 'narrow', day: '2-digit', hour: '2-digit', minute: '2-digit', }
    return date.toLocaleDateString('zh-TW', options)
}

//排列功能
const nowSortBy = ref('')
const posOrNag = ref(false)
const sortDatas = (key) => {
    nowSortBy.value = key
    if (posOrNag.value) {
        allDatas.value.sort((a, b) => a[key] - b[key])
        posOrNag.value = !posOrNag.value
    } else {
        allDatas.value.sort((a, b) => b[key] - a[key])
        posOrNag.value = !posOrNag.value
    }
    page.value = 2
    page.value = 1
}

//監測單頁筆數改變，防止超頁
watch(pageSize, () => {
    page.value = 1
})

//監測搜索數值時重設數據
watch(searchRange, () => {
    if (typeof props.tableDatas[0][searchRange.value] === 'number') {
        rangeIsNumber.value = true
    } else {
        rangeIsNumber.value = false
    }
})

//更新range max.min 值
watch(numberMax, () => {
    numberRange.value[1] = numberMax.value
})
watch(numberMin, () => {
    numberRange.value[0] = numberMin.value
})

//監測新搜索條件
watch(searchValue, () => {
    if (searchValue.value !== '' && searchValue.value !== null) {
        if (searchRange.value.includes('date')) {
            searchRule.push({ key: searchRange.value, start: searchValue.value[0], end: searchValue.value[1] })
        } else if (searchRange.value !== '') {
            searchRule.push({ key: searchRange.value, input: searchValue.value })
        } else {
            searchRule.push({ key: props.dataTitles[0].key, input: searchValue.value })
        }
        page.value = 1
    }
})

//修改按鈕回調
const emit = defineEmits(['get-edit-id'])
const getEditId = (id) => {
    emit('get-edit-id', id)
}

const sortCondition = {
    table: 'Member',
    page: 1,
    pageSize: 10,
    joinTables: ['Course', 'Teacher'],
    sortBy: 'signDate',
    sortWay: 'DESC',
    whereCol: 'memberName',
    whereLike: 'L'
}

</script>
<template>
    <div style="display: flex; justify-content: left; align-items: center;">
        <StandardDrorpdown :searchOptions="searchOptions" @get-selected-key="getKey" />
        <StandardInput @get-input-value="getValue" :searchRange="searchRange" />
        <template v-if="typeof props.tableDatas[0][searchRange] === 'number'">
            <n-space vertical>
                <n-slider v-model:value="numberRange" range :max="numberMax" :min="numberMin" :step="1"
                    style="width: 100px;margin-left: 20px;" />
            </n-space>
            <n-input-number v-model:value="numberRange[0]" size="small" style="width: 120px;" />
            <n-input-number v-model:value="numberRange[1]" size="small" style="width: 120px;" />
        </template>

    </div>
    <div>
        <span v-for="(rule, index) in searchRule">
            <n-button v-if="!rule.key.includes('date')" size="tiny" @mouseenter="showX = true" @mouseleave="showX = false"
                quaternary round class="deleteBtn" @click="deleteRule(index)">
                {{ rule.input }}
            </n-button>
            <n-button v-if="rule.key.includes('date')" size="tiny" @mouseenter="showX = true" @mouseleave="showX = false"
                quaternary round class="deleteBtn" @click="deleteRule(index)">
                {{ rule.start.toLocaleDateString() }} - {{ rule.end.toLocaleDateString() }}
            </n-button>
        </span>
    </div>
    <div class="tableArea">
        <n-table :bordered="false" :single-line="false" size="small">
            <thead>
                <tr>
                    <th>No.</th>
                    <th v-for="title in props.dataTitles" @click="sortDatas(title.key)" class="sortableTh">
                        {{ title.label }}
                        <font-awesome-icon v-if="nowSortBy === title.key && !posOrNag" :icon="['fas', 'angle-down']"
                            size="2xs" style="color: #872323;" />
                        <font-awesome-icon v-else-if="nowSortBy === title.key && posOrNag" :icon="['fas', 'angle-up']"
                            size="2xs" style="color: #872323;" />
                        <font-awesome-icon v-else :icon="['fas', 'angle-down']" size="2xs" />
                    </th>
                    <th>修改</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(data, index) in showedDatas">
                    <td v-for="(value, key) in data">
                        <span v-if="key !== 'id' && !key.includes('date')">{{ value }}</span>
                        <span v-if="key.includes('date')">{{ formattedDate(value) }}</span>
                        <span v-if="key === 'id'">{{ index + 1 }}</span>
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