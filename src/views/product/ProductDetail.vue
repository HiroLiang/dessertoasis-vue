<template>
    <div>
        <h2>商品詳情</h2>
        <div class="container border">
            <div class="carouselcontainer">
                <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
                    <Slide v-for="(item, index) in productImages" :key="index">
                        <img :src="item.img" alt="" class="carousel-image">
                    </Slide>
                </Carousel>

                <Carousel id="thumbnails" :items-to-show="2" :wrap-around="true" v-model="currentSlide" ref="carousel">
                    <Slide v-for="(item, index) in productImages" :key="index">
                        <img :src="item.img" alt="" class="thumbnail-image" @click="slideTo(index)">
                    </Slide>
                </Carousel>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

import michalParzuchowskiImg from '@/assets/images/headerShow/michal-parzuchowski-pMsvOrnIF3Y-unsplash.jpg';
import nickKarvounisImg from '@/assets/images/headerShow/nick-karvounis-jN_M0McVNeI-unsplash.jpg';


const productImages = [
    { img: michalParzuchowskiImg },
    { img: nickKarvounisImg },

];

const currentSlide = ref(0);

const slideTo = (index) => {
    currentSlide.value = index;
};
</script>
  
<style scoped>
.carousel-image {
    max-width: 20%;

}

.thumbnail-image {
    max-width: 20%;
    padding: 5px;

}
</style>
  