<template>
    <div class="search-input">
        <!-- <input type="text" placeholder="搜尋"> -->

    </div>
    <!-- 庫存量
        <input type="number" name="" />~<input type="number" name="" />
    </div>
    <div>
        銷量
        <input type="number" name="" />~<input type="number" name="" />
    </div>
    <div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
                上架中
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
                已下架
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
                已售完
            </label>
        </div>
    </div>

    <div class="search-btn">
        <button class="search-button" type="submit">搜尋</button>
       
    </div>
    <div class="btn">
        <button class="" type="button" @click="">重設</button>
        
    </div> -->
    <div v-if="tableDatas && tableDatas.length > 0">
        <ProdTable :pageSize="pageSize" :page="page" :pages="pages" @get-edit-id="getId" @change-page="changePage"
            @get-sort-rule="sortBy" :tableDatas="tableDatas" :dataTitles="dataTitles">
        </ProdTable>
    </div>
</template>

<script setup>
import { getAllProd } from '@/api/index.js'
import { ref, reactive, computed, onMounted } from 'vue';
import axios from 'axios';
import ProdTable from '@/components/Standard/Table.vue';

const getId = (id) => {
    console.log(id);
}

const getPage = (page) => {
    console.log(page);
}

const changePage = async ([page, pageSize]) => {
    getPage(page, pageSize);
    console.log("Page:", page);
    console.log("PageSize:", pageSize);


    let result = await getAllProd(page, pageSize)
    let dataResponse = result.data;
    console.log(result);
    pages.value = dataResponse.totalPages;

    if (dataResponse && Array.isArray(dataResponse.content)) {
        // 如果 content 是陣列，則處理數據
        let datas = dataResponse.content;
        datas.forEach(ele => {
            ele.category = ele.category.categoryName;
        });
        tableDatas.value = datas;
    } else {
        console.error('Data from API is not in the expected format:', dataResponse);
    }
}



const sortBy = (rule) => {
}

const page = ref(1);
const pageSize = ref(20);
const pages = ref(20);

const tableDatas = ref([]);
onMounted(async () => {
    let result = await getAllProd(page.value, pageSize.value)
    let dataResponse = result.data;
    console.log(result);
    pages.value = dataResponse.totalPages;

    if (dataResponse && Array.isArray(dataResponse.content)) {
        // 如果 content 是陣列，則處理數據
        let datas = dataResponse.content;
        datas.forEach(ele => {
            ele.category = ele.category.categoryName;
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
    { label: "價錢", key: "prodPrice", type: "String" },
    { label: "總銷量", key: "prodPurchase", type: "String" },
    { label: "庫存", key: "prodStock", type: "String" },
    { label: "狀態", key: "productStatus", type: "String" },
    { label: "最後更新日期", key: "updateTime", type: "String" },
    { label: "更新後銷量", key: "saleAfterUpdate", type: "String" },
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

    dataTitles: {
        default: [

        ]
    },
    page: {
        default: 1
    },
    pageSize: {
        default: 20
    },
    // pages: {
    //     default: 10
    // }
});



</script>


<style scoped></style>