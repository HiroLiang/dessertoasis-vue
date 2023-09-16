<script setup>
import { ref } from 'vue';


const props = defineProps({
    items: {
        default: [
            {
                url: '#/recipes/ToSomerecipe',
                name: '全部食譜'
            },
            {
                url: '#about',
                name: '麵包',
                children: [
                    {
                        url: '#service1',
                        name: '吐司'
                    },
                    {
                        url: '#service2',
                        name: '甜麵包'
                    },
                    {
                        url: '#service3',
                        name: '鹹麵包'
                    },
                    {
                        url: '#service3',
                        name: '貝果'
                    },
                    {
                        url: '#service3',
                        name: '披薩'
                    }
                ]
            },
            {
                url: '#service',
                name: '甜點',
                children: [
                    {
                        url: '#service1',
                        name: '蛋糕'
                    },
                    {
                        url: '#service2',
                        name: '餅乾'
                    },
                    {
                        url: '#service3',
                        name: '塔派類'
                    },
                    {
                        url: '#service3',
                        name: '免烤箱'
                    },
                    {
                        url: '#service3',
                        name: '布丁'
                    },
                    {
                        url: '#service3',
                        name: '冰淇淋'
                    },
                    {
                        url: '#service3',
                        name: '泡芙'
                    },
                ]
            },
            {
                url: '#service',
                name: '食材',
                children: [
                    {
                        url: '#service1',
                        name: '檸檬'
                    },
                    {
                        url: '#service2',
                        name: '肉桂'
                    },
                    {
                        url: '#service3',
                        name: '巧克力'
                    },
                ]
            },
            {
                url: '#contact',
                name: '難易度',
                children: [
                    {
                        url: '#service1',
                        name: '簡單'
                    },
                    {
                        url: '#service1',
                        name: '中等'
                    },
                    {
                        url: '#service1',
                        name: '困難'
                    },
                ]

            }
        ]
    }
})
const openedDropdown = ref('');

const openDropdown = (name) => {
    openedDropdown.value = name;
    console.log(openedDropdown.value);

};

const closeDropdown = () => {
    openedDropdown.value = null;
};



</script>

<template>
    <header>
        <nav id="nav">
            <ul>
                <li v-for="item in items" :key="item.name" class="dropdownContainer">
                    <a v-if="!item.children" :href="item.url">{{ item.name }}</a>
                    <span class="ml-3" v-else @mouseover="openDropdown(item.name)" @mouseleave="closeDropdown">
                        {{ item.name }}
                        <ul class="dropdownSelector dropdown" :class="{ isOpen: openedDropdown === item.name }">
                            <li v-for="child in item.children" :key="child.name">
                                <a :href="child.url">{{ child.name }}</a>
                            </li>
                        </ul>
                    </span>
                </li>
            </ul>
        </nav>
    </header>
</template> 
<style scoped>
header {
    width: 100%;
    background-color: #e9e7e7;
    border-top: 2px solid #bebebe;
    border-bottom: 2px solid #bebebe;
}

#nav {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 1280px;
    margin: 0 auto;
}

#nav>ul {
    display: flex;
    margin: 0;
    padding: 0;
    list-style-type: none;
}



#nav>ul>li>a {
    display: block;
    height: auto;
    padding: 20px;
    width: 130px;
    color: #151212;
    text-decoration: none;
}

#nav>ul>li:hover {
    background-color: #ccc;
    /* 設置父項被hover變色  */
}

/* 子菜单项的鼠标悬停样式 */
#nav>ul>li>span>ul>li:hover>a {
    background-color: #706e6e;
    /* 設置子項被hover變色 */

}

#nav>ul>li>span {
    position: relative;
    display: block;
    height: auto;
    padding: 20px 20px 20px 10px;
    width: 130px;
    color: #151212(0, 6%, 7%);
    text-decoration: none;
    cursor: pointer;
}

#nav>ul>li>span:after {
    content: '▼';
    display: inline-block;

}

.dropdownSelector {
    position: absolute;
    top: 100%;
    left: 0;
    display: none;
    padding: 0;
    list-style-type: none;
    background-color: rgb(173, 172, 172);

}

.dropdownSelector li {
    width: 180px;
    border-bottom: 1px solid #fff;
}

.dropdownSelector li a {
    display: block;
    padding: 10px;
    color: #ffffff;
    text-decoration: none;
}

.dropdownContainer {

    margin-left: 15px;
    margin-right: 15px;
}

.isOpen {
    display: block;
    z-index: 99;
}
</style>