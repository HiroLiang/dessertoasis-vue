<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import CmsSideBar from '@/components/CmsSideBar.vue'
</script>
<template>
    <div class="pageContain">
        <div class="sideBarContain">
            <CmsSideBar />
        </div>
        <div class="mainViewContain">
            <NavBar />
            <router-view></router-view>
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
