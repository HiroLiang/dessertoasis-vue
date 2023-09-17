<template>
    <div class="container">
        <p>修改分類</p>
        <n-space>
            <n-cascader v-model:value="selectedValue" @update:value="handleCascaderChange" clearable placeholder="所有商品"
                :max-tag-count="settings.responsiveMaxTagCount ? 'responsive' : undefined"
                :expand-trigger="settings.hoverTrigger ? 'hover' : 'click'" :options="customOption" :show-path="true"
                :filterable="settings.filterable" :clear-filter-after-select="settings.clearFilterAfterSelect"
                size="large" />
        </n-space>
    </div>
    <form>
        <div class="container">
            <p></p>
            <div class="image-upload">
                <p>圖片</p>
                <input type="file" @change="addImage" accept="image/*" multiple />
                <div v-for="(image, index) in imagesData.images" :key="index" class="uploaded-item">
                    <div class="image-preview">
                        <img :src="image.url" alt="Uploaded Image" />
                        <button @click="removeImage(index)">刪除</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="dynamic">
            <p>商品名稱</p>
            <input v-model="formData.prodName" />
        </div>
        <div class="time">
            <p>上架時間</p>
            <n-date-picker v-model="formData.updateTime" type="datetime" clearable />
        </div>
        <div class="dynamic">
            <p>價錢</p>
            <input v-model.number="formData.prodPrice" type="number" />
        </div>
        <div class="dynamic">
            <p>庫存</p>
            <input v-model.number="formData.prodStock" type="number" />
        </div>
        <div class="editor">
            <CKEditor v-model="editorContent" :config="editorConfig" />
        </div>
        <div class="dynamic">
            <p>備註</p>
            <input v-model="formData.prodRemark" />
        </div>
        <button @click.prevent="editProd">確認修改</button>
    </form>
</template>
  

  
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { NSpace, NCascader } from 'naive-ui';
import CKEditor from '@/components/CKEditor.vue';
import { EditProduct, UploadProdImage, reqGetCategory, getProdById } from '@/api/index.js';

const settings = {
    hoverTrigger: ref(true),
    selectedValue: ref(null),
    filterable: ref(true),
    clearFilterAfterSelect: ref(true),
};

const images = ref([]);
const formData = ref({
    prodName: "",
    prodPrice: 0,
    prodStock: 0,
    prodRemark: "",
    updateTime: Date.now(),
});
const productId = ref(null); // 用于存储产品ID
const productData = ref(null);
const updateTime = ref(Date.now());
const route = useRoute();
const editorContent = ref('');
const editorConfig = {
    // 在这里配置 CKEditor 的选项，例如工具栏、插件等
};
const selectedValue = ref(null);
const imagesData = ref({
    images: []
});

const fetchProductData = async () => {
    try {
        if (productId.value !== null) {
            const response = await getProdById(productId.value);
            productData.value = response.data; // 存储从后端返回的数据到 productData 变量
            // 将从后端获取的数据填充到表单字段中
            formData.value.prodName = productData.value.prodName;
            formData.value.prodPrice = productData.value.prodPrice;
            formData.value.prodStock = productData.value.prodStock;
            formData.value.prodRemark = productData.value.prodRemark;
            formData.value.updateTime = productData.value.updateTime;
            editorContent.value = productData.value.prodDescription;
            // 将分类数据填充到 selectedValue 中，假设分类数据来自 productData 中的某个字段
            selectedValue.value = productData.value.categoryId; // 请根据实际情况更改字段名称
        }
    } catch (error) {
        // 处理错误
        console.error('Error fetching product data:', error);
    }
};


const editProd = async () => {
    try {
        // 1. 构建要发送的数据
        const productData = {
            // 您需要根据表单字段的名称来设置数据
            prodName: formData.value.prodName,
            prodPrice: formData.value.prodPrice,
            prodStock: formData.value.prodStock,
            prodRemark: formData.value.prodRemark,
            updateTime: formData.value.updateTime,
            categoryId: selectedValue.value, // 分类 ID，根据实际情况设置
            prodDescription: editorContent.value, // 产品描述，根据实际情况设置
            // 可能还有其他字段
        };

        // 2. 发送编辑请求
        const response = await EditProduct(productId.value, productData, jsonHeader);

        // 3. 处理成功响应，可能需要更新UI或显示成功消息
        if (response.status === 200) {
            // 编辑成功
            console.log('Product edited successfully');
            // 可以进行一些成功后的操作，例如重定向到其他页面或显示成功消息
        } else {
            // 编辑失败，根据实际情况处理
            console.error('Product edit failed:', response.data);
            // 可以显示错误消息或采取其他适当的措施
        }
    } catch (error) {
        // 4. 处理错误，可能需要显示错误消息
        console.error('Error editing product:', error);
        // 可以显示错误消息或采取其他适当的措施
    }
};



onMounted(() => {
    productId.value = route.params.id; // 从路由参数获取 productId
    fetchProductData(); // 在组件挂载时触发获取数据的操作
});

const addImage = (event) => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = URL.createObjectURL(file);
        imagesData.value.images.push({ url, file });
    }
};

const removeImage = (index) => {
    imagesData.value.images.splice(index, 1);
};

const handleCascaderChange = (value) => {
    selectedValue.value = value;
};


</script>
  
 
  
  
<style scoped>
.dynamic {
    max-width: 70%;
    padding-left: 100px;
}

.time {
    max-width: 50%;
    padding-left: 100px;
}

.editor {
    max-width: 90%;
    padding-left: 50px;
}

.image-preview img {
    max-width: 200px;
    max-height: 200px;
}
</style>
  