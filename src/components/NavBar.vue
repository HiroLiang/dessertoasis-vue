<script setup>
import { ref, onMounted } from "vue";
import { reqSignOut } from "../api"
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps({
    ProfilePicture: {
        type: String,
        default: "user-interface.png",
    },
    NavBarList: {
        default: [
            { title: "食譜", toUrl: "/recipes" },
            { title: "課程", toUrl: "/courses" },
            { title: "商品", toUrl: "/producthome" },
            { title: "預約甜點教室", toUrl: "/reservation" }
        ],
    },
});

const listPosition = ref("profile-list");

const removeListClass = () => {
    if (listPosition.value != "") {
        listPosition.value = "";
    } else {
        listPosition.value = "profile-list";
    }
};


const isLoginCookie = ref(false);
// 頁面啟動時 檢查cookies
onMounted(() => {
    setTimeout(() => {
        isLoginCookie.value = checkIsLoginCookie();
    }, 1000); //  1 後檢查 Cookie
});
//檢查cookies是否存在的方法
function checkIsLoginCookie() {
    const cookies = document.cookie.split('; ');
    let isLoginCookieExists = false;
    let isAdminCookieExists = false;

    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === 'isLogin') {
            isLoginCookieExists = true;
        }
        if (name === 'adminLogin') {
            isAdminCookieExists = true;
        }
    }
    console.log('isLoginCookieExists:', isLoginCookieExists);
    console.log('isAdminCookieExists:', isAdminCookieExists);
    return {

        isLogin: isLoginCookieExists,
        isAdmin: isAdminCookieExists,
    };
}




async function logout() {
    // 清除前端的 "isLogin" Cookie
    document.cookie = "isLogin; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    //傳回後端清除session
    try {
        await reqSignOut();
        // 登出成功
        isLoginCookie.value = false;
        alert("登出成功")
        router.push({ name: 'home' });
        console.log('登出成功');
    } catch (error) {
        // 登出失敗
        console.error('登出失败：', error);
    }
}


</script>

<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <button @click="removeListClass" class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <router-link class="navbar-brand" to="/">Dessert Oasis</router-link>
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link active" aria-current="page" to="/">首頁</router-link>
                    </li>
                    <li v-for="navTitle in props.NavBarList" class="nav-item">
                        <router-link :to="navTitle.toUrl" class="nav-link">{{
                            navTitle.title
                        }}</router-link>
                    </li>
                </ul>
            </div>
            <div class="dropdown">
                <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <img class="loginIcon" :src="`/images/navbar/${props.ProfilePicture}`" alt="ProfilePicture" />
                </a>
                <ul :class="`dropdown-menu ${listPosition}`" aria-labelledby="dropdownMenuLink">
                    <li>
                        <router-link to="/cms" class="dropdown-item">後台管理</router-link>
                    </li>
                    <li>
                        <router-link to="/cart" class="dropdown-item">購物車</router-link>
                    </li>
                    <li>
                        <router-link to="/demo" class="dropdown-item">Demo</router-link>
                    </li>
                    <li v-if="!isLoginCookie.isLogin">
                        <router-link to="/signIn" class="dropdown-item">會員登入</router-link>
                    </li>
                    <li v-else>
                    <li v-if="isLoginCookie.isAdmin || isLoginCookie.adminLogin === '1'">
                        <router-link to="/cms" class="dropdown-item">後台管理</router-link>
                    </li>
                    <li v-else>
                        <router-link to="/mem" class="dropdown-item">會員資料</router-link>
                    </li>
                    <li v-if="isLoginCookie.isLogin">
                        <button class="dropdown-item" @click="logout">登出</button>
                    </li>
                    </li>





                </ul>
            </div>
        </div>
    </nav>
</template>
<style scoped>
.loginIcon {
    width: 32px;
    height: 32px;
    border-radius: 16px;
}

.profile-list {
    transform: translateX(-110px) translateY(8px);
}
</style>
