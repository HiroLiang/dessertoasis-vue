<!-- 
    使用方法：
        傳入值：
            (1)products：陳列資料
            (2)searchOptions：想要開放的搜索條件
            (3)pages：總頁數
            (4)row：boolean - 是否允許以條列陳列
            (5)block：boolean - 是否允許以卡片陳列  (兩者至少擇一)
            (6)categoryId：分類ID
        傳出值：
            (1)'get-selected-key'：送出選擇的recipe.prod.course選項id
            (2)'get-search-rules'：取得搜尋規則陣列
            (3)'get-page'：取得換頁資訊
            (4)'get-number-range'：取得數值搜尋範圍
 -->
<script setup>
import { ref, watch, onMounted } from 'vue';
import { useFavorList } from '../../stores/favorList.js'
import Search from './Search.vue'
import DisplayRow from './display/RowType.vue'
import DisplayBlock from './display/BlockType.vue'
import { NPagination } from 'naive-ui'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const store = useFavorList()

const emit = defineEmits(['get-selected-key', 'get-search-rules', 'get-page', 'get-number-range'])

const props = defineProps({
    products: {
        default: [
            {
                id: 1,
                picture: 'product/prod.jpg',
                // difficulty: 'Super Hard',
                teacher: '怪醫秦博士',
                // author: '鬼塚治虫',
                name: '鐵臂阿童木',
                description: '《原子小金剛》（日語：鉄腕アトム）是一套科幻漫畫作品。',
                price: 1120
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
                // difficulty: 'Super Hard',
                teacher: '怪醫秦博士',
                // author: '鬼塚治虫',
                name: '鐵指阿童木',
                description: '《原子小金剛》（日語：鉄腕アトム）是一套科幻漫畫作品。',
                price: 3240
            },
            {
                id: 4,
                picture: 'product/michal-parzuchowski-pMsvOrnIF3Y-unsplash.jpg',
                difficulty: 'Super Hard',
                // teacher: '怪醫秦博士',
                author: '鬼塚治貓',
                name: '鐵腿阿童木',
                description: '《原子小金剛》（日語：鉄腕アトム）是一套科幻漫畫作品。',
                // price: 3240
            },
            {
                id: 5,
                picture: 'product/prod.jpg',
                // difficulty: 'Super Hard',
                teacher: '怪醫秦博士',
                // author: '鬼塚治虫',
                name: '鐵頭阿童木',
                description: '《原子小金剛》（日語：鉄腕アトム）是一套科幻漫畫作品。',
                price: 320
            },
        ]
    },
    searchOptions: {
        default: [
            { key: 'teacher', label: '講師', type: 'String' },
            { key: 'price', label: '價格', type: 'Number' },
            { key: 'name', label: '課程名稱', type: 'String' },
        ]
    },
    pages: {
        type: Number,
        default: 13
    },
    row: {
        default: true
    },
    block: {
        default: true
    },
    categoryId: {
        type: Number,
        default: 1
    }
})

const page = ref(0)

const pageSize = ref(10)

const pages = computed(() => props.pages)

//改變顯示方式
const blockType = ref(props.block)
const rowType = ref(props.row)
if (blockType.value && rowType.value) {
    blockType.value = false
}
const rowClass = () => {
    rowType.value = true
    blockType.value = false
}
const blockClass = () => {
    blockType.value = true
    rowType.value = false
}

//送出選擇的選項id
const sendKey = (id) => {
    emit('get-selected-key', id)
}

const getRules = (rules) => {
    emit('get-search-rules', rules)
}

const getRange = (range) => {
    emit('get-number-range', range)
}

const updateList = (id) => {
    store.updateList(props.categoryId, id)
}

//送出換頁條件
watch(page, () => {
    emit('get-page', [page.value, pageSize.value])
})
watch(pageSize, () => {
    page.value = 1
    emit('get-page', [page.value, pageSize.value])
})

//防止超頁
watch(pages, () => {
    page.value = 1
})

onMounted(() => {
    store.initFavorList();
})

</script>
<template>
    <div class="searchbarContainer">
        <div>
            <!-- 搜索列 -->
            <Search :searchOptions="searchOptions" :searchSize="140" @get-number-range="getRange"
                @get-search-rules="getRules" />
        </div>
        <!-- 轉換陳列方式 -->
        <div style="display: flex;">
            <div v-if="props.row" :class="{ typeIcon: !rowType, typeIconPress: rowType }" @click="rowClass">
                <font-awesome-icon :icon="['fas', 'list']" size="lg" />
            </div>
            <div v-if="props.block" :class="{ typeIcon: !blockType, typeIconPress: blockType }" @click="blockClass">
                <font-awesome-icon :icon="['fas', 'table-cells']" size="lg" />
            </div>
        </div>
    </div>
    <!-- 條列式陳列 -->
    <div v-if="rowType" class="displayContainerRow">
        <!-- 陳列區 -->
        <div v-for=" product  in  products " @click="sendKey(product.id)" class="itemContainer">
            <div class="anchor">
                <font-awesome-icon v-if="!store.favoriteList[categoryId - 1].includes(product.id)"
                    @click.stop="updateList(product.id)" :icon="['far', 'heart']" style="color: #b87373;" size="xl" />
                <font-awesome-icon v-if="store.favoriteList[categoryId - 1].includes(product.id)"
                    @click.stop="updateList(product.id)" :icon="['fas', 'heart']" style="color: #d94343;" size="xl" />
            </div>
            <DisplayRow :product="product" />
        </div>
        <!-- 頁碼區 -->
        <div style="display: flex; justify-content: center;align-items: center;">
            <n-pagination v-model:page="page" :page-count="pages" v-model:page-size="pageSize" :page-sizes="[10, 20, 50]"
                size="medium" show-size-picker :page-slot="5" />
        </div>
    </div>
    <!-- 卡片式陳列 -->
    <div v-if="blockType" class="displayContainerBlock">
        <!-- 陳列區 -->
        <div class="blockContainer">
            <div v-for=" product  in  products " :key="product.id" @click="sendKey(product.id)" class="itemContainer">
                <div class="anchor">
                    <font-awesome-icon v-if="!store.favoriteList[categoryId - 1].includes(product.id)"
                        @click.stop="updateList(product.id)" :icon="['far', 'heart']" style="color: #b87373;" size="xl" />
                    <font-awesome-icon v-if="store.favoriteList[categoryId - 1].includes(product.id)"
                        @click.stop="updateList(product.id)" :icon="['fas', 'heart']" style="color: #d94343;" size="xl" />
                </div>
                <DisplayBlock :product="product" />
            </div>
        </div>
        <!-- 頁碼區 -->
        <div style="display: flex; justify-content: center;align-items: center;">
            <n-pagination v-model:page="page" :page-count="pages" v-model:page-size="pageSize" :page-sizes="[10, 20, 50]"
                size="medium" show-size-picker :page-slot="5" />
        </div>
    </div>
</template>
<style scoped>
/* 錨點 + 按鈕 */
.anchor {
    position: relative;
    height: 0;
    width: 0;
    margin: 0;
    padding: 0;
}

.anchor svg {
    z-index: 1;
    position: absolute;
    cursor: pointer;
    transform: translateX(17px) translateY(20px);
}

.searchbarContainer {
    max-width: 1300px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 10px;
    width: 90%;
    border: 3px double rgb(219, 186, 186);
}

.displayContainerRow {
    max-width: 1300px;
    margin: 0 auto;
    padding: 10px;
    width: 90%;
    border: 3px double rgb(219, 186, 186);
}

.displayContainerBlock {
    max-width: 1300px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    width: 90%;
    border: 3px double rgb(219, 186, 186);
}

.itemContainer {
    margin-bottom: 15px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.typeIcon {
    margin: 5px;
    padding: 2px 4px;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 1px 1px 1px #888888;
    background-color: rgb(229, 227, 227);
}

.typeIconPress {
    margin: 5px;
    padding: 2px 4px;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 1px 1px 1px #b9bceb;
    background-color: rgb(115, 129, 143);
}

@media(min-width: 1370px) {
    .blockContainer {
        width: 1200px;
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
        transition: all 0.3s ease;
    }
}

@media(max-width: 1369px) {
    @media(min-width: 1100px) {
        .blockContainer {
            width: 960px;
            display: flex;
            justify-content: left;
            flex-wrap: wrap;
            transition: all 0.3s ease;
        }
    }
}

@media(max-width: 1099px) {
    @media(min-width: 850px) {
        .blockContainer {
            width: 720px;
            display: flex;
            justify-content: left;
            flex-wrap: wrap;
            transition: all 0.3s ease;
        }
    }
}

@media(max-width: 850px) {
    @media(min-width: 570px) {
        .blockContainer {
            width: 480px;
            display: flex;
            justify-content: left;
            flex-wrap: wrap;
            transition: all 0.3s ease;
        }
    }
}
</style>