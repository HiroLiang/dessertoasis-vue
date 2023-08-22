
<template>
    <div class="container mt-3">
        <Carousel :items-to-show="itemToShow" :wrap-around="wrapAround" :autoplay="autoplay"
            :pauseAutoplayOnHover="pauseAutoplayOnHover">
            <Slide v-for="(item, index) in items.imageUrlList" :key="index">
                <div class="card">
                    <img class="carousel__item slideImgs card-img-top" :src="item">
                    <div class="card-body">
                        <p class="card-text">{{ texts.textList[index] }}</p>
                    </div>
                </div>
            </Slide>

            <template #addons>
                <Navigation />
                <Pagination />
            </template>
        </Carousel>
    </div>
</template>
  

<script setup lang="ts">
import { reactive } from 'vue'
import { Navigation, Slide, Pagination, Carousel } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const itemToShow = 4 //輪播顯示數量
const wrapAround = true //循環模式
const autoplay = 5000 //自動循環時間(單位:毫秒)
const pauseAutoplayOnHover = true //游標懸浮暫停自動循環
const items = reactive(
    {
        imageUrlList: ["https://picsum.photos//500/400?random=1",
            "https://picsum.photos/500/400?random=2",
            "https://picsum.photos/500/400?random=3",
            "https://picsum.photos/500/400?random=4",
            "https://picsum.photos/500/400?random=5",
            "https://picsum.photos//500/400?random=1",
            "https://picsum.photos/500/400?random=2",
            "https://picsum.photos/500/400?random=3",
            "https://picsum.photos/500/400?random=4",
            "https://picsum.photos/500/400?random=5",
            "https://picsum.photos//500/400?random=1",
            "https://picsum.photos/500/400?random=2",
            "https://picsum.photos/500/400?random=3",
            "https://picsum.photos/500/400?random=4",
            "https://picsum.photos/500/400?random=5",
        ]
    },
)
const texts = reactive({
    textList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
})

</script>
<style>
.carousel__next {
    right: -80px
}

.carousel__prev {
    left: -80px;
}

.slideImgs {
    max-width: 300px;
    max-height: 200px;
}
</style>
