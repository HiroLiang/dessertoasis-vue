<template>
    <div class="ProductMenu">
        <div>
            <button class="btn custom-btn position-absolute top-25 start-10 mt-2 ms-2" @click="toggleOffcanvas"
                type="button">
                <img
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMiAxNmMxLjY1NiAwIDMgMS4zNDQgMyAzcy0xLjM0NCAzLTMgMy0zLTEuMzQ0LTMtMyAxLjM0NC0zIDMtM3ptMCAxYzEuMTA0IDAgMiAuODk2IDIgMnMtLjg5NiAyLTIgMi0yLS44OTYtMi0yIC44OTYtMiAyLTJ6bTAtOGMxLjY1NiAwIDMgMS4zNDQgMyAzcy0xLjM0NCAzLTMgMy0zLTEuMzQ0LTMtMyAxLjM0NC0zIDMtM3ptMCAxYzEuMTA0IDAgMiAuODk2IDIgMnMtLjg5NiAyLTIgMi0yLS44OTYtMi0yIC44OTYtMiAyLTJ6bTAtOGMxLjY1NiAwIDMgMS4zNDQgMyAzcy0xLjM0NCAzLTMgMy0zLTEuMzQ0LTMtMyAxLjM0NC0zIDMtM3ptMCAxYzEuMTA0IDAgMiAuODk2IDIgMnMtLjg5NiAyLTIgMi0yLS44OTYtMi0yIC44OTYtMiAyLTJ6Ii8+PC9zdmc+">
            </button>
        </div>
        <div class="offcanvas offcanvas-start" :class="{ 'show': isOffcanvasOpen }" tabindex="-1" id="offcanvasScrolling"
            aria-labelledby="offcanvasScrollingLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasScrollingLabel">

                </h5>
                <button type="button" class="btn-close" @click="closeOffcanvas" aria-label="Close"></button>
            </div>
            <div>
                <Breadcrumb></Breadcrumb>
            </div>
            <div>
                <SearchProduct></SearchProduct>
            </div>
            <div class="offcanvas-body">
                <ul>
                    <li>所有商品</li>
                    <li>職人手做甜點&麵包</li>
                    <li>烘焙器具</li>
                    <li>烘焙食材</li>
                    <li>包裝材料</li>
                </ul>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import SearchProduct from '@/components/SearchProduct.vue';


const isOffcanvasOpen = ref(false);

const toggleOffcanvas = () => {
    isOffcanvasOpen.value = !isOffcanvasOpen.value;
};

const closeOffcanvas = () => {
    isOffcanvasOpen.value = false;
};
</script>

<style scoped>
.custom-btn {
    background-color: rgb(251, 244, 244);
    position: relative;
    /* Important for z-index to work */
    z-index: 10;
}

.custom-btn img {
    width: 60px;
    height: 60px;

}

.ProductMenu .btn-close {
    position: relative;
    /* Important for z-index to work */
    z-index: 10;
    /* Adjust this value as needed */
    /* ... Other styles ... */
}
</style>
  