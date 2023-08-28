<template>
    <div>
        <CustomCascader :options="customOptions" :hoverTrigger="hoverTrigger" :value="value" :filterable="filterable"
            :clearFilterAfterSelect="clearFilterAfterSelect" />
    </div>
</template>
  
<script setup>
import CustomCascader from "@/components/CustomCascader.vue";

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
    // ... 其他选项
];
const hoverTrigger = true; // 是否使用hover
const value = null; // 初始值
const filterable = true; // 是否可搜尋
const clearFilterAfterSelect = true; // 是否在選中後清除搜尋內容

</script>
