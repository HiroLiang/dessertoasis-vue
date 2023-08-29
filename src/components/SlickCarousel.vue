<template>
    <div class="container">
        <div class="carouselcontainer">
            <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
                <Slide v-for="slide in 10" :key="slide">
                    <div class="carousel__item">{{ slide }}</div>
                </Slide>
            </Carousel>

            <Carousel id="thumbnails" :items-to-show="4" :wrap-around="true" v-model="currentSlide" ref="carousel">
                <Slide v-for="slide in 10" :key="slide">
                    <div class="carousel__item" @click="slideTo(slide - 1)">{{ slide }}</div>
                </Slide>
            </Carousel>
        </div>
    </div>
</template>
  
<script>
import { defineComponent } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
    name: 'Gallery',
    components: {
        Carousel,
        Slide,
    },
    data: () => ({
        currentSlide: 0,
    }),
    methods: {
        slideTo(val) {
            this.currentSlide = val
        },
    },
})
</script>
  
<style scoped>
.carousel__item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 24px;
    background-color: #f0f0f0;
}
</style>
  