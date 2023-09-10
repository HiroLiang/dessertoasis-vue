
<script setup>
// import NavBar from '@/components/NavBar.vue';
// import ProductMenu from '@/components/ProductMenu.vue';
//import ProductCard from '@/components/ProductCard.vue';
import ProdDisplay from '@/components/Standard/Display.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { getAllProd } from '@/api/index.js';

const products = ref([]);

const getkey = (key) => {
    console.log("key:", key);
}
const row = ref(false);
const block = ref(true);
const categoryId = ref(1);

const fetchProducts = async () => {
    try {
        const response = await getAllProd(page.value);
        products.value = response.data;
        console.log(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

onMounted(() => {
    fetchProducts();
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
        <ProdDisplay :products="products" :searchOptions="searchOptions" :pages="pages" :row="row" :block="block"
            :categoryId="categoryId" @get-selected-key="getkey" @get-search-rules="getsearch" @get-number-range="getrange"
            @get-page="getpage"></ProdDisplay>
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

