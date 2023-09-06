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
    <div class="displayArea">
        <div class="leftSide">
            <div>
                <div class="picContainer">
                    <div class="picWrap">
                        <img :src="`/images/display/${product.picture}`" :alt="product.name">
                    </div>
                </div>
            </div>
            <div class="textArea">
                <h2>{{ product.name }}</h2>
                <span v-if="product.teacher">講師：{{ product.teacher }}</span>
                <span v-if="product.author">作者：{{ product.author }}</span>
                <span class="description">{{ product.description }}</span>
                <span v-if="product.price" class="displayY" style="font-size: 18px;color: rgb(134, 70, 70);">
                    ${{ product.price }}
                </span>
                <span v-if="product.difficulty" class="displayY" style="font-size: 18px;color: rgb(134, 70, 70);">
                    難度:{{ product.difficulty }}
                </span>
            </div>
        </div>
        <div class="priceArea">
            <h3 v-if="product.price" class="displayN">${{ product.price }}</h3>
            <h3 v-if="product.difficulty" class="displayN">難度:{{ product.difficulty }}</h3>
        </div>
    </div>
</template>
<style scoped>
h2 {
    font-size: 24px;
    margin: 0;
    margin-bottom: 5px;
}

h3 {
    color: rgb(134, 70, 70);
    font-size: 18px;
}

@media(max-width: 700px) {
    .description {
        display: none;
    }
}

.textArea span {
    padding: 0;
    margin: 0;
    font-size: 16px;
    overflow: hidden;
    color: rgb(103, 103, 103);
}

.displayArea {
    height: 150px;
    margin: 5px;
    padding: 0 20px 0 20px;
    display: flex;
    overflow: hidden;
    justify-content: space-between;
    border-radius: 8px;
    border: 2px double rgb(249, 233, 220);
    background-color: rgb(251, 241, 233);
}

.displayArea:hover {
    background-color: rgb(244, 236, 225);
}

.leftSide {
    display: flex;
}

.picContainer {
    width: 150px;
    height: 150px;
    display: flex;
    padding-right: 10px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.picWrap {
    max-width: 100%;
    max-height: 100%;
}

.picContainer img {
    width: 100%;
    height: 100%;
}

.textArea {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.textArea>p {
    width: 100%;
    height: 100px;
    overflow: hidden;
}

@media(min-width: 700px) {
    .displayY {
        display: none;
    }
}

@media(max-width:700px) {
    .displayN {
        display: none;
    }
}

.priceArea {
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    justify-content: center;
}
</style>