
<script setup>
import NavBar from '@/components/NavBar.vue';
import ProductMenu from '@/components/ProductMenu.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import StandardFooter from '../../components/Footer.vue';

</script>





<template>
    <div class="content-container">
        <NavBar></NavBar>
    </div>
    <div class="Breadcrumb">
        <Breadcrumb></Breadcrumb>
    </div>

    <!-- <div class="ProductMenu">
        <ProductMenu></ProductMenu>
    </div> -->

    <router-view></router-view>
    <div class="StandardFooter">
        <StandardFooter />
    </div>
</template>



<style scoped>
.StandardFooter {
    padding-top: 400px;

}
</style>

