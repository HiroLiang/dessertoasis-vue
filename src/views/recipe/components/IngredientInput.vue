<script setup>

import { reactive, ref } from 'vue'

const props = defineProps({
    ingerdientIndex: {
        type: Number
    },
})

const ingredientName = ref('')
const ingredientQty = ref('')
const ingredientUnit = ref('毫升')

let emit = defineEmits(['delete-ingredient', 'get-ingredient-data'])
const deleteIngredient = () => {
    emit('delete-ingredient', props.ingerdientIndex)
    console.log(emit);
}
const getIngredientData = () => {
    const ingredientIndex = props.ingerdientIndex
    const ingredient = ingredientName.value
    const quantity = ingredientQty.value
    const unit = ingredientUnit.value

    emit('get-ingredient-data', ingredientIndex, ingredient, quantity, unit)
}

</script>

<template>
    <div class="ingredientTypeContainer col-lg-4 col-md-3">
        <label :for="'ingredientName' + ingerdientIndex" class="form-label mt-2">所需食材</label><br>
        <input class="form-control" v-model="ingredientName" type="text" :id="'ingredientName' + ingerdientIndex"
            :name="'ingredientName' + ingerdientIndex" placeholder="請輸入食材名稱" @blur="getIngredientData">
    </div>
    <div class="ingredientQuantityContainer col-lg-2 col-md-3">
        <label :for="'ingredientQuantity' + ingerdientIndex" class="form-label mt-2">食材份量</label><br>
        <input class="form-control" v-model="ingredientQty" type="text" :id="'ingredientQuantity' + ingerdientIndex"
            :name="'ingredientQuantity' + ingerdientIndex" required="required" placeholder="份量" @blur="getIngredientData">
    </div>
    <div class="ingredientUnit col-lg-2 col-md-3 mt-2">
        <p class="form-label">單位</p>
        <select class="form-select" v-model="ingredientUnit" id="ingredientUnit">
            <option selected value="毫升">毫升</option>
            <option value="毫克">毫克</option>
            <option value="小匙">小匙</option>
            <option value="大匙">大匙</option>
            <option value="顆">顆</option>
            <option value="個">個</option>
        </select>
    </div>
    <div class="ingrediantBtn col-lg-2 col-md-3 mt-4">
        <button class="btn btn-light mt-3 " :id="'deleteIngredient' + ingerdientIndex" @click="deleteIngredient">刪除</button>
    </div>
</template>
<style></style>