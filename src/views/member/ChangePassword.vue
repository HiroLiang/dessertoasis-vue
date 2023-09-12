<script setup>
import { ref } from 'vue';
import { reqChangepassword } from '../../api'; // 請替換成實際的導入路徑

const account = ref('');
const oldPassword = ref('');
const newPassword = ref('');
const newAgainPassword = ref('');
const passwordUpdated = ref(false);

const handleSubmit = async () => {
    if (newPassword.value === newAgainPassword.value) {
        try {
            await reqChangepassword(account.value, oldPassword.value, newPassword.value);
            // 密碼更新成功，設置密碼更新狀態為 true
            passwordUpdated.value = true;
        } catch (error) {
            // 密碼更新失敗
            console.error('密碼更新失敗:', error);
        }
    } else {
        // 兩次輸入的密碼不相同
        console.error('兩次輸入的密碼不相同');
    }
};
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <div class="row mb-5 gx-5">
            <div class="mb-5 mb-xxl-0">
                <div class="bg-secondary-soft px-4 py-5 rounded">
                    <div class="row g-3">
                        <h4 class="mb-4 mt-0">更改密碼</h4>

                        <div class="col-md-6">
                            <label class="form-label" for="prePassword">舊密碼</label>
                            <input type="password" class="form-control" id="prePassword" v-model="oldPassword" />
                        </div>

                        <div class="col-md-6">
                            <label class="form-label" for="newPassword">新密碼</label>
                            <input type="password" class="form-control" id="newPassword" v-model="newPassword" />
                        </div>

                        <div class="col-md-6">
                            <label class="form-label" for="newAgainPassword">再次輸入新密碼</label>
                            <input type="password" class="form-control" id="newAgainPassword" v-model="newAgainPassword" />
                        </div>

                        <div class="text-center">
                            <button type="submit" class="btn btn-primary btn-lg mt-5">更新密碼</button>
                            <button type="button" class="btn btn-danger btn-lg mt-5">刪除帳號</button>
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