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
                <p>新增圖片</p>
                <input type="file" @change="addImage" accept="image/*" multiple />
                <div v-for="(image, index) in images" :key="index" class="uploaded-item">
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
            <input v-model="prodName" />
        </div>

        <div class="time">
            <p>上架時間</p>
            <n-date-picker v-model="startTimestamp" type="datetime" clearable />
            <!--<pre>{{ JSON.stringify(startTimestamp) }}</pre>-->
        </div>
        <div class="dynamic">
            <p>價錢</p>
            <input v-model.number="prodPrice" type="number" />
        </div>
        <div class="dynamic">
            <p>庫存</p>
            <input v-model.number="prodStock" type="number" />
        </div>

        <div class="editor">
            <p>商品描述</p>
            <CKEditor v-model="editorData" />
        </div>
        <div class="dynamic">
            <p>備註</p>
            <input v-model="prodRemark" />
        </div>
        <button @click="submitProduct">提交商品</button>
    </form>
</template>
  
<script setup>
import { ref, computed } from "vue";
import { NSpace, NCascader } from 'naive-ui';
import CKEditor from '@/components/CKEditor.vue';
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

const images = ref([]);
// const videos = ref([]);
const prodName = ref("");

const prodPrice = ref(0);
const prodStock = ref(0);

const prodRemark = ref("");

function addImage(event) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = URL.createObjectURL(file);
        images.value.push({ url, file });
    }
}

function removeImage(index) {
    images.value.splice(index, 1);
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
    const formData = new FormData();
    formData.append("prodName", prodName.value);
    formData.append("prodStock", prodStock.value);
    formData.append("prodPrice", prodPrice.value);
    formData.append("prodRemark", prodRemark.value);
    //formData.append("updateTime", updateTime.value);

    for (let i = 0; i < images.value.length; i++) {
        formData.append("images", images.value[i].file);
    }

    try {
        const response = await axios.post("/product/add", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("商品已成功上传", response.data);
    } catch (error) {
        console.error("上传商品时出错", error);
    }
}

const startTimestamp = ref(Date.now());
const editorData = ref('<p>Initial content</p>');



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