<script setup>
import { RouterLink } from "vue-router"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { NConfigProvider, NCollapse, NCollapseItem, darkTheme } from 'naive-ui'
</script>
<template>
    <div class="logo">
        <h1>Dessert Oasis</h1>
    </div>
    <div class="usingAccount">
        <div style="display: flex;align-items: center;">
            <font-awesome-icon :icon="['fab', 'github']" size="xl" style="color: #adcbff;" />
            <h2>Imei Huang</h2>
        </div>
        <div>
            <font-awesome-icon :icon="['far', 'paper-plane']" size="xl" style="color: #adcbff;" />
        </div>
    </div>
    <div class="options">
        <n-config-provider :theme="darkTheme">
            <n-collapse arrow-placement="right" accordion="true">
                <n-collapse-item title="會員管理" name="1">
                    <div>
                        <router-link to="/cms/member">member</router-link>
                    </div>
                    <div>
                        <router-link to="/cms/chat">chat</router-link>
                    </div>
                </n-collapse-item>
                <n-collapse-item title="食譜管理" name="2">
                    <div>
                        <router-link to="/cms/recipe">recipe</router-link>
                    </div>

                </n-collapse-item>
                <n-collapse-item title="商品管理" name="3">
                    <div>
                        <router-link to="/cms/product">商品搜尋</router-link>
                    </div>
                    <div>
                        <router-link to="/cms/addproduct">新增商品</router-link>
                    </div>
                </n-collapse-item>
                <n-collapse-item title="課程管理" name="4">
                    <div>
                        <router-link to="/cms/course">course</router-link>
                    </div>
                    <div>
                        <router-link to="/cms/addCourse">新增課程</router-link>
                    </div>
                    <div>
                        <router-link to="/cms/addteacherProfile">新增教師個人介紹</router-link>
                    </div>
                    <div>
                        <router-link to="/cms/teacherCourseManager">教師個人課程管理</router-link>
                    </div>
                </n-collapse-item>
                <n-collapse-item title="訂單管理" name="5">
                    <div>真棒</div>
                </n-collapse-item>
            </n-collapse>
        </n-config-provider>
    </div>
</template>
<style scoped>
h1 {
    font-size: 24px;
    color: #dddddd;
}

h2 {
    font-size: 18px;
    color: #dddddd;
    margin: 0 0 0 5px;
}

.logo {
    display: flex;
    border-bottom: 2px double #dddddd;
}

.usingAccount {
    height: 50px;
    padding-left: 10px;
    padding-right: 10px;
    border-bottom: 2px double #dddddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.usingAccount img {
    width: 32px;
    height: 32px;
}

.options div {}

.options a {
    width: 100%;
    color: #dddddd;
    display: block;
    text-decoration: none;
    padding-left: 20px;
}
</style>