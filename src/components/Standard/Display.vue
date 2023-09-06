<script setup>
import { ref, watch } from 'vue';
import Search from './Search.vue'
import DisplayRow from './display/RowType.vue'
import DisplayBlock from './display/BlockType.vue'
import { NPagination } from 'naive-ui'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const emit = defineEmits(['get-selected-key', 'get-search-value'])

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
    row: {
        default: true
    },
    block: {
        default: true
    }
})

const page = ref(0)

const pages = ref(10)

const pageSize = ref(10)

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

const sendKey = (id) => {
    emit('get-selected-key', id)
}

</script>
<template>
    <div class="searchbarContainer">
        <div>
            <Search :searchOptions="searchOptions" :searchSize="150" />
        </div>
        <div style="display: flex;">
            <div :class="{ typeIcon: !rowType, typeIconPress: rowType }" @click="rowClass">
                <font-awesome-icon :icon="['fas', 'list']" size="lg" />
            </div>
            <div :class="{ typeIcon: !blockType, typeIconPress: blockType }" @click="blockClass">
                <font-awesome-icon :icon="['fas', 'table-cells']" size="lg" />
            </div>
        </div>
    </div>
    <div v-if="rowType" class="displayContainerRow">
        <div v-for=" product  in  products " @click="sendKey(product.id)" class="itemContainer">
            <DisplayRow :product="product" />
        </div>
        <div style="display: flex; justify-content: center;align-items: center;">
            <n-pagination v-model:page="page" :page-count="pages" v-model:page-size="pageSize" :page-sizes="[10, 20, 50]"
                size="medium" show-size-picker :page-slot="5" />
        </div>
    </div>
    <div v-if="blockType" class="displayContainerBlock">
        <div class="blockContainer">
            <div v-for=" product  in  products " @click="sendKey(product.id)" class="itemContainer">
                <DisplayBlock :product="product" />
            </div>
        </div>
        <div style="display: flex; justify-content: center;align-items: center;">
            <n-pagination v-model:page="page" :page-count="pages" v-model:page-size="pageSize" :page-sizes="[10, 20, 50]"
                size="medium" show-size-picker :page-slot="5" />
        </div>
    </div>
</template>
<style scoped>
.searchbarContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 10px;
    width: 90%;
    border: 3px double rgb(219, 186, 186);
}

.displayContainerRow {
    margin: 0 auto;
    padding: 10px;
    width: 90%;
    border: 3px double rgb(219, 186, 186);
}

.displayContainerBlock {
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
    }
}

@media(max-width: 1369px) {
    @media(min-width: 1100px) {
        .blockContainer {
            width: 960px;
            display: flex;
            justify-content: left;
            flex-wrap: wrap;
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
        }
    }
}
</style>