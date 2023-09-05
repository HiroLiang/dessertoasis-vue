<script setup>
import { ref, onBeforeMount, watch, computed } from 'vue'
import { reqGetCategory } from '../../api/index.js'
import ForTree from './ForTree.vue'
import StandardInput from './Input.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/**定義 emit */
const emit = defineEmits(['get-category-id'])

/**定義 props */
const props = defineProps({
    categoryId: {
        type: Number,
        default: 1
    }
})

const options = ref([])

const ajaxOptions = ref([])

const searchValue = ref('')

const checkSearch = (arr, value) => {
    let check = false
    let datas = []
    arr.forEach(ele => {
        if (ele.categoryName.includes(value)) {
            check = true
            datas.push({
                id: ele.id,
                categoryName: ele.categoryName,
                children: checkSearch(ele.children, value),
                show: true
            })
        } else if (checkSearch(ele.children, value).length !== 0) {
            check = true
            datas.push({
                id: ele.id,
                categoryName: ele.categoryName,
                children: checkSearch(ele.children, value),
                show: true
            })
        }
    })
    if (check)
        return datas
    return []
}

/**傳出方法 */
const getCategoryId = (id) => {
    emit('get-category-id', id)
}

const getValue = (value) => {
    searchValue.value = value
}

watch(searchValue, () => {
    if (searchValue.value != '') {
        options.value = checkSearch(ajaxOptions.value.children, searchValue.value)
    } else {
        options.value = ajaxOptions.value.children
    }
})

onBeforeMount(async () => {
    let category = await reqGetCategory(props.categoryId)
    ajaxOptions.value = category.data
    options.value = ajaxOptions.value.children
})

</script>
<template>
    <div class="sidebarContainer">
        <div class="categoryContainer">
            <div class="inputContainer">
                <font-awesome-icon @click="searchValue = ''" :icon="['fas', 'arrows-spin']"
                    style="margin: 0;padding: 0 10px 8px 0;cursor: pointer;" />
                <StandardInput @get-input-value="getValue" style="margin-bottom: 10px;" :searchSize="160" />
            </div>
            <ForTree :categoryOptions="options" @get-category-id="getCategoryId" />
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
    padding: 10px;
    height: 100%;
    width: 270px;
    background-color: rgb(255, 255, 251);
    border-right: 2px double rgb(81, 81, 81);
    border-radius: 10px;
}

.inputContainer {
    display: flex;
    justify-content: center;
    align-items: center;
}

.dotsContainer {
    position: relative;
    display: flex;
    align-items: center;
    top: 35%;
    height: 100px;
    width: 10px;
    background-color: rgb(91, 91, 91);
    border-radius: 0 5px 5px 0;
}
</style>