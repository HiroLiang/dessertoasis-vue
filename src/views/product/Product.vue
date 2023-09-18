
<script setup>
import NavBar from '@/components/NavBar.vue';
import ProductMenu from '@/components/ProductMenu.vue';

</script>





<template>
    <div class="content-container">
        <NavBar></NavBar>
    </div>
    <!-- <div class="ProductMenu">
        <ProductMenu></ProductMenu>
    </div> -->
    <router-view></router-view>
</template>



<style scoped></style>

