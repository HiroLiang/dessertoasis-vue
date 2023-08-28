<script setup >

import { reactive, ref } from 'vue'

const textContent = ref('')

const textPic = ref(null)
const props = defineProps({
    stepIndex: {
        type: Number
    },
})

let emit = defineEmits(['delete-step', 'get-stepText'])
const deleteStep = () => {
    emit('delete-step', props.stepIndex)
    console.log(emit);
}
const getStepDatas = () => {
    const stepIndex = props.stepIndex
    const textData = textContent.value
    const picData = textPic.value.files[0]
    console.log(picData);


    emit('get-stepText', stepIndex, textData, picData)
}




</script>

<template>
    <div class="stepContainer container">
        <div :class="'step' + stepIndex + 'Container' + ' row justify-content-between'">
            <div class="stepImgContainer col-3 align-self-center">
                <label :for="'recipeStep' + stepIndex" class=form-label>步驟{{ stepIndex }}</label><br>
                <img :class="'recipeStep' + stepIndex + 'Pic'" :id="'previewPic' + stepIndex" :alt="'步驟' + stepIndex + '圖片'"
                    src="https://fakeimg.pl/250x200/?text=Image">
                <input @change="getStepDatas" class="form-control" ref="textPic" type="file" :id="'recipeStep' + stepIndex"
                    :name="'recipeStep' + stepIndex" accept="image/*"><br>
            </div>
            <div class="introText col-6 align-self-center">
                <textarea @blur="getStepDatas" v-model="textContent" class="recipeIntroduction form-control" rows="9"
                    cols="20" style="resize: none;" :id="'recipeIntroduction' + stepIndex"
                    :name="'recipeIntroduction' + stepIndex" required="required"></textarea>
            </div>
            <div class="stepBtn col-3 mt-5">
                <button class="btn btn-light" :id="'deleteStep' + stepIndex" @click="deleteStep">刪除</button>
                <button class="btn btn-light" :id="'moveStep' + stepIndex">移動</button>
            </div>
        </div>
    </div>
</template>