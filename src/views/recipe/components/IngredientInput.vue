<script setup>

const props = defineProps({
    ingerdientIndex: {
    }

})

</script>
<template>
    <div class="ingredientContainer row justify-content-start ">
        <div class="ingredientTypeContainer col-4">
            <label for="ingredientName" class="form-label">所需食材</label><br>
            <input class="form-control" type="search" :id="'ingredientName' + ingerdientIndex"
                :name="'ingredientName' + ingerdientIndex" placeholder="請輸入食材名稱">
        </div>
        <div class="ingredientQuantityContainer col-4">
            <label for="ingredientQuantity" class="form-label">食材份量</label><br>
            <input class="form-control" type="text" :id="'ingredientQuantity' + ingerdientIndex"
                :name="'ingredientQuantity' + ingerdientIndex" required="required" placeholder="份量">
        </div>
        <div class="ingrediantBtn col-2 mt-4">
            <button class="btn btn-light " :id="'deleteIngredient' + ingerdientIndex">刪除</button>
            <button class="btn btn-light " :id="'moveIngredient' + ingerdientIndex">移動</button>
        </div>
    </div>
</template>
<style></style>