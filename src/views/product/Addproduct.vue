<template>
    <n-space vertical>
        <!--<n-space>
            <n-space>
                <n-switch v-model:value="checkStrategyIsChild" />Child Check Strategy
            </n-space>
            <n-space><n-switch v-model:value="cascade" />Cascade</n-space>
            <n-space><n-switch v-model:value="showPath" />Show Path</n-space>
            <n-space><n-switch v-model:value="hoverTrigger" />Hover Trigger</n-space>
            <n-space><n-switch v-model:value="filterable" />Filterable</n-space>
            <n-space>
                <n-switch v-model:value="responsiveMaxTagCount" />Responsive MaxTagCount
            </n-space>
            <n-space>
                <n-switch v-model:value="clearFilterAfterSelect" />clearFilterAfterSelect
            </n-space>
        </n-space>-->
        <n-cascader v-model:value="value" multiple clearable placeholder="没啥用的值"
            :max-tag-count="responsiveMaxTagCount ? 'responsive' : undefined"
            :expand-trigger="hoverTrigger ? 'hover' : 'click'" :options="options" :cascade="cascade"
            :check-strategy="checkStrategyIsChild ? 'child' : 'all'" :show-path="showPath" :filterable="filterable"
            :clear-filter-after-select="clearFilterAfterSelect" @update:value="handleUpdateValue" />
    </n-space>
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
</template>
  
<script setup>
import { ref } from "vue";
import { NSpace, NSwitch, NCascader } from 'naive-ui';

const checkStrategyIsChild = ref(false);
const cascade = ref(false);
const showPath = ref(true);
const hoverTrigger = ref(true);
const value = ref(null);
const filterable = ref(true);
const responsiveMaxTagCount = ref(false);
const clearFilterAfterSelect = ref(true);
const options = getOptions();

function getOptions(depth = 3, iterator = 1, prefix = "") {
    const length = 12;
    const options = [];
    for (let i = 1; i <= length; ++i) {
        if (iterator === 1) {
            options.push({
                value: `v-${i}`,
                label: `l-${i}`,
                disabled: i % 5 === 0,
                children: getOptions(depth, iterator + 1, "" + String(i))
            });
        } else if (iterator === depth) {
            options.push({
                value: `v-${prefix}-${i}`,
                label: `l-${prefix}-${i}`,
                disabled: i % 5 === 0
            });
        } else {
            options.push({
                value: `v-${prefix}-${i}`,
                label: `l-${prefix}-${i}`,
                disabled: i % 5 === 0,
                children: getOptions(depth, iterator + 1, `${prefix}-${i}`)
            });
        }
    }
    return options;
}

const handleUpdateValue = (value, options) => {
    console.log(value, options);
};
</script>