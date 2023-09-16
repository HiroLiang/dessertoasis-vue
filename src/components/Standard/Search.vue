<!-- 
    使用方法：
        傳入值：
            (1)searchSize：搜索條長度
            (2)buttonName：搜索按鈕名稱
            (3)myPlaceholder：input顯示字串
            (4)searchOptions：搜索選項
            (5)numberRange：各數值key最大最小值
            (6)autoClear：自動清空輸入
        自定義方法：
            (1)get-search-rules：取得搜索條件
            (2)'get-number-range'：取得數值範圍
            (3)'get-selected-key'：取得現在搜索key
 -->
<script setup>
import StandardInput from './Input.vue'
import StandardDropdown from './Dropdown.vue'
import { ref, reactive, computed, onBeforeMount, watch } from 'vue'
import { NButton, NSpace, NInputNumber, NSlider } from 'naive-ui'

/**定義 emit 方法 */
const emit = defineEmits(['get-search-rules', 'get-number-range', 'get-selected-key'])

/**定義 props */
const props = defineProps({
    //搜索input長度
    searchSize: {
        type: Number,
        default: 200
    },
    //搜索按鈕名稱
    buttonName: {
        type: String,
        default: '搜尋'
    },
    //預顯示字串
    myPlaceholder: {
        type: String,
        default: '請輸入搜索'
    },
    //型態為Number的option
    numberRanges: {
        default: [{ key: "age", max: 100, min: 0 }]
    },
    //搜索選項
    searchOptions: {
        default: [
            { key: "name", label: "姓名", type: "String" },
            { key: "age", label: "年齡", type: "Number" },
            { key: "birthday", label: "日期", type: "Date" }
        ]
    },
    //提示字串
    hintOptions: {
        default: [
            { label: ' - 無對應結果', value: ' ', disabled: true }
        ]
    },
    autoClear: {
        type: Boolean,
        default: true
    }
})

/**定義變數 */
//搜索選項
const searchOptions = reactive([])
//搜索規則
const searchRules = reactive([])
//搜索數字範圍
const numberRange = ref([0, 100])

const rangePath = computed(() => {
    return props.numberRanges
})

//數值範圍搜索
const numberMax = ref(100)
const numberMin = ref(0)

//現在搜索選項
const searchRange = ref('')
const searchName = computed(() => {
    for (let i = 0; i < props.searchOptions.length; i++) {
        const option = props.searchOptions[i];
        if (option.key === searchRange.value) {
            return option.label
        }
    }
    return ''
})

//現在搜索資料型態
const searchType = computed(() => {
    for (let i = 0; i < props.searchOptions.length; i++) {
        const option = props.searchOptions[i];
        if (option.key === searchRange.value) {
            return option.type
        }
    }
    return 'String'
})

/**接 children emit 值 */
//接收搜索範圍
const getKey = (key) => {
    searchRange.value = key
    emit('get-selected-key', key)
}
//接收搜索條 input
const getValue = (value) => {
    if (searchType.value === 'String') {
        searchRules.push({ key: searchRange.value, type: searchType.value, input: value })
    } else if (searchType.value === 'Number') {
        searchRules.push({ key: searchRange.value, type: searchType.value, input: value })
    } else {
        searchRules.push({ key: searchRange.value, type: searchType.value, start: value[0], end: value[1] })
    }
}
//刪除搜索條件
const deleteRule = (index) => {
    searchRules.splice(index, 1)
}

/** emit 方法 */
//傳出搜索數值範圍
const getNumberRange = () => {
    emit('get-number-range', [searchRange.value, numberRange.value[0], numberRange.value[1]])
}

/**監視屬性 */
//傳出搜索條件
watch(searchRules, () => {
    emit('get-search-rules', searchRules)
})

//設定數值範圍，非數值時清除搜索條件
watch(rangePath, () => {
    if (searchType.value === 'Number') {
        props.numberRanges.forEach(range => {
            if (range.key === searchRange.value) {
                numberMax.value = range.max
                numberMin.value = range.min
                numberRange.value[0] = range.min
                numberRange.value[1] = range.max
            }
        })
    } else {
        emit('get-number-range', [])
    }
})

/**定義初始化動作 */
onBeforeMount(() => {
    props.searchOptions.forEach(option => {
        searchOptions.push({ key: option.key, label: option.label })
    })
})
</script>
<template>
    <div style="display: flex; justify-content: left; align-items: center;">
        <StandardDropdown @get-selected-key="getKey" :searchOptions="searchOptions" />
        <StandardInput @get-input-value="getValue" :hintOptions="hintOptions" :searchOptions="props.searchOptions"
            :searchRange="searchRange" :searchSize="searchSize" :buttonName="buttonName" :myPlaceholder="myPlaceholder" />

    </div>
    <div>
        <span v-for="(rule, index) in searchRules">
            <n-button v-if="rule.type === 'Date'" size="tiny" @mouseenter="showX = true" @mouseleave="showX = false"
                quaternary round class="deleteBtn" @click="deleteRule(index)">
                {{ rule.start.toLocaleDateString() }} - {{ rule.end.toLocaleDateString() }}
            </n-button>
            <n-button v-else size="tiny" @mouseenter="showX = true" @mouseleave="showX = false" quaternary round
                class="deleteBtn" @click="deleteRule(index)">
                {{ rule.input }}
            </n-button>
        </span>
    </div>
    <div style="display: flex;align-items: center;">
        <template v-if="searchType === 'Number'">
            <div style="padding-left: 15px;">
                {{ searchName }}:
            </div>
            <div class="numberRangeContainer">
                <n-space @mouseup="getNumberRange" @mouseleave="getNumberRange" vertical>
                    <n-slider v-model:value="numberRange" range :max="numberMax" :min="numberMin" :step="1"
                        style="width: 100px;margin-left: 20px;" />
                </n-space>
                <n-input-number @blur="getNumberRange" v-model:value="numberRange[0]" size="small" style="width: 90px;" />
                <n-input-number @blur="getNumberRange" v-model:value="numberRange[1]" size="small" style="width: 90px;" />
            </div>
        </template>
    </div>
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

.numberRangeContainer {
    display: flex;
    padding-left: 5px;
    padding-top: 10px;
}

@media(max-width:550px) {
    .numberRangeContainer {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        height: 150px;

    }
}
</style>