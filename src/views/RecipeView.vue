<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import Carousel from '@/components/Carousel.vue'
import DropDownSelector from '@/components/DropDownSelector.vue'
import { reactive } from 'vue'
const navbarlist = reactive([
    { title: '食譜', toUrl: '/recipes' },
    { title: '課程', toUrl: '/courses' },
    { title: '商品', toUrl: '/product' },
    { title: '建立食譜', toUrl: '/' }
])
</script>

<template>
    <div>
        <NavBar :NavBarList="navbarlist" />
    </div>
    <div class="searchBarBackground">
        <img src="../assets/images/recipeHP/tabitha-turner-Ns2aJ5OXKds-unsplash.jpg" alt="">
        <hr>
    </div>
    <DropDownSelector></DropDownSelector>
    <Carousel />
    <hr>
    <Carousel />
</template>

<style>
/*調整食譜縮圖列外框線位置*/
.recipeListContainer {
    margin: 0;
    padding-left: 60px;
    padding-right: 60px;
    display: block;
    align-items: center;
    flex-wrap: wrap;
}

.searchBarBackground {
    max-width: 100vw;
    overflow: hidden;
    max-height: 70vh;
    margin-bottom: 10px;
    margin-top: 10px;

}

.searchBarBackground img {
    max-width: 100%;
    max-height: 10%;
    height: auto
}
</style>