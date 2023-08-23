<template>
    <h2>我的商品</h2>
    <div class="search-input">
        <input type="text" placeholder="搜尋">
    </div>
    <div>

        <div>
            <!-- Button trigger modal -->
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                選擇分類
            </button>
            <span>{{ selectedResult }}</span>
            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">選擇分類</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <select v-model="selected1">
                                <option selected>請選擇分類</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            >
                            <select v-model="selected2">
                                <option selected>請選擇分類</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            >
                            <select v-model="selected3">
                                <option selected>請選擇分類</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" @click="confirmModal"
                                data-bs-dismiss="modal">確定</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
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

<script setup lang="ts">
import { ref } from 'vue';

const selected1 = ref(''); // 初始化为空字符串
const selected2 = ref(''); // 初始化为空字符串
const selected3 = ref(''); // 初始化为空字符串
const selectedResult = ref(''); // 存储选择的结果

const isModalVisible = ref(false);

const showModal = () => {
    isModalVisible.value = true;
};

const hideModal = () => {
    isModalVisible.value = false;
};

const confirmModal = () => {
    // 在此处添加获取选择的分类的逻辑，假设您已经获取到了选择的分类值
    // 假设 selected1、selected2 和 selected3 是从选项中获取的选择的值
    selectedResult.value = `${selected1.value} > ${selected2.value} > ${selected3.value}`;
    console.log("Confirm button clicked")
    // 隐藏模态框
    hideModal();

};

// const resetSelected = () => {
//     selected1.value = '';
//     selected2.value = '';
//     selected3.value = '';
// };
</script>


<style scoped></style>