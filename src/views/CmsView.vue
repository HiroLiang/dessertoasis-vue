<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import CmsSideBar from '@/components/CmsSideBar.vue'
</script>
<template>
    <NavBar />
    <CmsSideBar />
    <router-view></router-view>
</template>
