<template>
    <div class="step2Container container">
        <div class="step1Container row justify-content-between">
            <div class="stepImgContainer col-3 align-self-center">
                <label for="recipeStep2" class="form-label">步驟2</label><br>
                <img class="recipeStep2Pic" id="previewPic0" alt="步驟圖片" src="https://fakeimg.pl/250x200/?text=Image">
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
</template>