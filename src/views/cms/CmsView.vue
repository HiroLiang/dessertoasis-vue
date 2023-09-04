<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import CmsNavbar from './components/CmsNavbar.vue'
import CollapseSidebar from './components/CollapseSidebar.vue'

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
    height: 100vh;
    overflow: scroll;
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
