<script setup></script>
<template>
    <div class="ingredientContainer row justify-content-start  ">
        <div class="ingredientTypeContainer col-4">
            <label for="ingredientName" class="form-label">所需食材</label><br>
            <input class="form-control" type="search" id="ingredientName" name="ingredientName" placeholder="請輸入食材名稱">
        </div>
        <div class="ingredientQuantityContainer col-4">
            <label for="ingredientQuantity" class="form-label">食材份量</label><br>
            <input class="form-control" type="text" id="ingredientQuantity" name="ingredientQuantity" required="required"
                placeholder="份量">
        </div>
        <div class="ingrediantBtn col-2 mt-4">
            <button class="btn btn-light ">刪除</button>
            <button class="btn btn-light ">移動</button>
        </div>
    </div>
</template>
<style></style>