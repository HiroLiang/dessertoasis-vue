<template>
    <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">{{ PageName }}</li>
        </ol>
    </nav>
</template>
<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const PageName = computed(() => route.meta.title || route.name); // 使用 index.js meta.title 或name

</script>
<style scoped>
.breadcrumb {
    position: fixed;
    top: 10px;
    left: 0;
    right: 0;
    bottom: 0;
    margin-left: 15px;
    margin-bottom: 10px;


}
</style>