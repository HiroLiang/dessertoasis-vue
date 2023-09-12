
<script setup>
// import NavBar from '@/components/NavBar.vue';
// import ProductMenu from '@/components/ProductMenu.vue';
//import ProductCard from '@/components/ProductCard.vue';
import ProdDisplay from '@/components/Standard/Display.vue';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { getAllProd, getProd, getProd1 } from '@/api/index.js';
const product = ref();
const products = ref([]);
const searchOptions = ref([
    { key: 'prodPrice', label: '價格', type: 'Number' },
    { key: 'prodName', label: '商品名稱', type: 'String' },
]);
const row = ref(false);
const block = ref(true);
const categoryId = ref(1);
const pageSize = ref(10);
const pages = ref();
const page = ref(1);
const rule = ref();
const queryString = ref('');
const getkey = (key) => {
    console.log("key:", key);
}

// const getpage = (page) => {
//     console.log("page:", page.value);
//     console.log("pageSize:", pageSize.value);
// }
// const getpage = async (page, pageSize) => {
//     console.log("Page:", page);
//     console.log("PageSize:", pageSize);

//     await fetchProducts(page, pageSize);

// }

// const getsearch = async (rules, page, pageSize) => {

//     const queryString = rules.map(rule => `${rule.key}=${rule.input}`).join('&');

//     console.log("queryString:", queryString);


//     await fetchProducts(page, pageSize, queryString);
// }
const fetchProducts = async () => {
    try {
        const result = await getProd(page.value, pageSize.value, queryString.value);
        const dataResponse = result.data;

        if (dataResponse && Array.isArray(dataResponse.content)) {
            const datas = dataResponse.content;
            datas.forEach(ele => {
                ele.category = ele.category.categoryName;
                ele.updateTime = new Date(ele.updateTime);
            });

            products.value = datas.map(item => ({
                id: item.id,
                picture: item.pictures,
                name: item.prodName,
                price: item.prodPrice,
            }));
            pages.value = dataResponse.totalPages;
        } else {
            console.error('Data from API is not in the expected format:', dataResponse);
        }
    } catch (error) {
        console.error('Error fetching and processing data:', error);
    }
};

const getsearch = async (rules) => {
    // const queryParams = searchOptions.value
    //     .filter(rule => rule.input !== null)
    //     .map(rule => `${rule.key}=${rule.input}`)
    //     .join('&');
    let queryParams = rules.map(rule => `${rule.key}=${rule.input}`).join('&');
    queryString.value = queryParams;
    page.value = 1;
    console.log("page:", page.value);
    console.log(" queryString:", queryString);
    fetchProducts(queryString);
};

const getpage = async (page, pageSize) => {
    console.log("Page:", page);
    console.log("PageSize:", pageSize);

    await fetchProducts(page, pageSize);
};

onMounted(async () => {
    const initialQueryString = searchOptions.value.map(rule => `${rule.key}=`).join('&');
    queryString.value = initialQueryString;
    await fetchProducts();
    getpage(page.value, pageSize.value);
});

</script>







<template>
    <!-- <div class="content-container">
        <NavBar></NavBar>
    </div>
    <div class="ProductMenu">
        <ProductMenu></ProductMenu>
    </div> -->
    <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
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
    </div>

    <div class="text">
        <h2>熱門商品</h2>
    </div>
    <div class="ProdDisplay">
        <ProdDisplay :products="products" :searchOptions="searchOptions" :page="page" :pages="pages" :row="row"
            :block="block" :categoryId="categoryId" :pageSize="pageSize" :rules="rules" @get-selected-key="getkey"
            @get-search-rules="getsearch" @get-number-range="getrange" @get-page="getpage"></ProdDisplay>
    </div>
</template>



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

