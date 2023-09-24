<script setup>
import { ref, onMounted } from 'vue';
import { reqSession, reqMemberBank } from '@/api';

const memberId = ref("");

const bankCodeName = ref("");
const branchName = ref("");
const bankAccount = ref("");

onMounted(async () => {
    try {
        const sessionResponse = await reqSession();
        const sessionData = sessionResponse.data;

        memberId.value = sessionData.id;
        // console.log("我是" + memberId.value);
        const responseBank = await reqMemberBank(memberId.value);

        // memberMdData.value = responseBank.data;
        bankCodeName.value = responseBank.data.bankCodeName
        branchName.value = responseBank.data.branchName
        bankAccount.value = responseBank.data.bankAccount


    } catch (error) {
        console.error('獲取會員失敗：', error);
    }
});
</script>
<template>
    <form class="file-upload">
        <div class="row mb-5 gx-5">

            <div class="mb-5 mb-xxl-0">
                <div class="bg-secondary-soft px-4 py-5 rounded">
                    <div class="row g-3">
                        <h4 class="mb-4 mt-0">銀行帳戶資料</h4>

                        <div class="col-md-6">
                            <label class="form-label" for="bankName">銀行代號</label>
                            <input type="text" class="form-control" id="bankCode" v-model="bankCodeName">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label" for="branchName">分行名稱</label>
                            <input type="text" class="form-control" id="branchName" v-model="branchName">
                        </div>

                        <div class="">
                            <label class="form-label" for="accountNumber">銀行帳戶帳號</label>
                            <input type="text" class="form-control" id="accountNumber" v-model="bankAccount">
                        </div>




                        <div class="text-center">
                            <button type="button" class="btn btn-primary btn-lg mt-5">更新</button>

                        </div>








                    </div>
                </div>
            </div>

        </div>
    </form>
</template>




<style scoped>
button {
    margin: auto 15px;
}
</style>