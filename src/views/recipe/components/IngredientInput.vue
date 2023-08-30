<script setup>

import { reactive, ref } from 'vue'

const props = defineProps({
    ingerdientIndex: {
        type: Number
    },
})

const ingredientName = ref('')
const ingredientQty = ref('')

let emit = defineEmits(['delete-ingredient', 'get-ingredient-data'])
const deleteIngredient = () => {
    emit('delete-ingredient', props.ingerdientIndex)
    console.log(emit);
}
const getIngredientData = () => {
    const ingredientIndex = props.ingerdientIndex
    const ingredient = ingredientName.value
    const quantity = ingredientQty.value

    emit('get-ingredient-data', ingredientIndex, ingredient, quantity)
}

</script>

<template>
    <div class="ingredientTypeContainer col-4">
        <label :for="'ingredientName' + ingerdientIndex" class="form-label">所需食材</label><br>
        <input class="form-control" v-model="ingredientName" type="search" :id="'ingredientName' + ingerdientIndex"
            :name="'ingredientName' + ingerdientIndex" placeholder="請輸入食材名稱" @blur="getIngredientData">
    </div>
    <div class="ingredientQuantityContainer col-4">
        <label :for="'ingredientQuantity' + ingerdientIndex" class="form-label">食材份量</label><br>
        <input class="form-control" v-model="ingredientQty" type="text" :id="'ingredientQuantity' + ingerdientIndex"
            :name="'ingredientQuantity' + ingerdientIndex" required="required" placeholder="份量" @blur="getIngredientData">
    </div>
    <div class="ingrediantBtn col-2 mt-4">
        <button class="btn btn-light " :id="'deleteIngredient' + ingerdientIndex" @click="deleteIngredient">刪除</button>
    </div>
</template>
<style></style>