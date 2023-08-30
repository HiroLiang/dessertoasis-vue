<script setup>
import { NSpace, NInput, NList, NListItem, NThing, NTag, NIcon, NButton } from 'naive-ui';
import { ref } from 'vue';

const items = ref([
    {
        title: '相见恨晚',
        tags: ['暑夜', '晚春'],
        content: '奋勇呀然后休息呀<br>完成你伟大的人生',
        children: {
            title: '相见恨晚',
            tags: ['暑夜', '晚春'],
            content: '奋勇呀然后休息呀<br>完成你伟大的人生',
        }
    },
    {
        title: '他在时间门外',
        tags: ['环形公路', '潜水艇司机'],
        content: '最新的打印机<br>复制着彩色傀儡<br>早上好我的罐头先生<br>让他带你去被工厂敲击'
    }
]);

</script>

<template>
    <div class="container border">
        <div class="boardcontainer m-3">
            <n-space vertical>
                <n-input size="large" round placeholder="我的天啊">
                    <template #suffix>
                        <a href="">
                            <n-icon color="#0d1b2a" size="25">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 512 512">
                                    <path
                                        d="M473 39.05a24 24 0 0 0-25.5-5.46L47.47 185h-.08a24 24 0 0 0 1 45.16l.41.13l137.3 58.63a16 16 0 0 0 15.54-3.59L422 80a7.07 7.07 0 0 1 10 10L226.66 310.26a16 16 0 0 0-3.59 15.54l58.65 137.38c.06.2.12.38.19.57c3.2 9.27 11.3 15.81 21.09 16.25h1a24.63 24.63 0 0 0 23-15.46L478.39 64.62A24 24 0 0 0 473 39.05z"
                                        fill="currentColor"></path>
                                </svg>
                            </n-icon>
                        </a>

                    </template>
                </n-input>
            </n-space>
            <hr>
            <n-list hoverable clickable>
                <n-list-item v-for="(item, index) in items" :key="index">
                    <n-thing :title="item.title">
                        <template #description>
                            <n-space size="small" style="margin-top: 4px">
                                <n-tag :bordered="false" type="info" size="small" v-for="tag in item.tags">
                                    {{ tag }}
                                </n-tag>
                            </n-space>
                        </template>
                        {{ item.content }}
                    </n-thing>
                    <n-button size="tiny" color="#0077b6" ghost text :key="index">
                        回覆
                    </n-button>
                </n-list-item>
            </n-list>

        </div>
    </div>
</template>

<style></style>