<script setup>
const props = defineProps({
    product: {
        default: {
            id: 1,
            picture: 'product/prod.jpg',
            // difficulty: 'Super Hard',
            teacher: '怪醫秦博士',
            // author: '鬼塚治虫',
            name: '鐵臂阿童木',
            description: '《原子小金剛》（日語：鉄腕アトム）是一套科幻漫畫作品。',
            price: 3240
        }
    }
})
</script>
<template>
    <div class="cardContainer">
        <div class="picContainer">
            <div class="picWrap">
                <img :src="`${product.picture}`" :alt="product.name">
            </div>
            <p class="description">{{ product.description }}</p>
        </div>
        <h2>{{ product.name }}</h2>
        <span v-if="product.teacher">{{ product.teacher }}</span>
        <span v-if="product.author">{{ product.author }}</span>
        <!-- <p>{{ product.description }}</p>    -->
        <h3 v-if="product.price">${{ product.price }}</h3>
        <h3 v-if="product.difficulty">難易度:{{ product.difficulty }}</h3>
    </div>
</template>
<style scoped>
h2 {
    font-size: 24px;
    margin: 0;
    margin-top: 5px;
}

h3 {
    color: rgb(134, 70, 70);
    font-size: 22px;
}

span {
    font-size: 16px;
    overflow: hidden;
    color: rgb(103, 103, 103);
}

p {
    width: 200px;
    font-size: 16px;
    overflow: hidden;
    color: rgb(103, 103, 103);
}

.cardContainer {
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    border-radius: 20px;
    border: 2px double rgb(254, 229, 208);
    height: 300px;
    width: 220px;
    background-color: rgb(251, 241, 233);
}

.cardContainer:hover {
    background-color: rgb(244, 236, 225);
}

.picContainer {
    margin: 0 auto;
    width: 220px;
    height: 220px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.picWrap {
    width: 100%;
    height: 100%;
    transition: all 0.2s ease-in-out;
}

.picContainer img {
    width: 100%;
    height: 100%;
    -webkit-user-drag: none;
    object-fit: cover;
}

.description {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.7);
    color: rgb(77, 87, 95);
    transform: translateY(200px);
    transition: all 0.4s ease-in-out;
}

.cardContainer:hover .picWrap {
    width: 107%;
    height: 107%;
}

.cardContainer:hover .description {
    transform: translateY(70px);
}
</style>