<template>
    <div>
        <p>Member Status: {{ memberStatus }}</p>
        <button @click="changeStatus">Change Status</button>
        <router-link to="/">回到首頁</router-link>
    </div>
</template>
    
<script setup>


import { ref } from 'vue';
import { useRouter } from 'vue-router';

const memberStatus = ref('INACTIVE');

const changeStatus = () => {
    if (memberStatus.value === 'INACTIVE') {
        memberStatus.value = 'ACTIVE '
    } else {
        memberStatus.value = 'ACTIVE '
    }
}

</script>
  