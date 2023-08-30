<template>
    <div class="Cartandlike">


        <button class="btn btn-primary" @click="addToCart">加入購物車</button>


        <button class="btn btn-success" @click="buyNow">直接購買</button>


        <button class="btn btn-outline-secondary" @click="addToFavorites">
            {{ isFavorite ? '取消收藏' : '收藏' }}
        </button>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';

// 商品規格數量
const selectedSpec = ref("大");
const quantity = ref(1);

// 是否已收藏
const isFavorite = ref(false);

// 加入購物車
const addToCart = () => {

};

// 直接購買函数
const buyNow = () => {

};

// 收藏
const addToFavorites = () => {
    isFavorite.value = !isFavorite.value;

};
</script>

<style scoped>
.Cartandlike button {
    margin: 20px;
}
</style>
