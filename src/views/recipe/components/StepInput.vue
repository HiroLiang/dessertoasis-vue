<script setup >

import { reactive, ref } from 'vue'

const textContent = ref(props.textContent || '')
const textPic = ref(null)
const previewImageUrl = ref(props.previewImageUrl || null)
const props = defineProps({
    stepIndex: {
        type: Number
    },
    textContent: {
        type: String
    },
    previewImageUrl: {
        type: String
    }
})
//自定義事件
let emit = defineEmits(['delete-step', 'get-step-data', 'get-img-data'])

//子傳父取得刪除案件觸發的index值
const deleteStep = () => {
    emit('delete-step', props.stepIndex)
    // console.log('delete step Index: ' + props.stepIndex);
}

//子傳父取得步驟圖片(轉為base64)及textarea文字資料
const getStepDatas = () => {
    const stepIndex = props.stepIndex
    const textData = textContent.value
    emit('get-step-data', stepIndex, textData)
}

const getStepPic = () => {
    const stepIndex = props.stepIndex

    const stepPic = textPic.value.files[0]
    if (stepPic) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const base64Data = e.target.result.split(',')[1]
            const jsonData = {
                fileName: stepPic.name,
                base64Content: base64Data
            }
            const jsonString = JSON.stringify(jsonData);
            emit('get-img-data', stepIndex, jsonString)
            previewImageUrl.value = e.target.result
        }
        reader.readAsDataURL(stepPic);
    }

}

</script>

<template>
    <div class="stepContainer container">
        <div :class="'step' + stepIndex + 'Container' + ' row justify-content-between'">
            <h5 class="mb-2 mt-2">步驟{{ stepIndex }}</h5><br>
            <div class="stepImgContainer col-3 align-self-start" :id="'imgContainer' + stepIndex">
                <label :for="'recipeStepInput' + stepIndex" class="inputLabel custom-cursor-pointer">
                    <img :class="'recipeStep' + stepIndex + 'Pic'" :id="'previewPic' + stepIndex"
                        :alt="'步驟' + stepIndex + '圖片'" :src="previewImageUrl || 'https://fakeimg.pl/250x200/?text=Image'">
                </label>
                <input @change="getStepPic" class="form-control visually-hidden " ref="textPic" type="file"
                    :id="'recipeStepInput' + stepIndex" :name="'recipeStep' + stepIndex" accept="image/*"><br>
            </div>
            <div class="introText col-6 align-self-center mb-2 ">
                <textarea @blur="getStepDatas" v-model="textContent" class="recipeIntroduction form-control " rows="6"
                    cols="20" style="resize: none;" :id="'recipeIntroduction' + stepIndex"
                    :name="'recipeIntroduction' + stepIndex" required="required"></textarea>
            </div>
            <div class="stepBtn col-3">
                <button class="btn btn-light" :id="'deleteStep' + stepIndex" @click="deleteStep">刪除</button>
                <button class="btn btn-light" :id="'moveStep' + stepIndex">移動</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
[id^="previewPic"] {
    margin-bottom: 5px;
    max-height: 100%;
    max-width: 100%;
}

.custom-cursor-pointer {
    cursor: pointer !important;
}

.stepImgContainer h5 {
    margin-bottom: 0.5rem;
    /* 设置 <h5> 元素的下外边距为 0.5rem（根据需要调整） */
}

.stepImgContainer input {
    margin-top: 0.5rem;
    /* 设置 <input> 元素的上外边距为 0.5rem（根据需要调整） */
}
</style>