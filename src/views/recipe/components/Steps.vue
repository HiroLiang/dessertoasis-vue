<script setup>
import { reactive, ref } from 'vue';
const props = defineProps({
    stepNumber: Number,
    stepPicture: String,
    stepContext: String
})

</script>


<template>
    <div class="container mb-3">
        <h5>步驟{{ stepNumber }}</h5>
        <div class="row justify-content-start ">
            <div class="imgContainer  col-lg-12 col-xl-6 col-xxl-4">
                <!-- <div class="picContainer"> -->
                <img :src="stepPicture" alt="" class="img-fluid rounded imgWrapper">
                <!-- </div> -->
            </div>
            <div class="stepTextContainer border-start col-lg-12  col-xl-6 ">
                <p class="stepText mt-2 ">{{ stepContext }}</p>
            </div>
        </div>

    </div>
</template>

<style scoped>
.imgContainer>img {
    width: 300px;
    height: 200px;
    object-fit: cover;
    object-position: center;
}

/* .imgContainer {
    overflow: hidden;
    width: 100%;
    height: auto;
} */

/* .picContainer {
    height: 300px;
    width: 300px;
} */

.stepText {
    white-space: pre-line;
    font-size: 24px
}
</style>