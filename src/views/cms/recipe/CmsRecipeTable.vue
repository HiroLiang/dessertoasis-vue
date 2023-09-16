<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import StandardTable from '../../../components/Standard/Table.vue'
import { useSortCondition } from '../../../stores/sortCondition.js'

//使用 pinia 整合搜索條件
const store = useSortCondition()
//使用 router
const router = useRouter()

/**定義變數 */
//動態頁數
const pages = ref(1)
//表格陣列
const tableDatas = ref([])
//是否有資料
const hasTable = ref(true)
//設定查詢表格標題
const dataTitles = ref([
    { label: "食譜名稱", key: "recipeTitle", type: "String" },
    { label: "撰寫者", key: "fullName", type: "String" },
    // { label: "分類", key: "recipeCategories", type: "int" },
    { label: "建立日期", key: "recipeCreateDate", type: "Date" },
    { label: "公開狀態", key: "recipeStatus", type: "int" },
    { label: "每月訪問次數", key: "recipeMonthlyVisitCount", type: "String" }
])

/**更新資料方法 */
//更新表格資料
const updateDatas = (datas) => {
    hasTable.value = true
    if (!datas) {
        hasTable.value = false
        return null
    }
    datas.forEach(data => {
        dataTitles.value.forEach(title => {
            if (title.type === 'Date') {
                data[title.key] = new Date(data[title.key])
            }
        })
    })
    tableDatas.value = datas
    updatePages()
}

//更新總頁數
const updatePages = async () => {
    let num = await store.getRecipePages()
    pages.value = num.data
}

/**傳值送 Pinia 整合搜索條件 */
//換頁
const onGetPage = async (newPage) => {
    let result = await store.setRecipePageChange(newPage)
    if (result != null) {
        let datas = result.data
        updateDatas(datas)
    }
}
//搜索條件(多筆)
const onGetSearchRules = async (rules) => {
    let result = await store.setRecipeSearchRules(rules)
    if (result != null) {
        let datas = result.data
        updateDatas(datas)
    }
}
//排序條件(單筆)
const onGetSortRule = async (rule) => {
    let result = await store.setRecipeSortBy(rule)
    if (result != null) {
        let datas = result.data
        updateDatas(datas)
    }
}
//數值範圍(單筆)
const onGetNumberRange = async (range) => {
    let result = await store.setRecipeNumberRange(range)
    if (result != null) {
        let datas = result.data
        updateDatas(datas)
    }
}
//日期範圍(多筆)
const onGetDateRules = async (rules) => {
    let result = await store.setRecipeDateRules(rules)
    if (result != null) {
        let datas = result.data
        updateDatas(datas)
    }
}

//取得修改的 id 並跳轉頁面 (路徑需自己指定)
const onGetEditId = (id) => {
    // router.push({ path: '/', query: { id } })
    console.log(id);
}

/** 初始化資料 */
onMounted(async () => {
    let result = await store.setRecipePageChange([1, 10])
    if (result != null) {
        let datas = result.data
        updateDatas(datas)
    }
})

</script>

<template>
    <p v-if="!hasTable">*無權限或查詢失敗</p>
    <StandardTable :page="1" :pageSize="10" :pages="pages" :tableDatas="tableDatas" :dataTitles="dataTitles"
        @get-edit-id="onGetEditId" @get-number-range="onGetNumberRange" @get-sort-rule="onGetSortRule"
        @get-search-rules="onGetSearchRules" @change-page="onGetPage" @get-date-rules="onGetDateRules"></StandardTable>
</template>