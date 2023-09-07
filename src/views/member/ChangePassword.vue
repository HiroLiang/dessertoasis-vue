<script setup>
import { ref, onMounted } from 'vue';
import { reqSession } from '@/api';

const memberId = ref("");
const memberPasswords = ref("");
const againPasswords = ref("")

onMounted(async () => {
    try {
        const sessionResponse = await reqSession();
        const sessionData = sessionResponse.data;

        memberId.value = sessionData.id;
        // console.log("我是" + memberId.value);

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
                        <h4 class="mb-4 mt-0">更改密碼</h4>

                        <div class="col-md-6">
                            <label class="form-label" for="prePassword">舊密碼</label>
                            <input type="password" class="form-control" id="prePassword" value="">
                        </div>


                        <div class="col-md-6">
                            <label class="form-label" for="newPassword">新密碼</label>
                            <input type="password" class="form-control" id="newPassword" value="">
                        </div>


                        <div class="col-md-6">
                            <label class="form-label" for="newAgainPassword">再次輸入新密碼</label>
                            <input type="password" class="form-control" id="newAgainPassword" value="">
                        </div>


                        <div class="text-center">
                            <button type="button" class="btn btn-primary btn-lg mt-5">Update profile</button>
                            <button type="button" class="btn btn-danger btn-lg mt-5">Delete profile</button>
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