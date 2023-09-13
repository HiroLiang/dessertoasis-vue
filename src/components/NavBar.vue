<script setup>
import { ref, onMounted } from "vue";
import { reqSignOut, reqUserPermission } from "../api";
import { useRouter } from 'vue-router';
import { googleLogout } from 'vue3-google-login';

const storedData = localStorage.getItem('googleLoginData');
const isGoogleLoggedIn = localStorage.getItem('googleLoggedIn');

if (isGoogleLoggedIn === 'true' && storedData) {
    // 用户已登录，将存储的数据转换回对象
    const loginData = JSON.parse(storedData);
    // 使用 loginData 进行其他操作
} else {
    // 用户未登录或数据不存在
}

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




const isLogin = ref(false);
const isAdmin = ref(false);
const isTeacher = ref(false);

// 頁面載入取得會員權限
onMounted(async () => {
    try {
        const response = await reqUserPermission();

        // 根據會員權限做條件判斷
        const permission = response.data;
        isLogin.value = permission === "User is an admin" || permission === "User is a teacher" || permission === "User is a regular user";
        isAdmin.value = permission === "User is an admin";
        isTeacher.value = permission === "User is a teacher";

        // console.log(isLogin.value)
        // console.log(isAdmin.value)
        // console.log(isTeacher.value)


    } catch (error) {
        console.error('權限取得失敗：', error);
    }
});





// 登出
async function logout() {

    // 清除前端的Cookie
    // 調用函数以删除所有cookie
    deleteAllCookies();
    try {
        localStorage.clear();
        // 清除後端session
        await reqSignOut();
        // 登出成功
        alert("登出成功");
        router.push({ name: 'logIn' });
        console.log('登出成功');
    } catch (error) {
        // 登出失敗
        console.error('登出失败：', error);
    }
}

//删除所有cookie
function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
}



</script>


<template>
    <div style="width: 100%; height: 56px"></div>
    <nav class="navbar navbar-expand-lg bg-light fixed-top">
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
                        <router-link to="/cart" class="dropdown-item">購物車</router-link>
                    </li>
                    <li>
                        <router-link to="/demo" class="dropdown-item">Demo</router-link>
                    </li>
                    <li v-if="!isLogin && !isGoogleLoggedIn">
                        <router-link to="/logIn" class="dropdown-item">會員登入</router-link>
                    </li>
                    <li v-else>
                        <router-link to="/mem" class="dropdown-item">會員資料</router-link>
                    </li>
                    <li v-if="isAdmin">
                        <router-link to="/cms" class="dropdown-item">後台管理</router-link>
                    </li>
                    <li v-if="isTeacher">
                        <router-link to="/cms" class="dropdown-item">我的課程</router-link>
                    </li>
                    <li v-if="isLogin">
                        <button class="dropdown-item" @click="logout">登出</button>
                    </li>
                    <li v-if="isGoogleLoggedIn">
                        <button class="dropdown-item" @click="logout">google登出</button>
                    </li>
                    <!-- 如果非登入，只顯示會員登入 
                         如果登入後，一定會顯示登出，且依照不同權限顯示不同畫面
                         管理者 會顯示後台管理
                         教師   會顯示我的課程-->
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
