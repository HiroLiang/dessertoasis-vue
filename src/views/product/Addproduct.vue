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
        <p>商品名稱</p>
        <input name="">
        <p>請建立規格</p>
        <n-dynamic-input v-model:value="customValue" :on-create="onCreate">
            <template #create-button-default>
                請建立規格
            </template>
            <template #default="{ value }">
                <div style="display: flex; align-items: center; width: 100%">
                    <p>規格名稱</p>
                    <n-input v-model:value="value.string" type="text" style="margin-right:12px;width:450px" />
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
        <!--<pre>{{ JSON.stringify(startTimestamp) }}</pre>-->
    </div>

    <div class="editor">
        <p>商品描述</p>
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
//第一個新增規格
const customValue = ref([
    {
        isCheck: true,
        num: 1,
        string: "",
        price: 0, // 添加 price 字段
        quantity: 0 // 添加 quantity 字段
    }
]);
//按+後的新增規格
const onCreate = () => {
    return {
        isCheck: false,
        num: 1,
        string: "",
        price: 0,
        quantity: 0
    };
};

const startTimestamp = ref(Date.now());
//const endTimestamp = ref(118313526e4);
const editorData = ref('<p>Initial content</p>');
console.log("customValue:", customValue);

// onMounted(async () => {
//     let result = await reqGetCategory(id);
//     let dataResponse = result.data;
//     console.log(result);
//     pages.value = dataResponse.totalPages;

//     if (dataResponse && Array.isArray(dataResponse.content)) {

//         let datas = dataResponse.content;
//         datas.forEach(ele => {
//             ele.category = ele.category.categoryName;
//         });
//         tableDatas.value = datas;
//     } else {
//         console.error('Data from API is not in the expected format:', dataResponse);
//     }


// });

const productData = {
    prodName: '', // 从表单中获取商品名稱
    prodPrice: 0, // 从表单中获取價格
    prodStock: 0, // 从表单中获取數量
    prodSpecs: [] // 从表单中获取規格，可能是一个包含多个規格的数组
};

const saveProductToDatabase = async () => {
    try {
        // 创建一个包含商品数据的对象
        const product = {
            prodName: productData.prodName,
            prodPrice: productData.prodPrice,
            prodStock: productData.prodStock,
            prodSpecs: productData.prodSpecs
        };

        // 发送POST请求将商品数据发送到服务器保存
        const response = await axios.post('/api/saveProduct', product); // 替换成实际的API端点

        if (response.status === 200) {
            console.log('商品已成功保存到資料庫');
            // 清空表单数据或进行其他操作
        } else {
            console.error('保存商品到資料庫失败');
        }
    } catch (error) {
        console.error('保存商品到資料庫失败:', error);
    }
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
</style>