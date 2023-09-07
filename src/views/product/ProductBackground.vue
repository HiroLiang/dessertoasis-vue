<template>
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

    //await fetchAndProcessData(page, pageSize, dataTitles.value, key.value);
    if (key.value) {
        await getSearch(key.value, page, pageSize, dataTitles.value);
    } else {
        await fetchAndProcessData(page, pageSize, dataTitles.value);
    }
}

const sortBy = async (dataTitle) => {
    console.log("dataTitle:", dataTitle);
    //await fetchAndProcessData(page.value, pageSize.value, dataTitle, key.value);
    if (key.value) {
        await getSearch(key.value, page.value, pageSize.value, dataTitle);
    } else {
        await fetchAndProcessData(page.value, pageSize.value, dataTitle);
    }
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

const ProcessData2 = async (criteria, jsonHeader, page, pageSize, dataTitle) => {
    try {
        let result = await SearchProd(criteria, jsonHeader, page, pageSize, dataTitle);
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
    //dataLoaded.value = true

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


<style scoped></style>