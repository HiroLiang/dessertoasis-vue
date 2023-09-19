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
            <Carousel id="thumbnails" :items-to-show="6" :wrap-around="true" v-model="currentSlide" :slide-width="1000"
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
.carousel__next {
    right: -50px;
}

.carousel__prev {
    left: -50px;
}

.galleryImgs {
    max-width: 600px;
    max-height: 600px;

}

/* .carousel__item.slideImgs {
    max-width: 600px;
    max-height: 600px;
} */

.slideImgs {
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
}
</style>
  