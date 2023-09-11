import { ref } from "vue"
import { defineStore } from "pinia"
import { reqGetOrderPage, reqGetCmsOrderPages } from "../api"

export const useSortCondition = defineStore('sortCondition', () => {
    //定義state
    const condition = ref({
        sortWay: null,
        sortBy: null,
        page: 1,
        pageSize: 10,
        dateRules: [],
        searchRules: [],
        numKey: null,
        numStart: 0,
        numEnd: 0
    })
    //填入搜尋資料
    const setSearchRules = async (rules) => {
        condition.value.searchRules = rules
        console.log(rules);
        return await getOrderPagenation()
    }

    const setDateRules = async (rules) => {
        condition.value.dateRules = rules
        console.log(rules);
        return await getOrderPagenation()
    }

    const setNumberRange = async (range) => {
        condition.value.numKey = null
        condition.value.numStart = 0
        condition.value.numEnd = 0
        if (range !== null) {
            condition.value.numKey = range[0]
            condition.value.numStart = range[1]
            condition.value.numEnd = range[2]
            console.log(range);
            return await getOrderPagenation()
        }
    }

    const setSortBy = async (rule) => {
        condition.value.sortBy = rule[0]
        condition.value.sortWay = rule[1]
        console.log(rule);
        return await getOrderPagenation()
    }

    //更新頁碼
    const setPageChange = async (newPage) => {
        condition.value.page = newPage[0]
        condition.value.pageSize = newPage[1]
        console.log(newPage)
        return await getOrderPagenation()
    }

    //分頁搜索
    //查詢訂單頁面
    const getOrderPagenation = async () => {
        let result = await reqGetOrderPage(condition.value)
        console.log(result.data);
        return result
    }
    //查詢訂單頁數
    const getOrderPages = async () => {
        return await reqGetCmsOrderPages(condition.value)
    }

    return {
        //搜索條件
        condition,
        // 條件設置方法
        setPageChange, setSearchRules, setSortBy, setNumberRange, setDateRules,
        //cms order 分頁方法
        getOrderPagenation, getOrderPages,
    }
})
