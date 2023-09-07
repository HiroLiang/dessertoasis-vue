<script setup>
import { ref, onMounted } from 'vue';
import { reqMember, reqMemberDetail, reqSession } from '@/api';

const memberId = ref("");

// const memberData = ref("");
// const memberMdData = ref("")

const memberName = ref("");
const memberUserName = ref("");
const memberIdNumber = ref("");
const memberBirthday = ref("");
const memberEmail = ref("");
const memberAddress = ref("");



onMounted(async () => {
    try {
        const sessionResponse = await reqSession();
        const sessionData = sessionResponse.data;

        memberId.value = sessionData.id;
        // console.log("我是" + memberId.value);
        const response = await reqMember(memberId.value);
        const responseMd = await reqMemberDetail(memberId.value);

        // memberData.value = response.data;
        memberName.value = response.data.fullName;
        memberUserName.value = response.data.memberName
        memberEmail.value = response.data.email

        // memberMdData.value = responseMd.data;
        memberIdNumber.value = responseMd.data.idNumber
        memberBirthday.value = responseMd.data.birthday
        memberAddress.value = responseMd.data.deliveryAddress

    } catch (error) {
        console.error('獲取會員失敗：', error);
    }
});

// const handleInput = () => {
// }
</script>





<template >
    <form class="file-upload">
        <div class="row mb-5 gx-5">

            <!-- 基本資料 -->
            <div class="col-xxl-8 mb-5 mb-xxl-0">
                <div class="bg-secondary-soft px-4 py-5 rounded">
                    <div class="row g-3">
                        <h4 class="mb-4 mt-0">基本資料</h4>

                        <div class="col-md-6">
                            <label class="form-label" for="nameInput">姓名</label>
                            <input type="text" class="form-control" id="nameInput" v-model="memberName">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label" for="memberNameInput">使用者名稱</label>
                            <input type="text" class="form-control" id="memberNameInput" v-model="memberUserName">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label" for="identityInput">身分證
                            </label>
                            <input type="text" class="form-control" id="identityInput" v-model="memberIdNumber">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label" for="bdayInput">生日
                            </label>
                            <input type="text" class="form-control" id="bdayInput" v-model="memberBirthday">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label" for="emailInput">Email
                            </label>
                            <input type="email" class="form-control" id="emailInput" v-model="memberEmail">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label" for="addressInput">住址
                            </label>
                            <input type="text" class="form-control" id="addressInput" v-model="memberAddress">
                        </div>
                    </div>
                </div>
            </div>


            <!-- 上傳圖片 -->
            <div class="col-xxl-4">
                <div class="bg-secondary-soft px-4 py-5 rounded">
                    <div class="row g-3">
                        <h4 class="mb-4 mt-0">上傳頭像圖片</h4>

                        <div class="text-center">

                            <div class="square position-relative display-2 mb-3">
                                <font-awesome-icon :icon="['far', 'user']" />
                            </div>

                            <input type="file" id="customFile" name="file" hidden>
                            <label class="btn btn-outline-success" for="customFile">上傳</label>

                            <button type="button" class="btn btn-outline-danger">移除</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="text-center">
            <button type="button" class="btn btn-primary btn-lg">Update profile</button>
            <button type="button" class="btn btn-danger btn-lg">Delete profile</button>
        </div>
    </form>
</template>





<style scoped>
button {
    margin: auto 15px;
}
</style>