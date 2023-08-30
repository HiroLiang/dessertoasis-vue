<template>
    <div>
        <p>Member Status: {{ memberStatus }}</p>
        <button @click="changeStatus">Change Status</button>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const memberStatus = ref('INACTIVE');
let memberId = null; // 初始化成 null

// 在組件 mount 時設定 memberId，假設 memberData 是您創建帳號後的回傳物件
onMounted(() => {
    memberId = memberData.memberId; // 假設 memberData 包含了創建帳號後的回傳數據
});

const changeStatus = async () => {
    try {
        const response = await axios.put('http://localhost:8080/member/changeStatus', {
            memberId: memberId, // 使用創建帳號的 memberId
            newStatus: 'ACTIVE',
        });

        if (response.data === 'success') {
            memberStatus.value = 'ACTIVE';
        }
    } catch (error) {
        console.error('Error changing status:', error);
    }
};
</script>
  