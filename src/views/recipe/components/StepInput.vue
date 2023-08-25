<script setup >

const props = defineProps({
    stepIndex: {
    }

})

</script>

<template>
    <div class="stepContainer container">
        <div :class="'step' + stepIndex + 'Container' + ' row justify-content-between'">
            <div class="stepImgContainer col-3 align-self-center">
                <label :for="'recipeStep' + stepIndex" class=form-label>步驟{{ stepIndex }}</label><br>
                <img :class="'recipeStep' + stepIndex + 'Pic'" :id="'previewPic' + stepIndex" :alt="'步驟' + stepIndex + '圖片'"
                    src="https://fakeimg.pl/250x200/?text=Image">
                <input class="form-control" type="file" :id="'recipeStep' + stepIndex" :name="'recipeStep' + stepIndex"
                    accept="image/*" :onchange="'preview(event,' + 'previewPic' + stepIndex + ')'"><br>
            </div>
            <div class="introText col-6 align-self-center">
                <textarea class="recipeIntroduction form-control" rows="9" cols="20" style="resize: none;"
                    :id="'recipeIntroduction' + stepIndex" :name="'recipeIntroduction' + stepIndex"
                    required="required"></textarea>
            </div>
            <div class="stepBtn col-3 mt-5">
                <button class="btn btn-light" :id="'deleteStep' + stepIndex">刪除</button>
                <button class="btn btn-light" :id="'moveStep' + stepIndex">移動</button>
            </div>
        </div>
    </div>
</template>