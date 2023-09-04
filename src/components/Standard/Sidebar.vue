<script setup>
import ForTree from './ForTree.vue'
import StandardInput from './Input.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/**定義 emit */
const emit = defineEmits(['get-category-id'])

const props = defineProps({
    categoryOptions: {
        default: [{
            id: 1,
            categoryName: '商品',
            children: [{
                id: 2,
                categoryName: '點心',
                children: [{
                    id: 3,
                    categoryName: '蛋糕',
                }, {
                    id: 4,
                    categoryName: '麵包',
                }]
            }, {
                id: 5,
                categoryName: '工具',
                children: [{
                    id: 6,
                    categoryName: '火箭筒',
                }, {
                    id: 7,
                    categoryName: '步槍',
                }, {
                    id: 8,
                    categoryName: '炸藥',
                }]
            }]
        }]
    },
})

/**傳出方法 */
const getCategoryId = (id) => {
    emit('get-category-id', id)
}

</script>
<template>
    <div class="sidebarContainer">
        <div class="categoryContainer">
            <StandardInput style="margin-bottom: 20px;" searchSize="180" />
            <ForTree :categoryOptions="categoryOptions" @get-category-id="getCategoryId" />
        </div>
        <div class="dotsContainer">
            <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" />
        </div>
    </div>
</template>
<style scoped>
.sidebarContainer {
    display: flex;
    position: absolute;
    padding: 10px;
    left: 0;
    top: 0;
    height: 100%;
    width: 280px;
    transform: translateX(-270px);
    transition: all 0.3s ease-in-out;
}

.sidebarContainer:hover {
    transform: translateX(0px);
}

.categoryContainer {
    height: 100%;
    width: 270px;
    background-color: rgb(255, 255, 251);
    border-right: 2px double rgb(81, 81, 81);

}

.dotsContainer {
    position: relative;
    display: flex;
    align-items: center;
    top: 35%;
    height: 100px;
    width: 10px;
    background-color: rgb(255, 255, 251);
}
</style>