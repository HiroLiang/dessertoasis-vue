<template>
    <div class="border rounded m-4 p-4">
        <h2>更新資訊</h2>
        <form @submit.prevent="updateMember">
            <div class="form-group">
                <label for="memberFullName">姓名</label>
                <input type="text" id="memberFullName" v-model="memberFullName" class="form-control" />
            </div>
            <div class="form-group">
                <label for="memberUserName">使用者名稱</label>
                <input type="text" id="memberUserName" v-model="memberUserName" class="form-control" />
            </div>
            <div class="form-group">
                <label for="memberEmail">Email</label>
                <input type="email" id="memberEmail" v-model="memberEmail" class="form-control" />
            </div>


            <div class="form-group">
                <label for="memberAccess">會員權限</label>
                <select id="memberAccess" v-model="memberAccess" class="form-control">

                    <option v-for="list in accessList" :value="list.item">{{ list.item }}</option>
                </select>
            </div>

            <div class="form-group">
                <label for="Status">會員狀態</label>
                <select id="Status" v-model="Status" class="form-control">

                    <option v-for="list in statusList" :value="list.item">{{ list.item }}</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary m-4">更新</button>
            <button type="button" @click="goBack" class="btn btn-secondary m-4">回上頁</button>

        </form>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { reqMember, requpdateMember, reqUpdateCmsMember } from '@/api';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const memberId = ref('');
const memberFullName = ref('');
const memberUserName = ref('');
const memberEmail = ref('');
const memberAccess = ref('');
const Status = ref('');
const accessList = [
    { val: "USER", item: 'USER' },
    { val: "ADMIN", item: 'ADMIN' },
    { val: "TEACHER", item: 'TEACHER' },
];

const statusList = [
    { val: "ACTIVE", item: 'ACTIVE' },
    { val: "INACTIVE", item: 'INACTIVE' },
    { val: "BANNED", item: 'BANNED' },
];
onMounted(async () => {
    try {
        const idFromRoute = route.query.id; // 从URL参数获取ID
        const response = await reqMember(idFromRoute);

        const memberData = response.data;

        // memberData.value = response.data;
        memberFullName.value = memberData.fullName;
        memberUserName.value = memberData.memberName
        memberEmail.value = memberData.email
        memberAccess.value = memberData.access


        Status.value = memberData.memberStatus
        console.log("=========================" + memberData.access);


    } catch (error) {
        console.error('獲取會員失敗：', error);
    }
});




const updateMember = async () => {
    try {
        const idFromRoute = route.query.id; // 從URL參數獲取ID

        // 準備要發送到後端的更新資料
        const updatedData = {
            fullName: memberFullName.value,
            memberName: memberUserName.value,
            email: memberEmail.value,
            access: memberAccess.value,
            memberStatus: Status.value
        };

        // 發送PUT請求到後端更新會員資訊
        const response = await reqUpdateCmsMember(idFromRoute, updatedData);

        // 更新成功後，可以導航回相應的頁面，這裡示例導航回會員列表頁面
        alert("更新成功")
        location.reload();
    } catch (error) {
        console.error('更新會員失敗：', error);
    }
};

const goBack = () => {
    router.go(-1); // 返回上一页
};
</script>
  