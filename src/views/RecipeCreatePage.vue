<script lang="ts">
// import NavBar from '@/components/NavBar.vue'

</script>

<template>
    <div>
        <!-- <NavBar></NavBar> -->
    </div>
    <h2>this is recipe create page</h2>

    <div class="container">
        <div class="recipeContainer container">
            <div class="recipeTitleContainer container mt-3">
                <label for="recipeTitle" class="form-label">食譜名稱:</label><br>
                <input class="form-control" type="text" id="recipeTitle" name="recipeTitle" required="required">
            </div>
            <div class="recipeIntroductionContainer container mt-3">
                <label for="recipeIntroduction" class="form-label">食譜簡介:</label><br>
                <textarea class="recipeIntroduction form-control" style="resize: none;" id="recipeIntroduction"
                    name="recipeIntroduction" required="required"></textarea>
                <br>

            </div>

            <div class="picContainer container">
                <label for="pictureURL" class="form-label">成品圖片:</label><br>
                <img class="recipePic" id="previewPic0" alt="成品圖片" src="https://fakeimg.pl/440x300/?text=Image">
                <input class="form-control" type="file" id="pictureURL" name="pictureURL" accept="image/*"
                    onchange="preview(event,'previewPic0')"><br>
            </div>
            <div class="container ml-3">
                <div class="ingredientContainer row justify-content-start  ">
                    <div class="ingredientQtyContainer col-4">
                        <label for="ingredientQuantity" class="form-label">食材份量</label><br>
                        <select class="form-select">
                            <option selected value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10+</option>
                        </select>人份
                    </div>
                    <div class="cookingTimeContainer col-4">
                        <label for="cookingTime" class="form-label">烹調時間</label><br>
                        <input class="form-control" type="text" id="cookingTime" name="cookingTime" required="required">分鐘
                    </div>
                </div>
            </div>
            <div class="container ml-3">
                <div class="ingredientContainer row justify-content-start  ">
                    <div class="ingredientTypeContainer col-4">
                        <label for="ingredientName" class="form-label">所需食材</label><br>
                        <input class="form-control" type="search" id="ingredientName" name="ingredientName"
                            placeholder="請輸入食材名稱">
                    </div>
                    <div class="ingredientQuantityContainer col-4">
                        <label for="ingredientQuantity" class="form-label">食材份量</label><br>
                        <input class="form-control" type="text" id="ingredientQuantity" name="ingredientQuantity"
                            required="required" placeholder="份量">
                    </div>
                    <div class="ingrediantBtn col-2 mt-4">
                        <button class="btn btn-light ">刪除</button>
                        <button class="btn btn-light ">移動</button>
                    </div>
                </div>
                <div class="newRecipeStepContainer d-grid mt-3">
                    <button class="btn btn-light">+ 增加食材</button>
                </div>
            </div>
            <div class="recipeStepsContainer container mt-3">
                <div class="step1Container row justify-content-between">
                    <div class="stepImgContainer col-2 align-self-center">
                        <label for="recipeStep1" class="form-label">步驟1</label><br>
                        <img class="recipeStep1Pic" id="previewPic0" alt="步驟圖片"
                            src="https://fakeimg.pl/250x200/?text=Image">
                        <input class="form-control" type="file" id="recipeStep1" name="recipeStep1" accept="image/*"
                            onchange="preview(event,'previewPic0')"><br>
                    </div>
                    <div class="introText col-6 align-self-center">
                        <textarea class="recipeIntroduction form-control" rows="9" cols="20" style="resize: none;"
                            id="recipeIntroduction" name="recipeIntroduction" required="required"></textarea>

                    </div>
                    <div class="stepBtn col-3 mt-5">
                        <button class="btn btn-light ">刪除</button>
                        <button class="btn btn-light ">移動</button>
                    </div>

                </div>
                <div class="step2Container container">
                    <div class="step1Container row justify-content-between">
                        <div class="stepImgContainer col-2 align-self-center">
                            <label for="recipeStep2" class="form-label">步驟2</label><br>
                            <img class="recipeStep2Pic" id="previewPic0" alt="步驟圖片"
                                src="https://fakeimg.pl/250x200/?text=Image">
                            <input class="form-control" type="file" id="recipeStep2" name="recipeStep2" accept="image/*"
                                onchange="preview(event,'previewPic0')"><br>
                        </div>
                        <div class="introText col-6 align-self-center">
                            <textarea class="recipeIntroduction form-control" rows="9" cols="20" style="resize: none;"
                                id="recipeIntroduction" name="recipeIntroduction" required="required"></textarea>
                        </div>
                        <div class="stepBtn col-3 mt-5">
                            <button class="btn btn-light">刪除</button>
                            <button class="btn btn-light">移動</button>
                        </div>
                    </div>
                </div>

            </div>
            <div class="newRecipeStepContainer d-grid">
                <button class="btn btn-light">+ 增加步驟</button>
            </div>

            <br>
            <br>

        </div>
        <div class="crudbtn">
            <button class=" btn btn-light">發布</button>
            <button class="btn btn-light">儲存</button>
            <button class="btn btn-light">取消</button>
            <button class="btn btn-light">刪除</button>

        </div>

    </div>
</template>

<style>
.recipeContainer {
    border: 2px solid black;
    border-radius: 5px;
}

.crudbtn {
    border: 2px solid black;

}

.recipePic {
    max-height: 100%;
    max-width: 100%;
}
</style>