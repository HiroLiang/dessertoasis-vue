<script setup>
import { ref, onMounted } from 'vue';
import { reqMember, reqMemberDetail, reqSession, reqChangeMember, imgTest } from '@/api';

const memberId = ref("");

// const memberData = ref("");
// const memberMdData = ref("")

const memberName = ref("");
const memberUserName = ref("");
const memberIdNumber = ref("");
const memberBirthday = ref("");
const memberEmail = ref("");
const memberAddress = ref("");
const memberpic = ref();
const memberfolderURL = ref("");
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
        memberpic.value = responseMd.data.pic
        memberfolderURL.value = responseMd.data.folderURL

    } catch (error) {
        console.error('獲取會員失敗：', error);
    }
});

const myForm = ref(null)

const updatemember = async () => {
    // try {

    console.log(FormData);
    console.log(myForm);

    let updatedMemberDetail = {
        id: memberId.value,
        idNumber: memberIdNumber.value,
        birthday: memberBirthday.value,
        deliveryAddress: memberAddress.value,
        pic: memberpic.value,
        folderURL: memberfolderURL.value
    };
    console.log(updatedMemberDetail.idNumber)
    // 執行更新 API 請求
    const res = await reqChangeMember(updatedMemberDetail)
    console.log(res.data);
    alert("更新成功")
    location.reload();

};






</script>





<template >
    <form class="file-upload" @submit.prevent="updatemember" ref="myForm">
        <div class="row mb-5 gx-5">

            <!-- 基本資料 -->
            <div class="mb-5 mb-xxl-0">
                <div class="bg-secondary-soft px-4 py-5 rounded">
                    <div class="row g-3">
                        <h4 class="mb-4 mt-0">基本資料</h4>

                        <div class="col-md-6">
                            <label class="form-label" for="memberName">姓名</label>
                            <input type="text" class="form-control" id="memberName" name="memberName" v-model="memberName">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label" for="memberUserName">使用者名稱</label>
                            <input type="text" class="form-control" id="memberUserName" name="memberUserName"
                                v-model="memberUserName">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label" for="memberIdNumber">身分證
                            </label>
                            <input type="text" class="form-control" id="memberIdNumber" name="memberIdNumber"
                                v-model="memberIdNumber">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label" for="memberBirthday">生日
                            </label>
                            <input type="text" class="form-control" id="memberBirthday" name="memberBirthday"
                                v-model="memberBirthday">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label" for="memberEmail">Email
                            </label>
                            <input type="email" class="form-control" id="memberEmail" name="memberEmail"
                                v-model="memberEmail">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label" for="memberAddress">住址
                            </label>
                            <input type="text" class="form-control" id="memberAddress" name="memberAddress"
                                v-model="memberAddress">
                        </div>
                    </div>
                </div>
            </div>


            <!-- 上傳圖片 -->
            <!-- <div class="col-xxl-4">
                <div class="bg-secondary-soft px-4 py-5 rounded">
                    <div class="row g-3">
                        <div class="text-center">
                            <h4 class="mb-4 mt-0">點擊上傳頭像圖片</h4>
                          
                            <label for="memberpic">
                                <div class="imageContainer container">
                                    <img class="memberPicture inputLabel custom-cursor-pointer " id="previewPic0" alt="頭像圖片"
                                        :src="memberPicPreviewImageUrl || 'https://fakeimg.pl/1180x310/?text=Image'">
                                </div>
                                <input @change="getMemberImg" class="form-control visually-hidden pic" type="file"
                                    id="memberpic" name="memberpic" accept="image/*"><br>
                            </label><br><br>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>


        <div class="text-center">
            <button type="submit" class="btn btn-primary btn-lg mt-5">Update profile</button>
        </div>
    </form>
</template>





<style scoped>
button {
    margin: auto 15px;
}

.memberPicture {
    width: 300px;
    /* 设置为您希望的正方形边长 */
    height: 300px;
    /* 设置为与宽度相同的值，以确保图像是正方形 */
    object-fit: contain
}

.custom-cursor-pointer {
    cursor: pointer !important;
}
</style>