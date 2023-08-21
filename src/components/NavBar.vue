<script setup lang="ts">
const props = defineProps({
    ProfilePicture: {
        type: String,
        default: 'user-interface.png'
    },
    NavBarList: {
        default: [
            { title: '食譜', toUrl: '/recipes' },
            { title: '課程', toUrl: '/course' },
            { title: '商品', toUrl: '/products' }
        ]
    }
});
</script>
<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">Dessert Oasis</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link active" aria-current="page" to="/">首頁</router-link>
                    </li>
                    <li v-for="navTitle in props.NavBarList" class="nav-item">
                        <router-link :to="navTitle.toUrl" class="nav-link">{{ navTitle.title }}</router-link>
                    </li>
                </ul>
                <span class="loginIcon">
                    <router-link to="/signin">
                        <img :src="`/images/navbar/${props.ProfilePicture}`" alt="ProfilePicture">
                    </router-link>
                </span>
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

.loginIcon img {
    width: 32px;
    height: 32px;
    border-radius: 16px;
}
</style>