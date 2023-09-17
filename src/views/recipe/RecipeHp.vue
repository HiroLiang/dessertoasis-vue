<script setup>
import Carousel from '@/components/Carousel.vue'
import DropDownSelector from '@/components/DropDownSelector.vue'
import Selector from '@/components/DropDownSelectorTest.vue'
import { reactive, onMounted, ref, onBeforeMount } from 'vue'
import { reqTop10HotRecipe, reqTop10LatestRecipe, req10CategoryRecipe, reqGetCategory } from '@/api'

//取前10筆熱門食譜
const top10HottestRecipes = reactive([])
const top10HottestRecipeDatas = async () => {
    const res = await reqTop10HotRecipe()
    if (res.data != null && res.data.length != 0) {
        res.data.forEach(recipe => (
            top10HottestRecipes.push({
                imageUrl: recipe.pictureURL,
                text: recipe.recipeTitle,
                toUrl: `/recipes/recipe?id=${recipe.id}`
            }))
        )
    }
    console.log('top10HottestRecipes:');
    console.log(top10HottestRecipes);
}

//取前10筆最新食譜
const top10LatestRecipes = reactive([])
const top10LatestRecipeDatas = async () => {
    const res = await reqTop10LatestRecipe()
    if (res.data != null && res.data.length != 0) {
        res.data.forEach(recipe => (
            top10LatestRecipes.push({
                imageUrl: recipe.pictureURL,
                text: recipe.recipeTitle,
                toUrl: `/recipes/recipe?id=${recipe.id}`
            }))
        )
    }
    console.log('top10LatestRecipes:');
    console.log(top10LatestRecipes);
}

//取10筆麵包類別食譜
const get10BreadRecipes = reactive([])
const get10BreadRecipesDatas = async () => {
    const res = await req10CategoryRecipe(15)
    if (res.data != null && res.data.length != 0) {
        res.data.forEach(recipe => (
            get10BreadRecipes.push({
                imageUrl: recipe.pictureURL,
                text: recipe.recipeTitle,
                toUrl: `/recipes/recipe?id=${recipe.id}`
            }))
        )
    }
    console.log('get10BreadRecipes:');
    console.log(get10BreadRecipes);
}

//取10筆甜點類別食譜
const get10DessertRecipes = reactive([])
const get10DessertRecipesDatas = async () => {
    const res = await req10CategoryRecipe(16)
    if (res.data != null && res.data.length != 0) {
        res.data.forEach(recipe => (
            get10DessertRecipes.push({
                imageUrl: recipe.pictureURL,
                text: recipe.recipeTitle,
                toUrl: `/recipes/recipe?id=${recipe.id}`
            }))
        )
    }
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

// 放置要利用下拉選單顯示的資料
const itemsFromParent = ref([
    {
        url: '#/recipes/ToSomerecipe',
        name: '全部食譜'
    },
    // {
    //     url: '#about',
    //     name: '麵包',
    //     children: [
    //         {
    //             url: '#service1',
    //             name: '吐司'
    //         },
    //         {
    //             url: '#service2',
    //             name: '甜麵包'
    //         },
    //         {
    //             url: '#service3',
    //             name: '鹹麵包'
    //         },
    //         {
    //             url: '#service3',
    //             name: '貝果'
    //         },
    //         {
    //             url: '#service3',
    //             name: '披薩'
    //         }
    //     ]
    // },
    // {
    //     url: '#service',
    //     name: '甜點',
    //     children: [
    //         {
    //             url: '#service1',
    //             name: '蛋糕'
    //         },
    //         {
    //             url: '#service2',
    //             name: '餅乾'
    //         },
    //         {
    //             url: '#service3',
    //             name: '塔派類'
    //         },
    //         {
    //             url: '#service3',
    //             name: '免烤箱'
    //         },
    //         {
    //             url: '#service3',
    //             name: '布丁'
    //         },
    //         {
    //             url: '#service3',
    //             name: '冰淇淋'
    //         },
    //         {
    //             url: '#service3',
    //             name: '泡芙'
    //         },
    //     ]
    // },
    // {
    //     url: '#service',
    //     name: '食材',
    //     children: [
    //         {
    //             url: '#service1',
    //             name: '檸檬'
    //         },
    //         {
    //             url: '#service2',
    //             name: '肉桂'
    //         },
    //         {
    //             url: '#service3',
    //             name: '巧克力'
    //         },
    //     ]
    // },
    // {
    //     url: '#contact',
    //     name: '難易度',
    //     children: [
    //         {
    //             url: '#service1',
    //             name: '簡單'
    //         },
    //         {
    //             url: '#service1',
    //             name: '中等'
    //         },
    //         {
    //             url: '#service1',
    //             name: '困難'
    //         },
    //     ]

    // }

]);

const link = reactive([
    "/recipes/ToSomerecipe",
    "/recipes/ToSomerecipe",
    "/recipes/ToSomerecipe",
    "/recipes/ToSomerecipe",
])

const carouselTitles = reactive([
    // "每月熱門食譜",
    // "最新食譜",
    // "麵包食譜",
    // "甜點食譜"
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

const ajaxOptions = ref([
    // categoryName: "食譜"
    // children: 
    // 0: {id: 15, categoryName: '麵包', parentId: 3, parent: {…}, children: Array(5), …}
    // 1: {id: 16, categoryName: '甜點', parentId: 3, parent: {…}, children: Array(7), …}
    // 2: {id: 17, categoryName: '食材', parentId: 3, parent: {…}, children: Array(10), …}
    // 3:{id: 18, categoryName: '難易度', parentId: 3, parent: {…}, children: Array(3), …}
])

onBeforeMount(async () => {
    let category = await reqGetCategory(3)
    ajaxOptions.value = category.data

    //處理食譜分類
    ajaxOptions.value.children.forEach(item => {
        itemsFromParent.value.push({
            url: `#/recipes/ToSomerecipe?categoryid=${item.id}`,
            name: item.categoryName,
            children: item.children.map(child => ({
                url: `#/recipes/ToSomerecipe?categoryid=${child.id}`,
                name: child.categoryName
            }))
        })
    })

})

</script>

<template>
    <Selector :items="itemsFromParent"></Selector>
    <hr>
    <Carousel :title="'每月熱門食譜'" :link="'/recipes/ToSomerecipe'" :itemsList="top10HottestRecipes" />
    <Carousel :title="'最新食譜'" :link="'/recipes/ToSomerecipe'" :itemsList="top10LatestRecipes" />
    <Carousel :title="'麵包食譜'" :link="'/recipes/ToSomerecipe'" :itemsList="get10BreadRecipes" />
    <Carousel :title="'甜點食譜'" :link="'/recipes/ToSomerecipe'" :itemsList="get10DessertRecipes" />


    <Carousel v-for="(title, index) in carouselTitles" :key="index" :title="title" :link="link[index]" :itemsList="item" />

    <!-- <Carousel :title="'每月熱門食譜'" :link="'/recipes/ToSomerecipe'" :itemsList="top10HottestRecipes.value" /> -->
</template>

<style scoped></style>