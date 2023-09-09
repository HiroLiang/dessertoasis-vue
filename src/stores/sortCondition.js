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
    //填入資料方法
    const setSearchRules = (rules) => {
        console.log(rules);
        condition.value.searchRules = rules
        const result = getOrderPagenation()
        return result
    }

    const setDateRules = (rules) => {
        console.log(rules);
        condition.value.dateRules = rules
        return getOrderPagenation()
    }

    const setNumberRange = (range) => {
        console.log(range);
        condition.value.numKey = null
        condition.value.numStart = 0
        condition.value.numEnd = 0
        if (range !== null) {
            condition.value.numKey = range[0]
            condition.value.numStart = range[1]
            condition.value.numEnd = range[2]
            return getOrderPagenation()
        }
    }

    const setSortBy = (rule) => {
        console.log(rule);
        condition.value.sortBy = rule[0]
        condition.value.sortWay = rule[1]
        return getOrderPagenation()
    }

    //更新頁碼
    const setPageChange = (newPage) => {
        console.log(newPage)
        condition.value.page = newPage[0]
        condition.value.pageSize = newPage[1]
        return getOrderPagenation()
    }

    //分頁搜索
    //查詢訂單頁面
    const getOrderPagenation = async () => {
        let result = await reqGetOrderPage(condition.value)
        console.log(result.data);
        return result
    }
    //查詢訂單頁數
    const getOrderPages = () => {
        return reqGetCmsOrderPages(condition.value)
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
