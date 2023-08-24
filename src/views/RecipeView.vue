<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import Carousel from '@/components/Carousel.vue'
import DropDownSelector from '@/components/DropDownSelector.vue'
// import Selector from '@/components/DropDownSelectorTest.vue'
import { reactive } from 'vue'
const navbarlist = reactive([
    { title: '食譜', toUrl: '/recipes' },
    { title: '課程', toUrl: '/courses' },
    { title: '商品', toUrl: '/product' },
    { title: '建立食譜', toUrl: '/recipes/createrecipe' }
])

const carouselTitle = reactive([
    "每月熱門食譜",
    "最新食譜"
])

const item = reactive([
    { imageUrl: "https://picsum.photos//500/400?random=1", text: "香草莓果拼盤" },
    { imageUrl: "https://picsum.photos//500/400?random=2", text: "巧克力焦糖布朗尼" },
    { imageUrl: "https://picsum.photos//500/400?random=3", text: "芒果慕斯蛋糕" },
    { imageUrl: "https://picsum.photos//500/400?random=4", text: "藍莓杏仁塔" },
])


</script>

<template>
    <NavBar :NavBarList="navbarlist" />

    <div class="searchBarBackground">
        <img src="../assets/images/recipeHP/tabitha-turner-Ns2aJ5OXKds-unsplash.jpg" alt="">
        <hr>
    </div>
    <DropDownSelector></DropDownSelector>
    <hr>
    <!-- <Selector></Selector> -->
    <Carousel :title="carouselTitle[0]" :itemsList="item" />
    <hr>
    <Carousel :title="carouselTitle[1]" :itemsList="item" />
    <hr>
    <router-view></router-view>
</template>

<style scoped>
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