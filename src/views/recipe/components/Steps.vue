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
        <h3>步驟{{ stepNumber }}</h3>
        <div class="row justify-content-start">
            <div class="imgContainer col-md-12 col-lg-3">
                <img :src="stepPicture" alt="">
            </div>
            <div class="stepTextContainer col-md-12  col-lg-3 ">
                <p class="stepText">{{ stepContext }}</p>
            </div>
        </div>

    </div>
</template>

<style scoped>
.stepText {
    white-space: pre-line
}
</style>