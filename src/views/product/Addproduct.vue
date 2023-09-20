<template>
    <div class="contain">
        <form>
            <div class="cascader">
                <h5><strong>請選擇分類</strong></h5>

                <n-space>
                    <n-cascader v-model:value="selectedValue" @update:value="handleCascaderChange" clearable
                        placeholder="所有商品" :max-tag-count="settings.responsiveMaxTagCount ? 'responsive' : undefined"
                        :expand-trigger="settings.hoverTrigger ? 'hover' : 'click'" :options="customOption"
                        :show-path="true" :filterable="settings.filterable"
                        :clear-filter-after-select="settings.clearFilterAfterSelect" size="large" />
                </n-space>
            </div>




            <p></p>
            <div class="image-upload">
                <h5><strong>新增圖片</strong></h5>
                <input type="file" @change="addImage" accept="image/*" multiple />
                <div v-for="(image, index) in imagesData.images" :key="index" class="uploaded-item">
                    <div class="image-preview">
                        <img :src="image.url" alt="Uploaded Image" />
                        <button @click="removeImage(index)">刪除</button>
                    </div>
                </div>
            </div>

            <!-- <div class="video-upload">
            <p>新增影片</p>
            <input type="file" @change="addVideo" accept="video/*" />
            <div v-for="(video, index) in videos" :key="index" class="uploaded-item">
                <video controls>
                    <source :src="video.url" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <button @click="removeVideo(index)">刪除</button>
            </div>
        </div> -->

            <div class="dynamic">
                <h5><strong>商品名稱</strong></h5>
                <input v-model="formData.prodName" required />
                <div class="error-message" v-if="showErrors && !formData.prodName">
                    *商品名稱是必填項目
                </div>
            </div>


            <div class="time">
                <h5><strong>上架時間</strong></h5>
                <h6>未填寫則預設為當前時間</h6>

                <n-date-picker v-model="formData.updateTime" type="datetime" clearable />

                <!--<pre>{{ JSON.stringify(startTimestamp) }}</pre>-->
            </div>
            <div class="dynamic">
                <h5><strong>價錢</strong></h5>
                <input v-model.number="formData.prodPrice" type="number" required />
                <div class="error-message" v-if="showErrors && !formData.prodPrice">
                    *價錢是必填項目
                </div>
            </div>

            <div class="dynamic">
                <h5><strong>庫存</strong></h5>
                <input v-model.number="formData.prodStock" type="number" />
                <!-- <div class="error-message" v-if="showErrors && !formData.prodStock">
                庫存是必填項目。
            </div> -->
            </div>

            <!-- <div class="editor">
            <CKEditor v-model="editorContent" @change="updateEditorContent" :config="editorConfig" />
        </div> -->
            <div class="editor">
                <h5><strong>商品描述</strong></h5>
                <textarea v-model="formData.prodDescription" rows="6"></textarea>
            </div>
            <div class="dynamic">
                <h5><strong>備註</strong></h5>
                <input v-model="formData.prodRemark" />
            </div>
            <div class="button">
                <button type="button" class="btn btn-success" @click.prevent="submitProduct">確認送出</button>
            </div>
            <!-- <button @click.prevent="submitProduct" :disabled="!isFormValid">確認送出</button> -->
            <!-- <div v-if="!formData.prodName" class="error-message">
            價錢是必填項目。
        </div>
        <div v-if="!formData.prodName" class="error-message">
            庫存是必填項目。
        </div> -->
        </form>
    </div>
</template>
  
<script setup>
import { ref, computed, onBeforeMount, watch, reactive } from "vue";
import { NSpace, NCascader } from 'naive-ui';
import CKEditor from '@/components/CKEditor.vue';
import { AddProduct, UploadProdImage, reqGetCategory } from '@/api/index.js';
import sweetalert from "SweetAlert2";
import { useRouter } from 'vue-router';

const router = useRouter();

const settings = {
    hoverTrigger: ref(true),
    //value: ref(null),
    selectedValue: ref(null),
    filterable: ref(true),
    clearFilterAfterSelect: ref(true),

};
const showErrors = ref(false);
const images = ref([]);
const videos = ref([]);
const prodName = ref("");

const prodPrice = ref(0);
const prodStock = ref(0);

const prodRemark = ref("");
const updateTime = ref(Date.now());
const prodDescription = ref("");
const selectedValue = ref(null);
// const editor = ref(null);
// const editorContent = ref('');
// const editorConfig = {
//     // 在这里配置 CKEditor 的选项，例如工具栏、插件等
// };
// watch(editorContent, (newContent) => {
//     formData.prodDescription = `<div>${newContent}</div>`;
//     console.log('editorContent:', newContent);
// });
// console.log(editorContent)

// const isFormValid = computed(() => {
//     return !!formData.prodName && !!formData.prodPrice; // 如果商品名稱存在，則表單有效
// });


const updateEditorContent = (newContent) => {
    console.log('updateEditorContent called with:', newContent);
    editorContent.value = newContent;
};

const handleCascaderChange = (value) => {
    console.log(value);
    formData.categoryId = value;
    console.log(formData.categoryId);
}
const formData = reactive({
    prodName: "",
    categoryId: 1,
    prodPrice: 0,
    prodStock: 0,
    prodRemark: "",
    updateTime: Date.now(),
    prodDescription: '',
});

const imagesData = ref({
    images: []
});

function addImage(event) {
    console.log('addImage function called');
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = URL.createObjectURL(file);
        imagesData.value.images.push({ url, file });
        console.log("imagesData.images", imagesData.value.images);
    }
}

function removeImage(index) {
    console.log('Removing image at index:', index);
    imagesData.value.images.splice(index, 1);
    console.log('Images after removal:', imagesData.value.images);
}


// function addVideo(event) {
//     const file = event.target.files[0];
//     const url = URL.createObjectURL(file);
//     videos.value.push({ url });
// }

// function removeVideo(index) {
//     videos.value.splice(index, 1);
// }
async function submitProduct() {
    try {
        if (!formData.prodName || !formData.prodPrice) {
            // 如果有錯誤，顯示錯誤消息
            showErrors.value = true;
            return; // 不繼續提交表單
        }
        const productData = {
            product: {
                prodName: formData.prodName,
                //prodDescription: editorContent.value,
                prodDescription: formData.prodDescription,
                prodStock: parseInt(formData.prodStock), // 将字符串转换为整数
                prodPrice: parseInt(formData.prodPrice), // 将字符串转换为整数
                prodPurchase: parseInt(formData.prodPurchase), // 将字符串转换为整数
                updateTime: new Date(formData.updateTime).toISOString(), // 将日期时间转换为 ISO 格式字符串
                prodRemark: formData.prodRemark,
            },
            category: {
                id: formData.categoryId,
            },

        };
        console.log("productData", productData);
        const productResponse = await AddProduct(productData);

        console.log("productResponse", productResponse);
        const productId = productResponse.data;
        console.log("productId", productId);
        console.log("商品已成功上傳", productId);
        if (productResponse.status === 200) {
            // 商品成功添加，弹出成功消息框
            await sweetalert.fire({
                icon: 'success',
                title: '成功',
                text: '商品已成功新增！',
                confirmButtonText: '確定',
            });
            //router.push('/cms/addproduct');
            formData.prodName = "";
            formData.categoryId = 1;
            formData.prodPrice = 0;
            formData.prodStock = 0;
            formData.prodRemark = "";
            formData.updateTime = Date.now();
            formData.prodDescription = "";

        } else {

            await sweetalert.fire({
                icon: 'error',
                title: '失敗',
                text: '商品新增失敗，請重試或聯絡管理員。',
                confirmButtonText: '確定',
            });
        }

        const imageUploadPromises = imagesData.value.images.map(async (image, index) => {
            const imageFormData = new FormData();
            imageFormData.append("image", image.file);
            console.log("imageFormData", imageFormData);
            console.log("productId", productId);
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data" // 设置请求头
                }
            };

            const imageResponse = await UploadProdImage(productId, imageFormData, config);
            console.log(`圖片 ${index + 1} 已成功上傳`, imageResponse.data);
        });

        await Promise.all(imageUploadPromises);
        imagesData.value.images = [];
    } catch (error) {
        console.error("上傳圖片時有誤", error);
        await sweetalert.fire({
            icon: 'error',
            title: '失敗',
            text: '商品新增失败，請重試或聯絡管理員。',
            confirmButtonText: '確定',
        });
    }
}

const props = defineProps({
    categoryId: {
        type: Number,
        default: 1
    }
})

//const customOptions = [
// {
//     value: "v-1",
//     label: "烘焙食材",
//     children: [
//         {
//             value: "v-1-1",
//             label: "麵粉",
//         }
//     ]
// },
// {
//     value: "v-2",
//     label: "包裝材料",
//     children: [
//         {
//             value: "v-2-1",
//             label: "吐司袋、麵包袋",
//         }
//     ]
// },

//];
const customOption = ref([]);


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

const handleChange = (value) => {
    console.log(value);
}

const handleSearch = (value) => {
    console.log(value);
}

const handleSelect = (value) => {
    console.log(value);
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