<script setup>
import { reactive } from 'vue'
import StandardTable from '../components/Standard/Table.vue'
import NavBar from '@/components/NavBar.vue'
import CmsSideBar from '@/components/CmsSideBar.vue'

const tableDatas = reactive([
    { id: 1, 'Recipe': '菠蘿麵包', 'TimeRequired': 180, 'Difficulty': '中', 'Price': 990 },
    { id: 2, 'Recipe': '烤土司', 'TimeRequired': 60, 'Difficulty': '低', 'Price': 90 },
    { id: 3, 'Recipe': '巧克力蛋糕', 'TimeRequired': 120, 'Difficulty': '中', 'Price': 750 },
    { id: 4, 'Recipe': '水果沙拉', 'TimeRequired': 20, 'Difficulty': '低', 'Price': 180 },
    { id: 5, 'Recipe': '炸雞塊', 'TimeRequired': 45, 'Difficulty': '中', 'Price': 350 },
    { id: 6, 'Recipe': '蔬菜炒飯', 'TimeRequired': 30, 'Difficulty': '低', 'Price': 120 },
    { id: 7, 'Recipe': '牛肉漢堡', 'TimeRequired': 50, 'Difficulty': '中', 'Price': 480 },
    { id: 8, 'Recipe': '番茄湯', 'TimeRequired': 25, 'Difficulty': '低', 'Price': 100 },
    { id: 9, 'Recipe': '披薩', 'TimeRequired': 35, 'Difficulty': '中', 'Price': 600 },
    { id: 10, 'Recipe': '三明治', 'TimeRequired': 15, 'Difficulty': '低', 'Price': 80 },
    { id: 11, 'Recipe': '烤雞腿', 'TimeRequired': 55, 'Difficulty': '中', 'Price': 420 },
    { id: 12, 'Recipe': '魚柳漢堡', 'TimeRequired': 40, 'Difficulty': '中', 'Price': 550 },
    { id: 13, 'Recipe': '涼麵', 'TimeRequired': 30, 'Difficulty': '低', 'Price': 150 },
])

const dataTitles = reactive([
    { label: '食譜', key: 'Recipe' }, { label: '所需時間', key: 'TimeRequired' }, { label: '難易度', key: 'Difficulty' }, { label: '價格', key: 'Price' }
])

</script>
<template>
    <div class="pageContain">
        <div class="sideBarContain">
            <CmsSideBar />
        </div>
        <div class="mainViewContain">
            <NavBar />
            <router-view></router-view>
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
    width: 300px;
    height: 100vh;
    background-color: rgb(235, 235, 235);
}

.mainViewContain {
    width: 100%;
    height: 100%;
}
</style>
