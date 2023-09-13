<script setup>
import display from '../../components/Standard/Display.vue'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSortCondition } from '../../stores/sortCondition.js'

//使用 pinia 整合搜索條件
const store = useSortCondition()
//使用 router
const router = useRouter()

const products = reactive([
    {
        id: 1,
        picture: 'product/prod.jpg',
        difficulty: 'Super Hard',
        // teacher: '怪醫秦博士',
        author: '鬼塚治虫',
        name: '鐵臂阿童木',
        description: '《原子小金剛》（日語：鉄腕アトム）是一套科幻漫畫作品。',
        // price: 1120
    },
    {
        id: 2,
        picture: 'product/michal-parzuchowski-pMsvOrnIF3Y-unsplash.jpg',
        difficulty: 'Super Hard',
        // teacher: '怪醫秦博士',
        author: '鬼塚治K不二雄',
        name: '鐵舌阿童木',
        description: '《原子小金剛》（日語：鉄腕アトム）是一套科幻漫畫作品。',
        // price: 3240
    },
    {
        id: 3,
        picture: 'product/prod.jpg',
        difficulty: 'Super Hard',
        // teacher: '怪醫秦博士',
        author: '鬼塚治虫',
        name: '鐵指阿童木',
        description: '《原子小金剛》（日語：鉄腕アトム）是一套科幻漫畫作品。',
        // price: 3240
    },
    // {
    //     id: 4,
    //     picture: 'product/michal-parzuchowski-pMsvOrnIF3Y-unsplash.jpg',
    //     difficulty: 'Super Hard',
    //     // teacher: '怪醫秦博士',
    //     author: '鬼塚治貓',
    //     name: '鐵腿阿童木',
    //     description: '《原子小金剛》（日語：鉄腕アトム）是一套科幻漫畫作品。',
    //     // price: 3240
    // },
    // {
    //     id: 5,
    //     picture: 'product/prod.jpg',
    //     // difficulty: 'Super Hard',
    //     teacher: '怪醫秦博士',
    //     // author: '鬼塚治虫',
    //     name: '鐵頭阿童木',
    //     description: '《原子小金剛》（日語：鉄腕アトム）是一套科幻漫畫作品。',
    //     price: 320
    // },
])
// const categoryId = reactive(3)
const pageSize = ref([])
/**定義變數 */
//動態頁數
const pages = ref(1)
//表格陣列
const tableDatas = ref([])
//是否有資料
const hasTable = ref(true)

const searchOptions = ref([
    { key: 'recipeTitle', label: '食譜名稱', type: 'String' },
    { key: 'difficulty', label: '難易度', type: 'String' },
    { key: 'fullName', label: '撰寫者', type: 'String' },
])

//更新表格資料
const updateDatas = (datas) => {
    hasTable.value = true
    if (!datas) {
        hasTable.value = false
        return null
    }
    let array = datas.map(data => ({
        id: data.id,
        picture: data.pictureURL,
        difficulty: data.difficulty,
        author: data.fullName,
        name: data.recipeTitle,
        description: data.recipeIntroduction,
    }))

    console.log('datas');
    console.log(array);
    tableDatas.value = array
    updatePages()
}


//更新總頁數
const updatePages = async () => {
    let num = await store.getRecipePages()
    pages.value = num.data
}

/**傳值送 Pinia 整合搜索條件 */
//換頁
const onGetPage = async (page) => {
    console.log('page');
    console.log(page);
    let result = await store.setFrontRecipePageChange(page)
    if (result != null) {
        let datas = result.data
        updateDatas(datas)
        console.log(result.data);
    }
}

const onGetSelectedKey = (key) => {
    console.log('key');
    console.log(key);
}

const onGetSearchRules = async (rule) => {
    console.log('rule');
    console.log(rule);
    let result = await store.setFrontRecipeSearchRules(rule)
    if (result != null) {
        let datas = result.data
        updateDatas(datas)
        console.log(result.data);
    }
}


const onGetNumberRange = async (range) => {
    console.log('range');
    console.log(range);
    let result = await store.setFrontRecipeNumberRange(range)
    if (result != null) {
        let datas = result.data
        updateDatas(datas)
        console.log(result.data);
    }
}

/** 初始化資料 */
onMounted(async () => {
    let result = await store.setFrontRecipePageChange([1, 10])
    if (result != null) {
        let datas = result.data
        updateDatas(datas)
    }
})

</script>

<template>
    <div>
        <display :searchOptions="searchOptions" :products="tableDatas" :row="true" :block="true" :categoryId="categoryId"
            :pages="pages" @get-selected-key="onGetSelectedKey" @get-search-rules="onGetSearchRules" @get-page="onGetPage"
            @get-number-range="onGetNumberRange"></display>
    </div>
</template>

