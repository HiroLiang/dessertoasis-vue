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
    <div class="container">
        <div class="txtwrap">
            <h2 class="titleTxt">每周熱門食譜</h2>
        </div>
        <div class="container border pr-10 pl-10">
            <Carousel />
        </div>
    </div>
    <hr>
    <div class="container">
        <div class="txtwrap">
            <h2 class="titleTxt">最新食譜</h2>
        </div>
        <div class="container border pr-10 pl-10">
            <Carousel />
        </div>
    </div>
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

.txtwrap {
    max-width: 300px;
    display: block;
    align-items: center;
    text-align: center;
}

.border {
    border: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color) !important;
    padding: 10px 25px px 10px 25px;
    border-radius: 0px 10px 10px 10px;
}

.titleTxt {
    display: block;
    border: 1px solid rgb(218, 215, 215);
    border-radius: 10px 10px 0px 0px;
    border-bottom: none;
    padding: 10px;
    margin-top: 20px;
    margin-bottom: 0px;
}

.searchBarBackground {
    max-width: 100vw;
    overflow: hidden;
    max-height: 100vh;
    margin-bottom: 10px;
    margin-top: 10px;

}

.searchBarBackground img {
    max-width: 100%;
    max-height: 10%;
    height: auto
}
</style>