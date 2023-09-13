<template>
    <!-- <div class="container">
        <p>請選擇分類</p>
        <n-space>
            <n-cascader v-model:value="selectedValue" clearable placeholder="所有商品"
                :max-tag-count="settings.responsiveMaxTagCount ? 'responsive' : undefined"
                :expand-trigger="settings.hoverTrigger ? 'hover' : 'click'" :options="customOptions" :show-path="true"
                :filterable="settings.filterable" :clear-filter-after-select="settings.clearFilterAfterSelect"
                size="large" />
        </n-space>
    </div> -->
    <form>
        <div class="container">

            <p></p>
            <div class="image-upload">
                <p>新增縮圖</p>
                <input type="file" @change="addThumbnail" accept="image/*" />
                <div v-if="thumbnailData.url" class="uploaded-item">
                    <img :src="thumbnailData.url" alt="Uploaded Thumbnail" />
                    <button @click="removeThumbnail">刪除</button>
                </div>
            </div>
            <div class="image-upload">
                <p>新增圖片</p>
                <input type="file" @change="addImage" accept="image/*" multiple />
                <div v-for="(image, index) in imagesData.images" :key="index" class="uploaded-item">
                    <img :src="image.url" alt="Uploaded Image" />
                    <button @click="removeImage(index)">刪除</button>
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
        </div>
        <div class="dynamic">
            <p>商品名稱</p>
            <input v-model="formData.prodName" />
        </div>

        <div class="time">
            <p>上架時間</p>
            <n-date-picker v-model="formData.updateTime" type="datetime" clearable />
            <!--<pre>{{ JSON.stringify(startTimestamp) }}</pre>-->
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
            <CKEditor v-model="formData.prodDescription" />
        </div>
        <div class="dynamic">
            <p>備註</p>
            <input v-model="formData.prodRemark" />
        </div>
        <button @click.prevent="submitProduct">確認送出</button>
    </form>
</template>
  
<script setup>
import { ref, computed } from "vue";
import { NSpace, NCascader } from 'naive-ui';
import CKEditor from '@/components/CKEditor.vue';
import { AddProduct, UploadProdImage } from '@/api/index.js';
// const customOptions = [
//     {
//         value: "v-1",
//         label: "烘焙食材",
//         children: [
//             {
//                 value: "v-1-1",
//                 label: "麵粉",
//             }
//         ]
//     },
//     {
//         value: "v-2",
//         label: "包裝材料",
//         children: [
//             {
//                 value: "v-2-1",
//                 label: "吐司袋、麵包袋",
//             }
//         ]
//     },

// ];
// const settings = {
//     hoverTrigger: ref(true),
//     //value: ref(null),
//     selectedValue: ref(null),
//     filterable: ref(true),
//     clearFilterAfterSelect: ref(true),
// };

//const images = ref([]);
// const videos = ref([]);
// const prodName = ref("");

// const prodPrice = ref(0);
// const prodStock = ref(0);

// const prodRemark = ref("");
// const updateTime = ref(Date.now());
// const prodDescription = ref('<div>Initial content</div>');

const formData = {
    prodName: "",
    prodPrice: 0,
    prodStock: 0,
    prodRemark: "",
    updateTime: Date.now(),
    prodDescription: '<div></div>',
};

const imagesData = {
    images: [],
};
const thumbnailData = ref({
    file: null, // 縮圖文件
    url: ""     // 縮圖的URL

});
function addImage(event) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = URL.createObjectURL(file);
        imagesData.images.push({ url, file });
    }
}

function removeImage(index) {
    imagesData.images.splice(index, 1);
}
function addThumbnail(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    thumbnailData.url = url;
    thumbnailData.file = file;

}

function removeThumbnail() {
    thumbnailData.url = "";
    thumbnailData.file = null;
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
        const productData = {
            prodName: formData.prodName,
            prodPrice: formData.prodPrice,
            prodStock: formData.prodStock,
            prodRemark: formData.prodRemark,
            updateTime: formData.updateTime,
            prodDescription: formData.prodDescription,
        };

        const productResponse = await AddProduct(productData);
        console.log("productResponse", productResponse);
        const productId = productResponse.data;
        console.log("productId", productId);
        console.log("商品已成功上傳", productId);

        // 检查是否存在縮圖
        if (thumbnailData.file) {
            const thumbnailFormData = new FormData();
            thumbnailFormData.append("image", thumbnailData.file);
            const thumbnailConfig = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            };

            const thumbnailResponse = await UploadProdImage(productId, thumbnailFormData, thumbnailConfig);
            console.log("縮圖已成功上傳", thumbnailResponse.data);
        }

        const imageUploadPromises = imagesData.images.map(async (image, index) => {
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

    } catch (error) {
        console.error("上傳圖片時有誤", error);
    }
}






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
</style>