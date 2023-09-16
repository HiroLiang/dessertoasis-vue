import { ref } from "vue"
import { defineStore } from "pinia"
import {
  reqGetOrderPage,
  reqGetCmsOrderPages,
  reqGetRecipePage,
  reqGetCmsRecipePages,
  reqGetProductPage,
  reqGetCmsProductPages,
  reqGetFrontRecipePages,
  reqGetCoursePage,
  reqGetCmsCoursePages,
  reqGetTeacherPage,
  reqGetCmsTeacherPages,
  reqGetCourseNumberRange,
} from "../api"

export const useSortCondition = defineStore("sortCondition", () => {
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
    numEnd: 0,
    numberLabel: null
  })

  //#region 填入資料方法
  //#region ------------------------訂單--------------------------------*/

  const setSearchRules = async (rules) => {
    condition.value.searchRules = rules
    console.log(rules)
    return await getOrderPagenation()
  }

  const setDateRules = async (rules) => {
    condition.value.dateRules = rules
    console.log(rules)
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
      console.log(range)
      return await getOrderPagenation()
    }
  }

  const setSortBy = async (rule) => {
    condition.value.sortBy = rule[0]
    condition.value.sortWay = rule[1]
    console.log(rule)
    return await getOrderPagenation()
  }

  //更新頁碼
  const setPageChange = async (newPage) => {
    condition.value.page = newPage[0]
    condition.value.pageSize = newPage[1]
    console.log(newPage)
    return await getOrderPagenation()
  }

  //#endregion 
  //#region ------------------------食譜  後台--------------------------------*/
  const setRecipeSearchRules = async (rules) => {
    condition.value.searchRules = rules
    console.log(condition.value)
    return await getRecipePagenation()
  }

  const setRecipeDateRules = async (rules) => {
    condition.value.dateRules = rules
    console.log(condition.value)
    return await getRecipePagenation()
  }

  const setRecipeNumberRange = async (range) => {
    condition.value.numKey = null
    condition.value.numStart = 0
    condition.value.numEnd = 0
    if (range !== null) {
      condition.value.numKey = range[0]
      condition.value.numStart = range[1]
      condition.value.numEnd = range[2]
      console.log(condition.value)
      return await getRecipePagenation()
    }
  }

  const setRecipeSortBy = async (rule) => {
    condition.value.sortBy = rule[0]
    condition.value.sortWay = rule[1]
    console.log(condition.value)
    return await getRecipePagenation()
  }

  //更新後台頁碼
  const setRecipePageChange = async (newPage) => {
    condition.value.page = newPage[0]
    condition.value.pageSize = newPage[1]
    console.log(condition.value)
    return await getRecipePagenation()
  }
  //#endregion 
  //#region ------------------------食譜  前台--------------------------------*/

  const setFrontRecipeSearchRules = async (rules) => {
    condition.value.searchRules = rules
    console.log(condition.value)
    return await getFrontRecipePagenation()
  }

  const setFrontRecipePageChange = async (newPage) => {
    condition.value.page = newPage[0]
    condition.value.pageSize = newPage[1]
    console.log(condition.value)
    return await getFrontRecipePagenation()
  }

  const setFrontRecipeSortBy = async (rule) => {
    condition.value.sortBy = rule[0]
    condition.value.sortWay = rule[1]
    console.log(condition.value)
    return await getFrontRecipePagenation()
  }

  const setFrontRecipeNumberRange = async (range) => {
    condition.value.numKey = null
    condition.value.numStart = 0
    condition.value.numEnd = 0
    if (range !== null) {
      condition.value.numKey = range[0]
      condition.value.numStart = range[1]
      condition.value.numEnd = range[2]
      console.log(condition.value)
      return await getFrontRecipePagenation()
    }
  }
  //#endregion 
  //#region ------------------------商品--------------------------------*/

  const setProductSearchRules = async (rules) => {
    condition.value.searchRules = rules
    console.log(rules)
    return await getProductPagenation()
  }

  const setProductDateRules = async (rules) => {
    condition.value.dateRules = rules
    console.log(rules)
    return await getProductPagenation()
  }

  const setProductNumberRange = async (range) => {
    condition.value.numKey = null
    condition.value.numStart = 0
    condition.value.numEnd = 0
    if (range !== null) {
      condition.value.numKey = range[0]
      condition.value.numStart = range[1]
      condition.value.numEnd = range[2]
      console.log(range)
      return await getProductPagenation()
    }
  }

  const setProductSortBy = async (rule) => {
    condition.value.sortBy = rule[0]
    condition.value.sortWay = rule[1]
    console.log(rule)
    return await getProductPagenation()
  }

  //更新商品頁碼
  const setProductPageChange = async (newPage) => {
    condition.value.page = newPage[0]
    condition.value.pageSize = newPage[1]
    console.log(newPage)
    return await getProductPagenation()
  }
  //#endregion 
  //#region ------------------------課程--------------------------------*/
  //條件搜索
  const setCourseSearchRules = async (rules) => {
    condition.value.searchRules = rules
    console.log(rules)
    return await getCoursePagenation()
  }

  //日期範圍
  const setCourseDateRules = async (rules) => {
    condition.value.dateRules = rules
    console.log(rules)
    return await getCoursePagenation()
  }

  //數字範圍
  const setCourseNumberRange = async (range) => {
    condition.value.numKey = null
    condition.value.numStart = 0
    condition.value.numEnd = 0
    if (range !== null) {
      condition.value.numKey = range[0]
      condition.value.numStart = range[1]
      condition.value.numEnd = range[2]
      console.log(range)
      return await getCoursePagenation()
    }
  }

  //排序
  const setCourseSortBy = async (rule) => {
    condition.value.sortBy = rule[0]
    condition.value.sortWay = rule[1]
    console.log(rule)
    return await getCoursePagenation()
  }

  //更新頁碼
  const setCoursePageChange = async (newPage) => {
    condition.value.page = newPage[0]
    condition.value.pageSize = newPage[1]
    console.log(newPage)
    return await getCoursePagenation()
  }
  //#endregion 
  //#endregion 

  //#region 分頁搜索
  //#region ------------------------老師--------------------------------*/
  const setTeacherSearchRules = async (rules) => {
    condition.value.searchRules = rules
    console.log(rules)
    return await getTeacherPagenation()
  }

  const setTeacherDateRules = async (rules) => {
    condition.value.dateRules = rules
    console.log(rules)
    return await getTeacherPagenation()
  }

  const setTeacherNumberRange = async (range) => {
    condition.value.numKey = null
    condition.value.numStart = 0
    condition.value.numEnd = 0
    if (range !== null) {
      condition.value.numKey = range[0]
      condition.value.numStart = range[1]
      condition.value.numEnd = range[2]
      console.log(range)
      return await getTeacherPagenation()
    }
  }

  const setTeacherSortBy = async (rule) => {
    condition.value.sortBy = rule[0]
    condition.value.sortWay = rule[1]
    console.log(rule)
    return await getTeacherPagenation()
  }

  //更新頁碼
  const setTeacherPageChange = async (newPage) => {
    condition.value.page = newPage[0]
    condition.value.pageSize = newPage[1]
    console.log(newPage)
    return await getTeacherPagenation()
  }
  //#endregion 
  //#region -----------------------訂單--------------------------------*/
  //查詢訂單頁面
  const getOrderPagenation = async () => {
    let result = await reqGetOrderPage(condition.value)
    console.log(result.data)
    return result
  }
  //查詢訂單頁數
  const getOrderPages = async () => {
    return await reqGetCmsOrderPages(condition.value)
  }
  //#endregion 
  //#region ------------------------食譜--------------------------------*/
  const getRecipePagenation = async () => {
    let result = await reqGetRecipePage(condition.value)
    console.log(result.data)
    return result
  }
  //查詢食譜頁數
  const getRecipePages = async () => {
    return await reqGetCmsRecipePages(condition.value)
  }

  const getFrontRecipePagenation = async () => {
    let result = await reqGetFrontRecipePages(condition.value)
    console.log(result.data)
    return result
  }
  //#endregion 
  //#region ------------------------商品--------------------------------*/
  //查詢頁面
  const getProductPagenation = async () => {
    let result = await reqGetProductPage(condition.value)
    console.log(result.data)
    return result
  }
  //查詢頁數
  const getProductPages = async () => {
    return await reqGetCmsProductPages(condition.value)
  }
  //#endregion 
  //#region ------------------------課程--------------------------------*/
  //查詢課程頁面
  const getCoursePagenation = async () => {
    let result = await reqGetCoursePage(condition.value)
    console.log(result.data)
    return result
  }
  //查詢頁數
  const getCoursePages = async () => {
    return await reqGetCmsCoursePages(condition.value)
  }
  //查詢數值範圍
  const getCourseNumberRange = async (label) => {
    condition.value.numberLabel = label
    return await reqGetCourseNumberRange(condition.value)
  }
  //#endregion 
  //#region -----------------------老師---------------------------------*/
  //查詢課程頁面
  const getTeacherPagenation = async () => {
    let result = await reqGetTeacherPage(condition.value)
    console.log(result.data)
    return result
  }
  //查詢頁數
  const getTeacherPages = async () => {
    return await reqGetCmsTeacherPages(condition.value)
  }
  //#endregion 
  //#endregion 

  //回傳
  return {
    //搜索條件
    condition,
    // 條件設置方法
    setPageChange,
    setSearchRules,
    setSortBy,
    setNumberRange,
    setDateRules,
    // 食譜條件設置
    setRecipeSearchRules,
    setRecipeDateRules,
    setRecipeNumberRange,
    setRecipeSortBy,
    setRecipePageChange,
    setFrontRecipePageChange,
    setFrontRecipeSortBy,
    setFrontRecipeNumberRange,
    setFrontRecipeSearchRules,
    //cms order 分頁方法
    getOrderPagenation,
    getOrderPages,
    //cms recipe 分頁方法
    getRecipePagenation,
    getRecipePages,
    getFrontRecipePagenation,
    setRecipeSearchRules,
    setRecipeDateRules,
    setRecipeNumberRange,
    setRecipeSortBy,
    setRecipePageChange,
    // 商品條件設置方法
    setProductPageChange,
    setProductSearchRules,
    setProductSortBy,
    setProductNumberRange,
    setProductDateRules,

    // 課程條件設置
    setCourseSearchRules,
    setCourseDateRules,
    setCourseNumberRange,
    setCourseSortBy,
    setCoursePageChange,
    getCourseNumberRange,
    // 教師條件設置
    setTeacherSearchRules,
    setTeacherDateRules,
    setTeacherNumberRange,
    setTeacherSortBy,
    setTeacherPageChange,
    //cms order 分頁方法
    getOrderPagenation,
    getOrderPages,
    //cms recipe 分頁方法
    getRecipePagenation,
    getRecipePages,
    //cms Product 分頁方法
    getProductPagenation,
    getProductPages,
    //course 分頁方法
    getCoursePagenation,
    getCoursePages,
    //teacher 分頁方法
    getTeacherPagenation,
    getTeacherPages,
  }
})
