<template>
    <n-tree block-line cascade checkable :data="data" :default-expanded-keys="defaultExpandedKeys"
        :default-checked-keys="defaultCheckedKeys" @update:checked-keys="updateCheckedKeys" />
</template>
  
<script>
import { defineComponent, ref } from "vue";
import { repeat } from "seemly";

function createData(level = 4, baseKey = "") {
    if (!level)
        return undefined;
    return repeat(6 - level, undefined).map((_, index) => {
        const key = "" + baseKey + level + index;
        return {
            label: createLabel(level),
            key,
            children: createData(level - 1, key)
        };
    });
}

function createLabel(level) {
    if (level === 4)
        return "道生一";
    if (level === 3)
        return "一生二";
    if (level === 2)
        return "二生三";
    if (level === 1)
        return "三生万物";
    return "";
}

export default defineComponent({
    setup() {
        const data = createData();
        const defaultExpandedKeys = ref(["40", "4030", "403020"]);
        const defaultCheckedKeys = ref(["40302010"]);

        const updateCheckedKeys = (keys, options, meta) => {
            console.log("updateCheckedKeys", keys, options, meta);
        };

        return {
            data,
            defaultExpandedKeys,
            defaultCheckedKeys,
            updateCheckedKeys
        };
    }
});
</script>
  