<script setup>
import { ref } from 'vue';


const items = [
    {
        url: '#home',
        name: 'Home'
    },
    {
        url: '#about',
        name: 'About',
        children: [
            {
                url: '#service1',
                name: 'Service1'
            },
            {
                url: '#service2',
                name: 'Service2'
            },
            {
                url: '#service3',
                name: 'Service3'
            },
        ]
    },
    {
        url: '#service',
        name: 'Service',
        children: [
            {
                url: '#service1',
                name: 'Service1'
            },
            {
                url: '#service2',
                name: 'Service2'
            },
            {
                url: '#service3',
                name: 'Service3'
            },
        ]
    },
    {
        url: '#contact',
        name: 'Contact'
    }
];
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
                <li v-for="item in items" :key="item.name">
                    <a v-if="!item.children" :href="item.url">{{ item.name }}</a>
                    <span v-else @mouseover="openDropdown(item.name)" @mouseleave="closeDropdown">
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
    width: 100%;
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
    color: #fff;
    text-decoration: none;
}

#nav>ul>li>span {
    position: relative;
    display: block;
    height: auto;
    padding: 20px;
    color: #fff;
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
    width: 250px;
    border-bottom: 1px solid #fff;
}

.dropdownSelector li a {
    display: block;
    padding: 10px;
    color: #fff;
    text-decoration: none;
}

.isOpen {
    display: block;
    z-index: 99;
}
</style>