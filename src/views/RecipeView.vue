<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import Carousel from '@/components/Carousel.vue'
import { reactive } from 'vue'
const navbarlist = reactive([
    { title: '食譜', toUrl: '/recipes' },
    { title: '課程', toUrl: '/' },
    { title: '商品', toUrl: '/' },
    { title: '建立食譜', toUrl: '/' }
])
</script>

<template>
    <NavBar :NavBarList="navbarlist" />
    <div>
        <h1> This is recipe homepage </h1>
    </div>
    <hr>
    <div class="container">
        <Carousel />
    </div>
</template>

<style></style>