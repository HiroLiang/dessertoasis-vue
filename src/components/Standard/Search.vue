<!-- 
    使用方法：
        傳入值：
            (1)searchSize：搜索條長度
            (2)buttonName：搜索按鈕名稱
            (3)myPlaceholder：input顯示字串
            (4)searchOptions：搜索選項
            (5)numberRange：各數值key最大最小值
        自定義方法：
            (1)get-search-rules：取得搜索條件
            (2)'get-number-range'：取得數值範圍
 -->
<script setup>
import StandardInput from './Input.vue'
import StandardDropdown from './Dropdown.vue'
import { ref, reactive, computed, onBeforeMount, watch } from 'vue'
import { NButton, NSpace, NInputNumber, NSlider } from 'naive-ui'

const emit = defineEmits(['get-search-rules', 'get-number-range'])

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
    numberRanges: {
        default: [{ key: "age", max: 100, min: 0 }]
    },

    searchOptions: {
        default: [
            { key: "name", label: "姓名", type: "String" },
            { key: "age", label: "年齡", type: "Number" },
            { key: "birthday", label: "日期", type: "Date" }
        ]
    }
})

const searchOptions = reactive([])

const searchRules = reactive([])

const numberRange = ref([0, 100])

const numberMax = ref(100)

const numberMin = ref(0)

const searchRange = ref('')

const searchType = computed(() => {
    for (let i = 0; i < props.searchOptions.length; i++) {
        const option = props.searchOptions[i];
        if (option.key === searchRange.value) {
            return option.type
        }
    }
    return 'String'
})

const getKey = (key) => {
    searchRange.value = key
}

const getValue = (value) => {
    if (searchType.value === 'String') {
        searchRules.push({ key: searchRange.value, type: searchType.value, input: value })
    } else if (searchType.value === 'Number') {
        searchRules.push({ key: searchRange.value, type: searchType.value, input: value })
    } else {
        searchRules.push({ key: searchRange.value, type: searchType.value, start: value[0], end: value[1] })
    }
}

const deleteRule = (index) => {
    searchRules.splice(index, 1)
}

const getNumberRange = () => {
    emit('get-number-range', [searchRange.value, numberRange.value[0], numberRange.value[1]])
}

onBeforeMount(() => {
    props.searchOptions.forEach(option => {
        searchOptions.push({ key: option.key, label: option.label })
    })
})

watch(searchRules, () => {
    emit('get-search-rules', searchRules)
})

watch(searchType, () => {
    if (searchType.value === 'Number') {
        props.numberRanges.forEach(range => {
            if (range.key === searchRange.value) {
                numberMax.value = range.max
                numberMin.value = range.min
                numberRange.value[0] = range.min
                numberRange.value[1] = range.max
            }
        })
    }
})
</script>
<template>
    <div style="display: flex; justify-content: left; align-items: center;">
        <StandardDropdown @get-selected-key="getKey" :searchOptions="searchOptions" />
        <StandardInput @get-input-value="getValue" :searchOptions="props.searchOptions" :searchRange="searchRange"
            :searchSize="searchSize" :buttonName="buttonName" :myPlaceholder="myPlaceholder" />
        <template v-if="searchType === 'Number'">
            <n-space @mouseup="getNumberRange" @mouseleave="getNumberRange" vertical>
                <n-slider v-model:value="numberRange" range :max="numberMax" :min="numberMin" :step="1"
                    style="width: 100px;margin-left: 20px;" />
            </n-space>
            <n-input-number @blur="getNumberRange" v-model:value="numberRange[0]" size="small" style="width: 120px;" />
            <n-input-number @blur="getNumberRange" v-model:value="numberRange[1]" size="small" style="width: 120px;" />
        </template>
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