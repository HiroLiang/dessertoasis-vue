<script setup>
import Carousel from '@/components/Carousel.vue'
import DropDownSelector from '@/components/DropDownSelector.vue'
import Selector from '@/components/DropDownSelectorTest.vue'
import { reactive, onMounted } from 'vue'
import { reqTop10HotRecipe, reqTop10LatestRecipe, req10CategoryRecipe } from '@/api'

//取前10筆熱門食譜
const top10HottestRecipes = reactive([])
const top10HottestRecipeDatas = async () => {
    const res = await reqTop10HotRecipe()
    const transformedData = res.data.map(recipe => ({
        imageUrl: recipe.pictureURL,
        text: recipe.recipeTitle,
        toUrl: `/recipes/recipe?id=${recipe.id}`
    }))
    top10HottestRecipes.value = transformedData;
    console.log('top10HottestRecipes:');
    console.log(top10HottestRecipes);
}

//取前10筆最新食譜
const top10LatestRecipes = reactive([])
const top10LatestRecipeDatas = async () => {
    const res = await reqTop10LatestRecipe()
    const transformedData = res.data.map(recipe => ({
        imageUrl: recipe.pictureURL,
        text: recipe.recipeTitle,
        toUrl: `/recipes/recipe?id=${recipe.id}`
    }))
    top10LatestRecipes.value = transformedData;
    console.log('top10LatestRecipes:');
    console.log(top10LatestRecipes);
}

//取10筆麵包類別食譜
const get10BreadRecipes = reactive([])
const get10BreadRecipesDatas = async () => {
    const res = await req10CategoryRecipe(8)
    const transformedData = res.data.map(recipe => ({
        imageUrl: recipe.pictureURL,
        text: recipe.recipeTitle,
        toUrl: `/recipes/recipe?id=${recipe.id}`
    }))
    get10BreadRecipes.value = transformedData;
    console.log('get10BreadRecipes:');
    console.log(get10BreadRecipes);
}

//取10筆甜點類別食譜
const get10DessertRecipes = reactive([])
const get10DessertRecipesDatas = async () => {
    const res = await req10CategoryRecipe(9)
    const transformedData = res.data.map(recipe => ({
        imageUrl: recipe.pictureURL,
        text: recipe.recipeTitle,
        toUrl: `/recipes/recipe?id=${recipe.id}`
    }))
    get10DessertRecipes.value = transformedData;
    console.log('get10DessertRecipes:');
    console.log(get10DessertRecipes);
}

//放置要在同個生命週期觸發的函式
const fetchData = async () => {
    await Promise.all([
        top10HottestRecipeDatas(),
        top10LatestRecipeDatas(),
        get10BreadRecipesDatas(),
        get10DessertRecipesDatas()
    ]);
}
onMounted(fetchData)


const link = reactive([
    "/recipes/ToSomerecipe",
    "/recipes/ToSomerecipe",
    "/recipes/ToSomerecipe",
    "/recipes/ToSomerecipe",
])

const carouselTitles = reactive([
    "每月熱門食譜",
    "最新食譜",
    "麵包食譜",
    "甜點食譜"
])

const item = reactive([
    { imageUrl: "https://picsum.photos//500/400?random=1", text: "香草莓果拼盤", toUrl: "/recipes/recipe" },
    { imageUrl: "https://picsum.photos//500/400?random=2", text: "巧克力焦糖布朗尼", toUrl: "/recipes/recipe" },
    { imageUrl: "https://picsum.photos//500/400?random=3", text: "芒果慕斯蛋糕", toUrl: "/recipes/recipe" },
    { imageUrl: "https://picsum.photos//500/400?random=4", text: "藍莓杏仁塔", toUrl: "/recipes/recipe" },
    { imageUrl: "https://picsum.photos//500/400?random=1", text: "香草莓果拼盤1", toUrl: "/recipes/recipe" },
    { imageUrl: "https://picsum.photos//500/400?random=2", text: "巧克力焦糖布朗尼2", toUrl: "/recipes/recipe" },
    { imageUrl: "https://picsum.photos//500/400?random=3", text: "芒果慕斯蛋糕3", toUrl: "/recipes/recipe" },
    { imageUrl: "https://picsum.photos//500/400?random=4", text: "藍莓杏仁塔4", toUrl: "/recipes/recipe" },
])

</script>

<template>
    <h2>this is recipe homepage</h2>
    <div>
        <DropDownSelector></DropDownSelector>
        <hr>
        <Selector></Selector>
        <hr>
        <Carousel :title="'每月熱門食譜'" :link="'/recipes/ToSomerecipe'" :itemsList="top10HottestRecipes.value" />
        <Carousel :title="'最新食譜'" :link="'/recipes/ToSomerecipe'" :itemsList="top10LatestRecipes.value" />
        <Carousel :title="'麵包食譜'" :link="'/recipes/ToSomerecipe'" :itemsList="get10BreadRecipes.value" />
        <Carousel :title="'甜點食譜'" :link="'/recipes/ToSomerecipe'" :itemsList="get10DessertRecipes.value" />


        <Carousel v-for="(title, index) in carouselTitles" :key="index" :title="title" :link="link[index]"
            :itemsList="item" />
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