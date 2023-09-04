<script setup>
import NavBar from '@/components/NavBar.vue'
import { ref, onMounted } from 'vue';
import ReservationCart from './ReservationCart.vue';


</script>

<template>
    <NavBar></NavBar>
    <div class="container">
        <ReservationCart></ReservationCart>
    </div>
</template>

<style scoped></style>