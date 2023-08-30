<script setup>
import Carousel from '@/components/Carousel.vue'
import DropDownSelector from '@/components/DropDownSelector.vue'
import Selector from '@/components/DropDownSelectorTest.vue'
import { reactive } from 'vue'


const carouselTitles = reactive([
    "每月熱門食譜",
    "最新食譜",
    "麵包食譜",
    "甜點食譜"
])

const item = reactive([
    { imageUrl: "https://picsum.photos//500/400?random=1", text: "香草莓果拼盤" },
    { imageUrl: "https://picsum.photos//500/400?random=2", text: "巧克力焦糖布朗尼" },
    { imageUrl: "https://picsum.photos//500/400?random=3", text: "芒果慕斯蛋糕" },
    { imageUrl: "https://picsum.photos//500/400?random=4", text: "藍莓杏仁塔" },
    { imageUrl: "https://picsum.photos//500/400?random=1", text: "香草莓果拼盤1" },
    { imageUrl: "https://picsum.photos//500/400?random=2", text: "巧克力焦糖布朗尼2" },
    { imageUrl: "https://picsum.photos//500/400?random=3", text: "芒果慕斯蛋糕3" },
    { imageUrl: "https://picsum.photos//500/400?random=4", text: "藍莓杏仁塔4" },
])

</script>

<template>
    <h2>this is recipe homepage</h2>
    <div>
        <DropDownSelector></DropDownSelector>
        <hr>
        <Selector></Selector>
        <hr>
        <Carousel v-for="(title, index) in carouselTitles" :key="index" :title="title" :itemsList="item" />
    </div>
</template>

<style scoped>
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