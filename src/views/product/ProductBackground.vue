<!-- <template>
    <div v-if="tableDatas && tableDatas.length > 0">
        <ProdTable :pageSize="pageSize" :page="page" :pages="pages" :tableDatas="tableDatas" :dataTitles="dataTitles"
            @get-edit-id="getId" @change-page="changePage" @get-sort-rule="sortBy" @get-search-rules="getSearch"
            @get-selected-key="getKey">

        </ProdTable>
    </div>
</template>

<script setup>
// @get-number-range="getNumber" @get-date-rules="getDate"
import { getAllProd, SearchProd } from '@/api/index.js';
import { ref, reactive, computed, onMounted, watch } from 'vue';
//import axios from 'axios';
import ProdTable from '@/components/Standard/Table.vue';
const page = ref(1);
const pageSize = ref(20);
const pages = ref();
//const searchRules = ref({ key: '', type: '', input: '' });
//const input = ref();
const key = ref();
const tableDatas = ref([]);
const getId = (id) => {
    console.log(id);
}

const getPage = (page) => {
    console.log(page);
}
const getKey = (key) => {
    console.log("key:", key);

}
const changePage = async ([page, pageSize]) => {
    getPage(page, pageSize);
    console.log("Page:", page);
    console.log("PageSize:", pageSize);

    await fetchAndProcessData(page, pageSize, dataTitles.value, key.value);
    // if (key.value) {
    //     await getSearch(key.value, page, pageSize, dataTitles.value);
    // } else {
    //     await fetchAndProcessData(page, pageSize, dataTitles.value);
    // }
}

const sortBy = async (dataTitle) => {
    console.log("dataTitle:", dataTitle);
    await fetchAndProcessData(page.value, pageSize.value, dataTitle, key.value);
    // if (key.value) {
    //     await getSearch(key.value, page.value, pageSize.value, dataTitle);
    // } else {
    //     await fetchAndProcessData(page.value, pageSize.value, dataTitle);
    // }
}



const getSearch = async (key, page, pageSize, dataTitle) => {
    const searchObj = {};
    key.forEach((searchRules) => {
        searchObj[searchRules.key] = searchRules.input;
    });

    const criteria = JSON.stringify(searchObj, page, pageSize, dataTitle);

    console.log("criteria:", criteria);

    const jsonHeader = { headers: { "Content-Type": "application/json" } };

    await ProcessData2(criteria, jsonHeader, page, pageSize);
}

const ProcessData2 = async (criteria, jsonHeader) => {
    try {
        let result = await SearchProd(criteria, jsonHeader);
        let dataResponse = result.data;
        console.log(result);
        pages.value = dataResponse.totalPages;

        if (dataResponse && Array.isArray(dataResponse.content)) {
            let datas = dataResponse.content;
            datas.forEach(ele => {
                ele.category = ele.category.categoryName;
                ele.updateTime = new Date(ele.updateTime);
            });
            tableDatas.value = datas;
        } else {
            console.error('Data from API is not in the expected format:', dataResponse);
        }
    } catch (error) {
        console.error('Error fetching and processing data:', error);
    }
}
// const getNumber = (numberRange) => {
//     console.log("numberRange:", numberRange);

// }

// const getDate = (dateRules) => {
//     console.log("dateRules:", dateRules);

// }
// const getSearch = async (key) => {
//     const searchObj = {};
//     key.forEach((searchRules) => {
//         searchObj[searchRules.key] = searchRules.input;
//     });

//     const criteria = JSON.stringify(searchObj);
//     console.log("criteria:", criteria);

//     const jsonHeader = { headers: { "Content-Type": "application/json" } };

//     await ProcessData2(criteria, jsonHeader);
// }

// const changePage = async ([page, pageSize, criteria]) => {
//     getPage(page, pageSize);
//     console.log("Page:", page);
//     console.log("PageSize:", pageSize);
//     console.log("criteria:", criteria);

//     if (criteria && criteria.length > 0) {
//         await ProcessData2(criteria, jsonHeader, page, pageSize, dataTitles.value);
//     } else {
//         await fetchAndProcessData(page, pageSize, dataTitles.value);
//     }
// }

// const sortBy = async (dataTitle, criteria) => {
//     console.log("dataTitle:", dataTitle);
//     console.log("criteria:", criteria);

//     if (criteria && criteria.length > 0) {
//         await ProcessData2(criteria, jsonHeader, page.value, pageSize.value, dataTitle);
//     } else {
//         await fetchAndProcessData(page.value, pageSize.value, dataTitle);
//     }
// }



// const ProcessData2 = async (criteria, jsonHeader, page, pageSize, dataTitle) => {
//     try {
//         let result = await SearchProd(page, pageSize, dataTitle, criteria, jsonHeader);
//         processData(result);
//     } catch (error) {
//         console.error('Error fetching and processing data:', error);
//     }
// }


const fetchAndProcessData = async (page, pageSize, dataTitle) => {
    try {
        let result = await getAllProd(page, pageSize, dataTitle);
        let dataResponse = result.data;
        console.log(result);
        pages.value = dataResponse.totalPages;

        if (dataResponse && Array.isArray(dataResponse.content)) {
            let datas = dataResponse.content;
            datas.forEach(ele => {
                ele.category = ele.category.categoryName;
                ele.updateTime = new Date(ele.updateTime);
            });
            tableDatas.value = datas;
        } else {
            console.error('Data from API is not in the expected format:', dataResponse);
        }
    } catch (error) {
        console.error('Error fetching and processing data:', error);
    }
}


onMounted(async () => {
    let result = await getAllProd(page.value, pageSize.value, dataTitles.value);
    let dataResponse = result.data;
    console.log(result);
    pages.value = dataResponse.totalPages;

    if (dataResponse && Array.isArray(dataResponse.content)) {

        let datas = dataResponse.content;
        datas.forEach(ele => {
            ele.category = ele.category.categoryName;
            ele.updateTime = new Date(ele.updateTime);
        });
        tableDatas.value = datas;
    } else {
        console.error('Data from API is not in the expected format:', dataResponse);
    }


});
//const dataLoaded = ref(false);
const dataTitles = [
    { label: "分類", key: "category", type: "String" },
    { label: "名稱", key: "prodName", type: "String" },
    // { label: "描述", key: "prodDescription", type: "String" },
    { label: "價錢", key: "prodPrice", type: "Number" },
    { label: "總銷量", key: "prodPurchase", type: "Number" },
    { label: "庫存", key: "prodStock", type: "Number" },
    { label: "狀態", key: "productStatus", type: "String" },
    { label: "最後更新日期", key: "updateTime", type: "Date" },
    { label: "更新後銷量", key: "saleAfterUpdate", type: "Number" },
    { label: "備註", key: "prodRemark", type: "String" },]
const props = defineProps({
    /*
    表格資料
    格式：[ { id : id , title1 : text1 ( , xxdatexx : Date ... ) } ]
    */
    tableDatas: {
        default: [


        ]
    },
    /*
    表格標頭
    格式： [{ label : ' 展示名 ', key : ' key ' , type : ' 資料型態 '} , ...] 
    */

    // dataTitles: {
    //     default: [

    //     ]
    // },
    // page: {
    //     default: 1
    // },
    // pageSize: {
    //     default: 20
    // },
    // pages: {
    //     default: 10
    // }
});



</script>


<style scoped></style> -->

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProdTable from '@/components/Standard/Table.vue';
import { useSortCondition } from '../../stores/sortCondition.js'

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
    { label: "分類", key: "categoryName", type: "String" },
    { label: "名稱", key: "prodName", type: "String" },
    // { label: "描述", key: "prodDescription", type: "String" },
    { label: "價錢", key: "prodPrice", type: "Number" },
    { label: "總銷量", key: "prodPurchase", type: "Number" },
    { label: "庫存", key: "prodStock", type: "Number" },
    { label: "狀態", key: "productStatus", type: "String" },
    { label: "最後更新日期", key: "updateTime", type: "Date" },
    { label: "更新後銷量", key: "saleAfterUpdate", type: "Number" },
    { label: "備註", key: "prodRemark", type: "String" },
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
    let num = await store.getProductPages()
    pages.value = num.data
}

/**傳值送 Pinia 整合搜索條件 */
//換頁
const onGetPage = async (newPage) => {
    let result = await store.setProductPageChange(newPage)
    if (result != null) {
        let datas = result.data
        updateDatas(datas)
    }
}
//搜索條件(多筆)
const onGetSearchRules = async (rules) => {
    let result = await store.setProductSearchRules(rules)
    if (result != null) {
        let datas = result.data
        updateDatas(datas)
    }
}
//排序條件(單筆)
const onGetSortRule = async (rule) => {
    let result = await store.setProductSortBy(rule)
    if (result != null) {
        let datas = result.data
        updateDatas(datas)
    }
}
//數值範圍(單筆)
const onGetNumberRange = async (range) => {
    let result = await store.setProductNumberRange(range)
    if (result != null) {
        let datas = result.data
        updateDatas(datas)
    }
}
//日期範圍(多筆)
const onGetDateRules = async (rules) => {
    let result = await store.setProductDateRules(rules)
    if (result != null) {
        let datas = result.data
        updateDatas(datas)
    }
}

//取得修改的 id 並跳轉頁面 (路徑需自己指定)
const onGetEditId = (id) => {
    router.push({ path: '/', query: { id } })
}

/** 初始化資料 */
onMounted(async () => {
    let result = await store.setProductPageChange([1, 10])
    if (result != null) {
        let datas = result.data
        updateDatas(datas)
    }
})
</script>
<template>
    <p v-if="!hasTable">*無權限或查詢失敗</p>
    <ProdTable :page="1" :pageSize="10" :pages="pages" :tableDatas="tableDatas" :dataTitles="dataTitles"
        @get-edit-id="onGetEditId" @get-number-range="onGetNumberRange" @get-sort-rule="onGetSortRule"
        @get-search-rules="onGetSearchRules" @change-page="onGetPage" @get-date-rules="onGetDateRules" />
</template>
