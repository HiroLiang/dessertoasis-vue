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
        <div class="row justify-content-start">
            <div class="imgContainer  col-lg-12 col-xl-6">
                <img :src="stepPicture" alt="" class="img-fluid rounded">
            </div>
            <div class="stepTextContainer col-lg-12  col-xl-6 ">
                <p class="stepText">{{ stepContext }}</p>
            </div>
        </div>

    </div>
</template>

<style scoped>
imgContainer img {
    max-width: 100%;
    height: auto;
}

.stepText {
    white-space: pre-line
}
</style>