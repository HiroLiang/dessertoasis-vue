<script setup>
import { ref } from 'vue'
import Display from '../components/Standard/Display.vue'
import Navbar from '../components/NavBar.vue'
import StandardSidebar from '../components/Standard/Sidebar.vue'
import StandardFooter from '../components/Footer.vue'


</script>
<template>
    <Navbar />
    <Display @get-selected-key="getKey" />
    <StandardSidebar />
    <StandardFooter />
</template>
<style scoped></style>