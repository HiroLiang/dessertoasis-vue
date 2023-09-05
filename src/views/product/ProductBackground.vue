<template>
    <h2>我的商品</h2>
    <div class="search-input">
        <!-- <input type="text" placeholder="搜尋"> -->
        <!-- <h3>請選擇分類:</h3>
        <div class="container">
            <div class="row">
                <div class="col-md-6">

                    <select class="form-select" v-model="selectedCategory">
                        <option value="">Select a category</option>
                        <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
                    </select>
                </div>
                <div class="col-md-6" v-if="selectedCategory">

                    <select class="form-select" v-model="selectedProductType">
                        <option value="">Select a product type</option>
                        <option v-for="productType in selectedCategoryProductTypes" :value="productType.id">{{
                            productType.name
                        }}</option>
                    </select>
                </div>
            </div>-->
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
    <div v-if="dataLoaded && tableDatas && tableDatas.length > 0">
        <ProdTable :tableDatas="tableDatas" :dataTitles="dataTitles"></ProdTable>
    </div>
    <!-- <table id="productTable">
        
    <tr>
        <th>圖片</th>
        <th>照片</th>
        <th>名稱</th>
        <th>規格</th>
        <th>價錢</th>
        <th>庫存</th>
        <th>購買次數</th>
        <th>狀態</th>
        <th colspan="4">操作</th>
    </tr>


    </table> -->
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import axios from 'axios';
import ProdTable from '@/components/Standard/Table.vue';
// 从后端获取数据



//const dataTitles = ref(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']); // 数据标题
const tableDatas = ref([]); // 在 setup 函数中声明 tableDatas
onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:8080/product/list');
        tableDatas.value = response.data;
        dataLoaded.value = true;
        console.log(tableDatas.value);
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
});
const dataLoaded = ref(false);
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
            { label: "ID", key: "id", type: "String" },
            { label: "分類ID", key: "categoryId", type: "String" },
            { label: "名稱", key: "prodName", type: "String" },
            // { label: "描述", key: "prodDescription", type: "String" },
            { label: "價錢", key: "prodPrice", type: "String" },
            //{ label: "總銷量", key: "prodPurchase", type: "String" },
            { label: "庫存", key: "prodStock", type: "String" },
            { label: "狀態", key: "productStatus", type: "String" },
            { label: "最後更新日期", key: "updateTime", type: "String" },
            { label: "更新後銷量", key: "saleAfterUpdate", type: "String" },
            { label: "備註", key: "prodRemark", type: "String" },

        ]
    },
    page: {
        default: 1
    },
    pageSize: {
        default: 10
    },
    pages: {
        default: 100
    }
})


</script>


<style scoped></style>