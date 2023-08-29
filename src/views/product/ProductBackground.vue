<template>
    <h2>我的商品</h2>
    <div class="search-input">
        <input type="text" placeholder="搜尋">
        <h3>請選擇分類:</h3>
        <div class="container">
            <div class="row">
                <div class="col-md-6">

                    <select class="form-select" v-model="selectedCategory">
                        <option value="">Select a category</option>
                        <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
                    </select>
                </div>
                <div class="col-md-6" v-if="selectedCategory">

                    <select class="form-select" v-model="selectedProductType">
                        <option value="">Select a product type</option>
                        <option v-for="productType in selectedCategoryProductTypes" :value="productType.id">{{
                            productType.name
                        }}</option>
                    </select>
                </div>
            </div>
        </div>
        庫存量
        <input type="number" name="" />~<input type="number" name="" />
    </div>
    <div>
        銷量
        <input type="number" name="" />~<input type="number" name="" />
    </div>
    <div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
                上架中
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
                已下架
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
                已售完
            </label>
        </div>
    </div>

    <div class="search-btn">
        <button class="search-button" type="submit">搜尋</button>
        <!--<button><i class="lni lni-search-alt"></i></button>-->
    </div>
    <div class="btn">
        <button class="" type="button" @click="">重設</button>
        <!--<button><i class="lni lni-search-alt"></i></button>-->
    </div>

    <table id="productTable">
        <!-- 表格頭部 -->
        <tr>
            <th>圖片</th>
            <th>照片</th>
            <th>名稱</th>
            <th>規格</th>
            <th>價錢</th>
            <th>庫存</th>
            <th>購買次數</th>
            <th>狀態</th>
            <th colspan="4">操作</th>
        </tr>


    </table>
</template>

<script>
export default {
    data() {
        return {
            categories: [
                { id: '1', name: '職人手作麵包＆甜點' },
                { id: '2', name: '烘焙食材' },
                { id: '3', name: '烘焙器具' },
                { id: '4', name: '包裝材料' }
                // Add more categories as needed
            ],
            productTypes: [
                { id: '5', categoryId: '2', name: '麵粉' },
                { id: '6', categoryId: '2', name: '酵母粉/泡打粉/小蘇打' },
                { id: '7', categoryId: '4', name: '吐司袋、麵包袋' },
                { id: '8', categoryId: '4', name: '包裝盒' },
                // Add more product types as needed
            ],
            selectedCategory: '',
            selectedProductType: ''
        };
    },
    computed: {
        selectedCategoryProductTypes() {
            return this.productTypes.filter(type => type.categoryId === this.selectedCategory);
        }
    }
};
</script>


<style scoped></style>