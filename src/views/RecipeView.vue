<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import Carousel from '@/components/Carousel.vue'
import { reactive } from 'vue'
const navbarlist = reactive([
    { title: '食譜', toUrl: '/recipes' },
    { title: '課程', toUrl: '/courses' },
    { title: '商品', toUrl: '/product' },
    { title: '建立食譜', toUrl: '/' }
])
</script>

<template>
    <NavBar :NavBarList="navbarlist" />
    <div>
        <h1> This is recipe homepage </h1>
        <hr>
    </div>
    <div class="container">
        <div class="txtwrap">
            <h2 class="titleTxt">每周熱門食譜</h2>
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
    max-width: 250px;
    display: block;
    align-items: center;
    text-align: center;
}

.titleTxt {
    display: block;
    border: 1px solid black;
    border-radius: 10px 10px 0px 0px;
    border-bottom: none;
    padding: 10px;
    margin-top: 50px;
}
</style>