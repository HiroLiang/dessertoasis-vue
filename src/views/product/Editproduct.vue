<template>
    <div class="contain">
        <form>
            <div class="cascader">
                <p>修改分類</p>
                <n-space>
                    <n-cascader v-model:value="selectedValue" @update:value="handleCascaderChange" clearable
                        placeholder="所有商品" :max-tag-count="settings.responsiveMaxTagCount ? 'responsive' : undefined"
                        :expand-trigger="settings.hoverTrigger ? 'hover' : 'click'" :options="customOption"
                        :show-path="true" :filterable="settings.filterable"
                        :clear-filter-after-select="settings.clearFilterAfterSelect" size="large" />
                </n-space>
            </div>

            <div class="container">
                <p></p>
                <!-- <div class="image-upload">
                <p>圖片</p>
                <input type="file" @change="addImage" accept="image/*" multiple />
                <div v-for="(image, index) in imagesData.images" :key="index" class="image-preview">
                    <img :src="image.url" alt="Uploaded Image" />
                    <button @click="removeExistingImage(index)">刪除</button>
                </div>
            </div> -->
            </div>
            <div class="dynamic">
                <p>商品名稱</p>
                <input v-model="formData.prodName" />
            </div>
            <div class="time">
                <p>上架時間</p>
                <n-date-picker v-model="formData.updateTime" @update:value="Changedate" type="datetime" clearable />
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
                <p>商品描述</p>
                <textarea v-model="formData.prodDescription" rows="6"></textarea>
            </div>
            <!-- <div class="editor">
            <CKEditor v-model="editorContent" :config="editorConfig" />
        </div> -->
            <div class="dynamic">
                <p>備註</p>
                <input v-model="formData.prodRemark" />
            </div>
            <div class="button">
                <button type="button" class="btn btn-success" @click.prevent="editProd">確認修改</button>
                <button type="button" class="btn btn-danger" @click.prevent="deleteProd">刪除</button>
                <!-- <button @click.prevent="editProd">確認修改</button> -->
            </div>
        </form>
    </div>
</template>
  

  
<script setup>
import { ref, onMounted, onBeforeMount, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { NSpace, NCascader } from 'naive-ui';
import CKEditor from '@/components/CKEditor.vue';
import axios from 'axios';
import { EditProduct, UploadProdImage, reqGetCategory, getProdById, deleteProdById } from '@/api/index.js';
import sweetalert from "SweetAlert2";
const selectedDateTime = ref(null);
const settings = {
    hoverTrigger: ref(true),
    selectedValue: ref(null),
    filterable: ref(true),
    clearFilterAfterSelect: ref(true),
};

const images = ref([]);
const formData = ref({
    prodName: "",
    categoryId: 1,
    prodPrice: 0,
    prodStock: 0,
    prodRemark: "",
    updateTime: Date.now(),
    prodDescription: '',
});
const productId = ref(null); // 用于存储产品ID
const productData = ref(null);
const updateTime = ref(Date.now());
const route = useRoute();
const router = useRouter();
// const editorContent = ref('');
// const editorConfig = {
//     // 在这里配置 CKEditor 的选项，例如工具栏、插件等
// };
const selectedValue = ref(null);
const imagesData = ref({
    images: []
});

const fetchProductData = async () => {
    try {
        if (productId.value !== null) {
            const response = await getProdById(productId.value);
            productData.value = response.data;

            // 使用 await 等待 Proxy 對象的解析
            await productData.value;

            formData.value.prodName = productData.value.product.prodName;
            formData.value.prodPrice = productData.value.product.prodPrice;
            formData.value.prodStock = productData.value.product.prodStock;
            formData.value.prodRemark = productData.value.product.prodRemark;

            //打印日期時間值以檢查
            console.log("productData.value.product.updateTime", productData.value.product.updateTime);
            formData.value.updateTime = new Date(productData.value.product.updateTime).toISOString();
            console.log("formData.value.updateTime", formData.value.updateTime);

            formData.value.prodDescription = productData.value.product.prodDescription;
            console.log("productData", productData.value);
            formData.value.categoryId = productData.value.category.id;
            console.log("productData.value.category.id", productData.value.category.id);
        }
    } catch (error) {
        // 處理錯誤
        console.error('Error fetching product data:', error);
    }
};

const editProd = async () => {
    try {
        // 在函数内部初始化 productId
        const productId = route.params.id;

        const productData = {
            product: {
                prodName: formData.value.prodName,
                prodDescription: formData.value.prodDescription,
                prodStock: parseInt(formData.value.prodStock), // 将字符串转换为整数
                prodPrice: parseInt(formData.value.prodPrice), // 将字符串转换为整数
                updateTime: new Date(formData.value.updateTime).toISOString(),
                prodRemark: formData.value.prodRemark,
            },
            category: {
                id: formData.categoryId,
            },
        };
        console.log("productData", productData);
        // 2. 发送编辑请求
        const response = await EditProduct(productId, productData);

        console.log("response", response);
        const newProductId = response.data;
        console.log("productId", newProductId);
        console.log("商品已成功上傳", newProductId);
        if (response.status === 200) {

            await sweetalert.fire({
                icon: 'success',
                title: '成功',
                text: '商品已成功修改！',
                confirmButtonText: '確定',
            });
        } else {

            await sweetalert.fire({
                icon: 'error',
                title: '失敗',
                text: '商品修改失敗，請重試或聯絡管理員。',
                confirmButtonText: '確定',
            });
        }
        // const imageUploadPromises = imagesData.value.images.map(async (image, index) => {
        //     const imageFormData = new FormData();
        //     imageFormData.append("image", image.file);
        //     console.log("imageFormData", imageFormData);
        //     console.log("productId", newProductId);
        //     const config = {
        //         headers: {
        //             "Content-Type": "multipart/form-data" // 设置请求头
        //         }
        //     };

        //     const imageResponse = await UploadProdImage(newProductId, imageFormData, config);
        //     console.log(`圖片 ${index + 1} 已成功上傳`, imageResponse.data);
        // });

        // await Promise.all(imageUploadPromises);

    } catch (error) {
        console.error("上傳時有誤", error);
        await sweetalert.fire({
            icon: 'error',
            title: '失敗',
            text: '商品修改失敗，請重試或聯絡管理員。',
            confirmButtonText: '確定',
        });
    }
}

// watchEffect(() => {
//     if (formData.updateTime instanceof Date) {
//         selectedDateTime.value = formData.updateTime;
//     }
// });
const deleteProd = () => {
    // 弹出确认删除的对话框，要求输入商品名称
    sweetalert.fire({
        title: '確認删除',
        text: '請輸入商品名稱以確認删除:',
        input: 'text',
        inputPlaceholder: '商品名稱',
        showCancelButton: true,
        confirmButtonText: '確認删除',
        cancelButtonText: '取消',
        inputValidator: (value) => {
            // 验证输入的商品名称是否匹配
            if (value.toLowerCase() === formData.value.prodName.toLowerCase()) {
                // 调用实际删除函数
                performDelete();
            } else {
                return '商品名稱錯誤，請重新輸入。';
            }
        },
    });
};

const performDelete = async () => {
    // try {
    // 在函数内部初始化 productId
    const productId = route.params.id;

    // 调用删除函数
    const response = await deleteProdById(productId);

    if (response.status === 204) {
        // 商品删除成功，弹出成功消息框
        await sweetalert.fire({
            icon: 'success',
            title: '成功',
            text: '商品已成功删除！',
            confirmButtonText: '確定',
        });

        router.push(`/cms/product`);

    } else {
        // 商品删除失败，弹出失败消息框
        await sweetalert.fire({
            icon: 'error',
            title: '失敗',
            text: '商品删除失敗，請重試或聯絡管理員。',
            confirmButtonText: '確定',
        });
    }
    // } catch (error) {
    //     console.error('删除時出錯', error);
    //     await sweetalert.fire({
    //         icon: 'error',
    //         title: '失敗',
    //         text: '商品删除失敗，請重試或聯絡管理員。',
    //         confirmButtonText: '確定',
    //     });
    // }
};

onMounted(() => {
    productId.value = route.params.id;
    fetchProductData();
});

const removeExistingImage = (index) => {
    imagesData.value.images.splice(index, 1);
};

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
    console.log(value);

    if (value) {
        formData.categoryId = value;
        console.log(formData.categoryId);
    }
}
const Changedate = (date1) => {
    console.log(date1);
    //formData.updateTime = date1;
    formData.updateTime = new Date(date1).toISOString();
    console.log(formData.updateTime);
}
const customOption = ref([]);

const props = defineProps({
    categoryId: {
        type: Number,
        default: 1
    }
})
let customOptions = [];
onBeforeMount(async () => {
    try {
        const categoryData = await reqGetCategory(props.categoryId)
        const data = categoryData.data;
        console.log(data)
        customOptions = mapArr([data])
        customOption.value = customOptions;
        console.log("customOptions", customOption.value);
    } catch (error) {
        console.error(error);
    }
});
const mapArr = (arr) => {
    if (arr.length > 0) {
        return arr.map(item => {
            return {
                value: item.id,
                label: item.categoryName,
                children: mapArr(item.children),
            }
        })
    } else {
        return null
    }
}

</script>
  
 
  
  
<style scoped>
.contain {
    padding-left: 50px;
}

.image-upload {
    padding-left: 50px;
}

.cascade {
    padding-left: 100px;
}

.dynamic {
    max-width: 70%;
    padding-left: 50px;
    padding-top: 30px;

}

.time {
    max-width: 50%;
    padding-left: 50px;
    padding-top: 30px;
}

.editor {
    padding-left: 50px;
    padding-top: 30px;
}

.editor textarea {
    width: 90%;
    /* 设置宽度为100%（适应父元素宽度） */
    height: 200px;
    /* 设置高度，可以根据需要调整 */
    resize: vertical;
    /* 允许垂直调整大小，可选的值还有'horizontal'或'both' */

}

.image-preview img {
    max-width: 200px;
    /* 设置最大宽度 */
    max-height: 200px;
    /* 设置最大高度 */
}

.button {
    padding-top: 30px;
    padding-left: 50px;
}

.error-message {
    color: red;
}
</style>
  