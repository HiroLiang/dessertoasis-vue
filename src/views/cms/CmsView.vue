<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import StandardTable from '../../components/Standard/Table.vue'
// import NavBar from '@/components/NavBar.vue'
import CmsNavbar from './components/CmsNavbar.vue'
import CollapseSidebar from './components/CollapseSidebar.vue'

// 測試數據
const tableDatas = reactive([
    { id: 1, 'Recipe': '菠蘿麵包', 'TimeRequired': 180, 'Difficulty': '中', 'Price': 990, 'updatedate': new Date('2020/12/12 01:00:00') },
    { id: 2, 'Recipe': '烤土司', 'TimeRequired': 60, 'Difficulty': '低', 'Price': 90, 'updatedate': new Date('2020/01/12 01:00:00') },
    { id: 3, 'Recipe': '巧克力蛋糕', 'TimeRequired': 120, 'Difficulty': '中', 'Price': 750, 'updatedate': new Date('2020/02/12 01:00:00') },
    { id: 4, 'Recipe': '水果沙拉', 'TimeRequired': 20, 'Difficulty': '低', 'Price': 180, 'updatedate': new Date('2020/03/12 01:00:00') },
    { id: 5, 'Recipe': '炸雞塊', 'TimeRequired': 45, 'Difficulty': '中', 'Price': 350, 'updatedate': new Date('2020/10/12 01:00:00') },
    { id: 6, 'Recipe': '蔬菜炒飯', 'TimeRequired': 30, 'Difficulty': '低', 'Price': 120, 'updatedate': new Date('2020/11/12 01:00:00') },
    { id: 7, 'Recipe': '牛肉漢堡', 'TimeRequired': 50, 'Difficulty': '中', 'Price': 480, 'updatedate': new Date('2021/12/12 01:00:00') },
    { id: 8, 'Recipe': '番茄湯', 'TimeRequired': 25, 'Difficulty': '低', 'Price': 100, 'updatedate': new Date('2022/01/12 01:00:00') },
    { id: 9, 'Recipe': '披薩', 'TimeRequired': 35, 'Difficulty': '中', 'Price': 600, 'updatedate': new Date('2021/08/12 01:00:00') },
    { id: 10, 'Recipe': '三明治', 'TimeRequired': 15, 'Difficulty': '低', 'Price': 80, 'updatedate': new Date('2023/01/22 01:00:00') },
    { id: 11, 'Recipe': '烤雞腿', 'TimeRequired': 55, 'Difficulty': '中', 'Price': 420, 'updatedate': new Date('2020/12/12 01:00:00') },
    { id: 12, 'Recipe': '魚柳漢堡', 'TimeRequired': 40, 'Difficulty': '中', 'Price': 550, 'updatedate': new Date('2021/02/10 01:00:00') },
    { id: 13, 'Recipe': '涼麵', 'TimeRequired': 30, 'Difficulty': '低', 'Price': 150, 'updatedate': new Date('2020/12/12 11:00:00') },
])
const dataTitles = reactive([
    { label: '食譜', key: 'Recipe', type: 'String' },
    { label: '所需時間', key: 'TimeRequired', type: 'Number' },
    { label: '難易度', key: 'Difficulty', type: 'String' },
    { label: '價格', key: 'Price', type: 'Number' },
    { label: '上次修改', key: 'updatedate', type: 'Date' }
])

const ifSidebar = ref(true)

const navTitle = ref('管理系統')

const showSidebar = (showOrHide) => {
    ifSidebar.value = showOrHide
}

const getTitle = (title) => {
    navTitle.value = title
    sessionStorage.setItem('cmsTitle', title)
}

onMounted(() => {
    let cmsTitle = sessionStorage.getItem('cmsTitle')
    if (cmsTitle !== null)
        navTitle.value = cmsTitle
})

onBeforeUnmount(() => {
    sessionStorage.removeItem('cmsTitle')
})

</script>
<template>
    <div class="pageContain">
        <transition name="side">
            <div v-show="ifSidebar" class="sideBarContain">
                <CollapseSidebar @selected-title="getTitle" />
            </div>
        </transition>
        <div class="mainViewContain">
            <CmsNavbar @show-sidebar="showSidebar" :navTitle="navTitle" />
            <!-- <NavBar /> -->
            <router-view></router-view>
            <hr>
            <StandardTable :tableDatas="tableDatas" :dataTitles="dataTitles" />
        </div>
    </div>
</template>

<style scoped>
.pageContain {
    width: 100vw;
    display: flex;
}

.sideBarContain {
    width: 250px;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    flex-shrink: 0;
    background-color: rgb(75, 75, 75);
    transition: all 0.5s;
}

.mainViewContain {
    width: 100%;
    height: 100%;
}

.side-enter-active,
.side-leave-active {
    transition: width 0.5s opacity 0.5s, transform 0.5s;
}

.side-enter-from,
.side-leave-to {
    opacity: 0;
    width: 0;
    transform: translateX(-100%);
}
</style>
