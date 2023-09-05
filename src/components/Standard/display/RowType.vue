<script setup>

const emit = defineEmits(['get-selected-display'])

const props = defineProps({
    product: {
        default: {
            picture: 'product/prod.jpg',
            name: '鐵臂阿童木',
            description: '《原子小金剛》（日語：鉄腕アトム）是一套科幻漫畫作品，也是日本漫畫界一代宗師手塚治虫的首部長篇連載作品，於1952年至1968年首次於光文社的《少年》漫畫雜誌連載。',
            price: 3240
        }
    }
})
</script>
<template>
    <div class="displayArea">
        <img :src="`/images/display/${product.picture}`" alt="">
    </div>
</template>
<style scoped>
.displayArea {
    display: flex;
    align-content: space-between;
}
</style>