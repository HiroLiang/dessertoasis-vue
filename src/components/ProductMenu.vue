<template>
    <div>
        <div>
            <button class="btn custom-btn position-absolute top-25 start-10 mt-2 ms-2" @click="toggleOffcanvas"
                type="button">
                <img
                    src="data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMTIuMDAyIDIuMDA1YzUuNTE4IDAgOS45OTggNC40OCA5Ljk5OCA5Ljk5NyAwIDUuNTE4LTQuNDggOS45OTgtOS45OTggOS45OTgtNS41MTcgMC05Ljk5Ny00LjQ4LTkuOTk3LTkuOTk4IDAtNS41MTcgNC40OC05Ljk5NyA5Ljk5Ny05Ljk5N3ptMCAxLjVjLTQuNjkgMC04LjQ5NyAzLjgwNy04LjQ5NyA4LjQ5N3MzLjgwNyA4LjQ5OCA4LjQ5NyA4LjQ5OCA4LjQ5OC0zLjgwOCA4LjQ5OC04LjQ5OC0zLjgwOC04LjQ5Ny04LjQ5OC04LjQ5N3ptNC45OTggMTEuNzQ1YzAtLjQxNC0uMzM2LS43NS0uNzUtLjc1aC04LjVjLS40MTQgMC0uNzUuMzM2LS43NS43NXMuMzM2Ljc1Ljc1Ljc1aDguNWMuNDE0IDAgLjc1LS4zMzYuNzUtLjc1em0wLTMuMjQ4YzAtLjQxNC0uMzM2LS43NS0uNzUtLjc1aC04LjVjLS40MTQgMC0uNzUuMzM2LS43NS43NXMuMzM2Ljc1Ljc1Ljc1aDguNWMuNDE0IDAgLjc1LS4zMzYuNzUtLjc1em0wLTMuMjUyYzAtLjQxNC0uMzM2LS43NS0uNzUtLjc1aC04LjVjLS40MTQgMC0uNzUuMzM2LS43NS43NXMuMzM2Ljc1Ljc1Ljc1aDguNWMuNDE0IDAgLjc1LS4zMzYuNzUtLjc1eiIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9zdmc+">
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
    /* 设置背景颜色 */

    /* 设置文字颜色 */
    /* 其他样式属性 */
}

.custom-btn img {
    width: 60px;
    height: 60px;
}
</style>
  