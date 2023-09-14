<script setup>
import { ref, onMounted, reactive } from "vue"
import cmsTable from '../../components/Standard/Table.vue'
import { reqGetAllMembers, reqMember } from '@/api'

const tableDatas = ref([])
const selectedMember = ref(null);

onMounted(async () => {
    try {
        const response = await reqGetAllMembers();
        tableDatas.value = response.data;
    } catch (e) {
        console.error(e);
    }
});

const getId = async (id) => {
    try {
        const response = await reqMember(id); // 發送 GET 請求會員
        selectedMember.value = response.data;

        console.log("獲取到的會員詳細信息：", selectedMember.value);
    } catch (error) {
        console.error("失敗：", error);
    }
}

const title = reactive([
    { label: "會員編號", key: "id" },
    { label: "姓名", key: "fullName" },
    { label: "使用者名稱", key: "memberName" },
    { label: "帳號", key: "account" },
    { label: "Email", key: "email" },
    { label: "第三方授權Email", key: "emailForCode" },
    { label: "權限", key: "access" },
    { label: "狀態", key: "memberStatus" },
    { label: "創立時間", key: "signDate" },

])

</script>
<template >
    <cmsTable :dataTitles="title" :tableDatas="tableDatas" @get-edit-id="getId"></cmsTable>
</template>
<style scoped>
h2 {
    text-align: center;
}
</style>
