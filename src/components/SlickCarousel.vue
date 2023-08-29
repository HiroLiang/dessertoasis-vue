<template>
    <div class="container">
        <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
            <Slide v-for="(item, index) in props.itemsList" :key="index">
                <img class="carousel__item card-img" :src="item.imageUrl">

            </Slide>
        </Carousel>

        <Carousel id="thumbnails" :items-to-show="4" :wrap-around="true" v-model="currentSlide" :slide-width="1000"
            ref="carousel">
            <Slide v-for="(item, index) in  props.itemsList " :key="index">
                <img class="carousel__item slideImgs card-img" :src="item.imageUrl">

                <div class="carousel__item" @click="slideTo(item - 1)"></div>
            </Slide>
            <template #addons>
                <Navigation />
            </template>
        </Carousel>
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
.carousel__next {
    right: -50px;
}

.carousel__prev {
    left: -50px;
}

.slideImgs {
    max-width: 300px;
    max-height: 200px;
}
</style>
  