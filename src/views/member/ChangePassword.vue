<script setup>
import { ref } from 'vue';
import { reqChangepassword } from '../../api';

const oldPassword = ref('');
const newPassword = ref('');
const newAgainPassword = ref('');
const successMessage = ref('');
const passwordsDoNotMatch = ref(false);

const handleSubmit = async () => {
    if (newPassword.value !== newAgainPassword.value) {
        passwordsDoNotMatch.value = true;
        successMessage.value = '';
        return;
    }

    passwordsDoNotMatch.value = false;

    try {
        const requestData = {
            oldPassword: oldPassword.value,
            newPassword: newPassword.value
        };
        const response = await reqChangepassword(requestData);

        if (response.status === 200) {
            successMessage.value = '密碼已更改';
            oldPassword.value = '';
            newPassword.value = '';
            newAgainPassword.value = '';
        } else {
            console.error('密碼更新失败', response.data);

        }
    } catch (error) {
        console.error('密碼更新失败', error.response.data);

    }
};
</script>

<template>
    <div v-if="passwordsDoNotMatch" class="alert alert-danger">密碼輸入錯誤或密碼輸入不一致</div>
    <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

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