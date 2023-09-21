
<template>
    <div class="content-container">
        <NavBar></NavBar>
    </div>
    <div class="ProductMenu">
        <ProductMenu></ProductMenu>
    </div>
    <!-- <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active headerpic" data-bs-interval="10000">
                <img src="../../assets/images/headerShow/toa-heftiba-1o_FCxY-VH8-unsplash.jpg" class="d-block w-100"
                    alt="#">
            </div>
            <div class="carousel-item headerpic" data-bs-interval="2000">
                <img src="../../assets/images/headerShow/michal-parzuchowski-pMsvOrnIF3Y-unsplash.jpg" class="d-block w-100"
                    alt="#">
            </div>
            <div class="carousel-item headerpic" data-bs-interval="2000">
                <img src="../../assets/images/headerShow/nick-karvounis-jN_M0McVNeI-unsplash.jpg" class="d-block w-100"
                    alt="#">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div> -->

    <div class="text">
        <!-- <h2>熱門商品</h2> -->
    </div>
    <div class="ProdDisplay">
        <div>
            <ProdDisplay :searchOptions="searchOptions" :products="tableDatas" :row="false" :block="true"
                :categoryId="categoryId" :pages="pages" @get-selected-key="onGetSelectedKey"
                @get-search-rules="onGetSearchRules" @get-page="onGetPage" @get-number-range="onGetNumberRange">
            </ProdDisplay>
        </div>
    </div>
    <StandardSidebar :categoryId="1" @get-category-id="onGetCategoryId" />
    <!-- <StandardFooter /> -->
    <!-- <button @click="getImg(1)">測試</button> <img :src="img" alt=""> -->
</template>
<script setup>
import ProdDisplay from '@/components/Standard/Display.vue';
import { ref, reactive, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import { getAllProd, getProd, getProd1, getProductImage } from '@/api/index.js';
import { useRouter } from 'vue-router'
import { useSortCondition } from '../../stores/sortCondition.js'
import StandardSidebar from '../../components/Standard/Sidebar.vue';
import StandardFooter from '../../components/Footer.vue';
import HeaderShow from '@/components/HeaderShow.vue';
//使用 pinia 整合搜索條件
const store = useSortCondition()
//使用 router
const router = useRouter()
const product = ref();
const products = reactive([]);
const searchOptions = ref([
    { key: 'prodPrice', label: '價格', type: 'Number' },
    { key: 'prodName', label: '商品名稱', type: 'String' },
]);
const categoryId = ref(1);
const pageSize = ref([]);
//const pageSize = ref(10);
const page = ref(1);

/**定義變數 */
//動態頁數
const pages = ref(1)
//表格陣列
const tableDatas = ref([])
//是否有資料
const hasTable = ref(true)

//傳值搜索條件
const emitSearch = ref([])

//分類搜索
const catSearch = ref([])

//整合搜索條件
const searchRules = computed(() => {
    return emitSearch.value.concat(catSearch.value)
})
/**更新資料方法 */
//更新表格資料
// const updateDatas = (datas) => {
//     console.log('datas', datas)
//     hasTable.value = true
//     if (!datas) {
//         hasTable.value = false
//         return null
//     }

//     let array = datas.map(data => ({
//         id: data.id,
//         picture: datas.pictureURL,
//         name: data.prodName,
//         price: data.prodPrice,
//     }))

//     console.log('datas');
//     console.log(array);
//     tableDatas.value = array
//     updatePages()
// }
const updateDatas = async (datas) => {
    console.log('datas', datas)
    hasTable.value = true
    if (!datas) {
        hasTable.value = false
        return null
    }

    let array = datas.map(data => {
        if (data.pictureURL) {
            const pictureURLs = data.pictureURL.split(', '); // 将字符串拆分成数组
            const picture = pictureURLs[0]; // 选择第一个图片路径
            return {
                id: data.id,
                picture: picture,
                name: data.prodName,
                price: data.prodPrice,
            };
        } else {
            return {
                id: data.id,
                picture: '',
                name: data.prodName,
                price: data.prodPrice,
            };
        }
    });

    console.log('datas');
    console.log(array);
    tableDatas.value = array
    updatePages()
}





// const img = ref(null)
// const getImg = async (key) => {
//     let res = await getProductImage(key)
//     const body = res.data
//     const header = res.headers['content-type']

//     console.log(body);
//     console.log(header);

//     img.value = `data:${body[0]};base64,${body[1]}`

// }
const img = ref(null)
const getImg = async (data) => {
    let res = await getProductImage(data.id)
    const body = res.data
    const header = res.headers['content-type']
    return `data:${body[0]};base64,${body[1]}` // Return the image data
}

//更新總頁數
const updatePages = async () => {
    let num = await store.getProductPages()
    pages.value = num.data
}

/**傳值送 Pinia 整合搜索條件 */
//換頁
const onGetPage = async (page) => {
    console.log('page');
    console.log(page);
    let result = await store.setProductPageChange(page)
    if (result != null) {
        let datas = result.data
        updateDatas(datas)
        console.log(result.data);
    }
}

const onGetSelectedKey = (id) => {
    console.log('id:', id);

    router.push(`/productdetail/${id}`);
}
//搜索條件(多筆)
// const onGetSearchRules = async (rule) => {
//     console.log('rule');
//     console.log(rule);
//     let result = await store.setProductSearchRules(rule)
//     if (result != null) {
//         let datas = result.data
//         updateDatas(datas)
//         console.log(result.data);
//     }
// }

const onGetSearchRules = async rule => {
    emitSearch.value = rule
}

//搜索分類
const onGetCategoryId = id => {
    if (id === null) {
        catSearch.value = []
    } else {
        catSearch.value = [{ key: 'categoryId', type: 'Number', input: id }]
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
    console.log('range');
    console.log(range);
    let result = await store.setProductNumberRange(range)
    if (result != null) {
        let datas = result.data
        updateDatas(datas)
        console.log(result.data);
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
watch(searchRules, async () => {
    let result = await store.setProductSearchRules(searchRules.value)
    if (result != null) {
        let datas = result.data
        updateDatas(datas)
    }
}, { immediate: true })

/** 初始化資料 */
// onMounted(async () => {
//     let result = await store.setProductPageChange([1, 10])
//     if (result != null) {
//         let datas = result.data
//         products.value = datas.map(item => ({
//             id: item.id,
//             picture: item.pictures,
//             name: item.prodName,
//             price: item.prodPrice,
//         }));
//         updateDatas(datas)
//     }
// })
onMounted(async () => {
    let result = await store.setProductPageChange([1, 10])
    if (result != null) {
        let datas = result.data
        updateDatas(datas)
    }
})


</script>


<style scoped>
.headerpic {
    opacity: 0.8;
    /* background-size: cover; */
    background-position: center;
    height: 480px;
    width: 100%;
    position: relative;
    z-index: -1;
}

.text {
    text-align: center;

}
</style>

