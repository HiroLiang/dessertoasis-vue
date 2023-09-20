<template>
    <div class="container">
        <div class="gallery">
            <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
                <Slide v-for="(item, index) in props.itemsList" :key="index">
                    <img class="carousel__item slideImgs card-img" :src="item.imageUrl" @click="goToSlide(index)">
                </Slide>
            </Carousel>
        </div>
        <div class="thumbnails">
            <Carousel id="thumbnails" :items-to-show="3" :wrap-around="true" v-model="currentSlide" :slide-width="1000"
                ref="carousel">
                <Slide v-for="(item, index) in props.itemsList" :key="index">
                    <img class="carousel__item slideImgs card-img" :src="item.imageUrl" @click="goToSlide(index)">
                </Slide>
                <template #addons>
                    <Navigation />
                </template>
            </Carousel>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { Navigation, Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

const currentSlide = ref(0);

const slideTo = (val) => {
    currentSlide.value = val;
};

const goToSlide = (index) => {
    currentSlide.value = index;
};

const props = defineProps({
    itemsList: {
        default: [
            { imageUrl: "https://picsum.photos//500/400?random=1" },
            { imageUrl: "https://picsum.photos//500/400?random=2" },
            // { imageUrl: "https://picsum.photos//500/400?random=3" },
            // { imageUrl: "https://picsum.photos//500/400?random=4" },
            // { imageUrl: "https://picsum.photos//500/400?random=5" },
            // { imageUrl: "https://picsum.photos//500/400?random=1" },
            // { imageUrl: "https://picsum.photos//500/400?random=2" },
            // { imageUrl: "https://picsum.photos//500/400?random=3" },
            // { imageUrl: "https://picsum.photos//500/400?random=4" },
            // { imageUrl: "https://picsum.photos//500/400?random=5" },
            // { imageUrl: "https://picsum.photos//500/400?random=1" },
            // { imageUrl: "https://picsum.photos//500/400?random=2" },
            // { imageUrl: "https://picsum.photos//500/400?random=3" },
            // { imageUrl: "https://picsum.photos//500/400?random=4" },
            // { imageUrl: "https://picsum.photos//500/400?random=5" },
        ],
    },
})
</script>

<style>
/* .carousel__next {
    right: -50px;
}

.carousel__prev {
    left: -50px;
}

.galleryImgs {
    max-width: 600px;
    max-height: 600px;

} */

/* .carousel__item.slideImgs {
    max-width: 600px;
    max-height: 600px;
} */

/* .slideImgs {
    max-width: 600px;
    max-height: 600px;
    padding: 10px;
}

.gallery {
    max-width: 600px;
    max-height: 600px;
}

.thumbnails {
    max-width: 600px;
    max-height: 600px;
    padding: 10px;
} */

/* 調整輪播圖片的最大寬度和最大高度 */
.carousel__item.slideImgs img {
    max-width: 100%;
    /* 設置最大寬度為容器的百分之百 */
    max-height: 100%;
    /* 設置最大高度為容器的百分之百 */
    width: auto;
    /* 確保圖片寬度自適應 */
    height: auto;
    /* 確保圖片高度自適應 */
}

/* 調整輪播圖片容器的最大寬度和最大高度 */
.gallery .carousel__item.slideImgs {
    max-width: 1700px;
    /* 設置最大寬度為600px，您可以根據需要進行調整 */
    max-height: 1700px;
    /* 設置最大高度為600px，您可以根據需要進行調整 */
}

.gallery {
    max-width: 1700px;
    /* 設置最大寬度為600px，您可以根據需要進行調整 */
    max-height: 1700px;
    /* 設置最大高度為600px，您可以根據需要進行調整 */
}

/* 可以選擇修改容器的最大寬度和最大高度 */
/* .galleryImgs {
    max-width: 1500px;

    max-height: 1500px;

} */

/* 調整縮略圖容器的最大寬度 */
.thumbnails {
    max-width: 600px;
    /* 設置最大寬度為600px */
    max-height: 300px;
    padding: 10px;
}



/* .gallery {
    max-width: 1500px;
    max-height: 1500px;
} */
</style>
  