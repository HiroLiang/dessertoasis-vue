<template>
    <div class="container">
        <p>請選擇分類</p>
        <n-space>
            <n-cascader v-model:value="selectedValue" clearable placeholder="所有商品"
                :max-tag-count="settings.responsiveMaxTagCount ? 'responsive' : undefined"
                :expand-trigger="settings.hoverTrigger ? 'hover' : 'click'" :options="customOptions" :show-path="true"
                :filterable="settings.filterable" :clear-filter-after-select="settings.clearFilterAfterSelect"
                size="large" />
        </n-space>
    </div>
    <div class="container">

        <p>新增圖片和影片</p>
        <div class="image-upload">
            <p>新增圖片</p>
            <input type="file" @change="addImage" accept="image/*" />
            <div v-for="(image, index) in images" :key="index" class="uploaded-item">
                <img :src="image.url" alt="Uploaded Image" />
                <button @click="removeImage(index)">刪除</button>
            </div>
        </div>
        <div class="video-upload">
            <p>新增影片</p>
            <input type="file" @change="addVideo" accept="video/*" />
            <div v-for="(video, index) in videos" :key="index" class="uploaded-item">
                <video controls>
                    <source :src="video.url" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <button @click="removeVideo(index)">刪除</button>
            </div>
        </div>
    </div>
    <div class="dynamic">
        <p>請建立規格</p>
        <n-dynamic-input v-model:value="customValue" :on-create="onCreate">
            <template #create-button-default>
                請建立規格
            </template>
            <template #default="{ value }">
                <div style="display: flex; align-items: center; width: 100%">
                    <p>規格名稱</p>
                    <n-input v-model:value="value.string" type="text" style="margin-right:12px;width:300px" />
                    <p>價格</p>
                    <n-input-number v-model:value="value.price" style="margin-right: 12px; width: 100px" />
                    <p>數量</p>
                    <n-input-number v-model:value="value.quantity" style="margin-right: 12px; width: 100px" />
                </div>
            </template>
        </n-dynamic-input>
        <!--<pre>{{ JSON.stringify(customValue, null, 2) }}</pre>-->
    </div>

    <div class="time">
        <p>上架時間</p>
        <n-date-picker v-model:value="startTimestamp" type="datetime" clearable />
    </div>
    <div class="time">
        <p>下架時間</p>
        <n-date-picker v-model:value="endTimestamp" type="datetime" clearable />
        <!--<pre>{{ JSON.stringify(timestamp) }}</pre>-->
    </div>
    <div>
        <p>商品介紹</p>
        <CKEditor v-model="editorData" />
    </div>
</template>
  
<script setup>
import { ref, computed } from "vue";
import { NSpace, NCascader } from 'naive-ui';
import CKEditor from '@/components/CKEditor.vue';
const customOptions = [
    {
        value: "v-1",
        label: "烘焙食材",
        children: [
            {
                value: "v-1-1",
                label: "麵粉",
            }
        ]
    },
    {
        value: "v-2",
        label: "包裝材料",
        children: [
            {
                value: "v-2-1",
                label: "吐司袋、麵包袋",
            }
        ]
    },

];
const settings = {
    hoverTrigger: ref(true),
    //value: ref(null),
    selectedValue: ref(null),
    filterable: ref(true),
    clearFilterAfterSelect: ref(true),
};

const images = ref([]);
const videos = ref([]);

function addImage(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    images.value.push({ url });
}

function removeImage(index) {
    images.value.splice(index, 1);
}

function addVideo(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    videos.value.push({ url });
}

function removeVideo(index) {
    videos.value.splice(index, 1);
}

const selectedCategoryProductTypes = computed(() => {
    return productTypes.value.filter(type => type.categoryId === selectedCategory.value);
});
const customValue = ref([
    {
        isCheck: true,
        num: 1,
        string: "一个字符串",
        price: 10, // 添加 price 字段
        quantity: 5 // 添加 quantity 字段
    }
]);

const onCreate = () => {
    return {
        isCheck: false,
        num: 1,
        string: "一个字符串",
        price: 0, // 默认价格
        quantity: 0 // 默认数量
    };
};

const startTimestamp = ref(Date.now());
const endTimestamp = ref(118313526e4);
const editorData = ref('<p>Initial content</p>');
</script>

<style scoped>
.dynamic {
    max-width: 50%;

}

.time {
    max-width: 50%;
}
</style>