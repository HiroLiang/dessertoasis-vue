<template>
    <div class="search-select">
        <select>
            <option value="">所有商品</option>
            <option value="1">職人手做甜點&麵包</option>
            <option value="2">烘焙器具</option>
            <option value="3">烘焙食材</option>
            <option value="4">包裝材料</option>
        </select>
    </div>
    <div class="search-input">
        <input type="text" placeholder="搜尋">
    </div>
    <div class="search-btn">
        <button><i class="lni lni-search-alt"></i></button>
    </div>
</template>

<script setup lang="ts">
const name = 'SearchProduct';
</script>

<style scoped></style>
