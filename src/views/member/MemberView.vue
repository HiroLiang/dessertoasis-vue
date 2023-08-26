<script setup>
import NavBar from '@/components/NavBar.vue';
import InfoBar from '@/components/InfoBar.vue';
</script>


<template >
    <NavBar></NavBar>

    <div class="container">
        <div class="row">
            <div class="col-12">
                <InfoBar />

                <router-view></router-view>

            </div>
        </div>
    </div>
</template>


<style scope></style>