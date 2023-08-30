<script setup>
import { NSpace, NInput, NList, NListItem, NThing, NIcon, NButton, NImage, NRate, NAvatar } from 'naive-ui';
import { ref } from 'vue';

const items = ref([
    {
        icon: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
        title: '相见恨晚',
        content: `奋勇呀然后休息呀!\n完成你伟大的人生`,
        children: [
            {
                icon: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
                title: '相见恨晚1',
                content: `奋勇呀然后休息呀!\n完成你伟大的人生`
            },
            {
                icon: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
                title: '相见恨晚2',
                content: `奋勇呀然后休息呀!\n完成你伟大的人生`
            }
        ]
    },
    {
        icon: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
        title: '他在时间门外',
        content: '最新的打印机\n复制着彩色傀儡\n早上好我的罐头先生\n让他带你去被工厂敲击',
        children: [
            {
                icon: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
                title: '相见恨晚1',
                content: `奋勇呀然后休息呀!\n完成你伟大的人生`
            },
            {
                icon: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
                title: '相见恨晚2',
                content: `奋勇呀然后休息呀!\n完成你伟大的人生`
            }
        ]
    },
    {
        icon: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
        title: '他在时间门外',
        content: '最新的打印机\n复制着彩色傀儡\n早上好我的罐头先生\n让他带你去被工厂敲击',
        children: [
            {
                icon: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
                title: '相见恨晚1',
                content: `奋勇呀然后休息呀!\n完成你伟大的人生`
            },
            {
                icon: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
                title: '相见恨晚2',
                content: `奋勇呀然后休息呀!\n完成你伟大的人生`
            }
        ]
    }
]);

let newIcon = ref('https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg')
let newTitle = ref('相见恨晚33')
let newContent = ref('')

const sendMessage = () => {
    const newMessage = {
        icon: newIcon.value,
        title: newTitle.value,
        content: newContent.value,
        children: []
    };
    items.value.push(newMessage);
    newContent.value = ''
}

</script>

<template>
    <div class="container border">
        <div class="boardcontainer m-3">
            <n-space vertical>
                <n-input v-model:value="newContent" type="textarea" size="large" :autosize="{ minRows: 1 }" round
                    placeholder=" 請輸入回覆內容">

                    <template #suffix>
                        <n-button text @click="sendMessage">
                            <n-icon color="#0d1b2a" size="25">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 512 512">
                                    <path
                                        d="M473 39.05a24 24 0 0 0-25.5-5.46L47.47 185h-.08a24 24 0 0 0 1 45.16l.41.13l137.3 58.63a16 16 0 0 0 15.54-3.59L422 80a7.07 7.07 0 0 1 10 10L226.66 310.26a16 16 0 0 0-3.59 15.54l58.65 137.38c.06.2.12.38.19.57c3.2 9.27 11.3 15.81 21.09 16.25h1a24.63 24.63 0 0 0 23-15.46L478.39 64.62A24 24 0 0 0 473 39.05z"
                                        fill="currentColor"></path>
                                </svg>
                            </n-icon>
                        </n-button>

                    </template>
                </n-input>
                <hr>
                <div>newContent: {{ newContent }}</div>
            </n-space>
            <hr>
            <n-list hoverable>
                <n-list-item v-for="(item, index) in items" :key="index">
                    <div class="icon-title-container">
                        <a class="icon-container" href="">
                            <n-icon size="30">
                                <n-avatar round size="medium" :src="item.icon"></n-avatar>
                            </n-icon>
                        </a>
                        <n-thing size="large" :title="item.title">
                            <div class="content-with-line-breaks">{{ item.content }}</div>
                            <n-button class="reply-button" size="small" color="#0077b6" ghost text :key="index">
                                回覆
                            </n-button>
                        </n-thing>
                    </div>
                    <div class="rateContainer">
                        評價<n-rate clearable />
                    </div>

                    <n-list-item v-if="item.children" v-for="(child, childindex) in item.children" :key="childindex">
                        <div class="icon-title-container">
                            <a class="icon-container" href="">
                                <n-icon size="30">
                                    <n-avatar round size="medium" :src="child.icon"></n-avatar>
                                </n-icon>
                            </a>
                            <n-thing size="large" :title="child.title">
                                <div class="content-with-line-breaks">{{ child.content }}</div>
                            </n-thing>
                        </div>
                    </n-list-item>

                </n-list-item>
            </n-list>

        </div>
    </div>
</template>

<style scoped>
.content-with-line-breaks {
    white-space: pre-line;
}

.icon-title-container {
    display: flex;
    align-items: flex-start;
}

.icon-container {
    margin-right: 10px;
}

.reply-button {
    margin-top: 10px;
}

.rateContainer {
    align-items: self-end;
    text-align: right;
}
</style>