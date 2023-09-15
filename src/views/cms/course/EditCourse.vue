<script setup>
import { ref, watch, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { reqGetCourseData, reqUpdateCourse } from '../../../api';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { NButton, NSwitch, NForm, NFormItem, NInput, NDynamicTags, NDatePicker, NSelect, NRadioGroup, NRadioButton, NInputNumber } from "naive-ui"

//取得陳列課程Id
const route = useRoute()
const courseId = ref(0)
courseId.value = route.query.id

const updateDisabled = ref(false)

//課程資料
const courseData = ref(null)

//圖片陳列
const selectedImg = ref(0)

const showPicture = (index) => {
    selectedImg.value = index
}

const insertImg = (e) => {
    const newPic = e.target.files[0]
    const reader = new FileReader();
    reader.onload = function (event) {
        const base64String = event.target.result
        console.log(base64String);
        courseData.value.coursePictureList.push({
            courseImgURL: base64String
        })
    }
    reader.readAsDataURL(newPic)

}

const deletePic = (url) => {
    if (courseData.value.coursePictureList.length > 1) {
        for (let i = 0; i < courseData.value.coursePictureList.length; i++) {
            let pic = courseData.value.coursePictureList[i]
            if (pic.courseImgURL === url) {
                courseData.value.coursePictureList.splice(i, 1)
                return
            }
        }
    }
}

//標籤
const dynamicTagsValue = ref([])

watch(dynamicTagsValue, () => {
    console.log(dynamicTagsValue.value.length);
    console.log(courseData.value.courseList.length);
    if (dynamicTagsValue.value.length > courseData.value.courseList.length) {
        courseData.value.courseList.push({
            ctag: { courseTagName: dynamicTagsValue.value[2] }
        })
        console.log(courseData.value.courseList);
    } else if (dynamicTagsValue.value.length < courseData.value.courseList.length) {
        for (let i = 0; i < courseData.value.courseList.length; i++) {
            let tag = courseData.value.courseList[i]
            console.log(dynamicTagsValue.value.includes(tag.ctag.courseTagName));
            if (!dynamicTagsValue.value.includes(tag.ctag.courseTagName)) {
                courseData.value.courseList.splice(i, 1)
                console.log(courseData.value.courseList);
                return
            }
        }
    }
})

//地點
const hasRented = ref(false)

const checkClassroom = () => {
    console.log('a');
}

//狀態
const stateOptions = [{ label: '停用', value: '停用' }, { label: '啟用', value: '啟用' }]

//變更.刪除
const submitChange = async () => {
    let conf = confirm('是否修改課程資料？')
    console.log(conf);
    if (conf) {
        let result = await reqUpdateCourse(courseData.value)
        console.log(result.data);
    }
}

const deleteCourse = () => {

}

onBeforeMount(async () => {
    let result = await reqGetCourseData(courseId.value)
    if (result.data != null) {
        courseData.value = result.data
        let arr = []
        courseData.value.courseList.forEach(tag => {
            arr.push(tag.ctag.courseTagName)
        })
        dynamicTagsValue.value = arr
        courseData.value.updateDate = new Date().getTime()
        courseData.value.courseDate = new Date(courseData.value.courseDate).getTime()
        courseData.value.closeDate = new Date(courseData.value.closeDate).getTime()
        console.log(courseData.value.closeDate);
    }
})

</script>
<template>
    <div v-if="courseData != null" class="justifyContainer">
        <div class="picDisplayContainer">
            <div class="picDisplay">
                <img :src="courseData.coursePictureList[selectedImg].courseImgURL">
            </div>
            <div class="allPicContainer">
                <div v-for="(img, index) in courseData.coursePictureList" :key="img.id"
                    :class="index == selectedImg ? `imgDisplay selectedPic` : `imgDisplay`" @click="showPicture(index)">
                    <div v-if="updateDisabled" class="deleteContain">
                        <span class="dlelBtnContainer">
                            <font-awesome-icon @click.stop="deletePic(img.courseImgURL)" :icon="['fas', 'trash']"
                                style="color: #9a7373;" size="lg" />
                        </span>
                    </div>
                    <div class="picContainer">
                        <img :src="img.courseImgURL" :alt="img.id">
                    </div>
                </div>
                <div class="imgDisplay ">
                    <label for="imgList">
                        <div class="inputLabel picContainer" name="imgList" style="cursor: pointer;">
                            <img style="opacity: 0.4;" src="/images/navbar/add-image.png" alt="image-gallery.png">
                        </div>
                        <input :disabled="!updateDisabled" @change="insertImg" name="imgList"
                            class="form-control visually-hidden pic" type="file" id="imgList">
                    </label>
                </div>
            </div>
        </div>
        <div class="courseDetailContainer">
            <div style="margin-bottom: 10px;">
                <span style="font-size: 14px;">修改：</span><n-switch v-model:value="updateDisabled" />
            </div>
            <n-form ref="formRef" :model="courseData" :disabled="!updateDisabled" :rules="null" label-placement="left">
                <n-form-item path="courseName" label="課程名稱：">
                    <n-input v-model:value="courseData.courseName" @keydown.enter.prevent />
                </n-form-item>
                <n-form-item path="courseIntroduction" label="課程說明：">
                    <n-input type="textarea" v-model:value="courseData.courseIntroduction" />
                </n-form-item>
                <n-form-item label="標籤：" path="dynamicTagsValue">
                    <n-dynamic-tags v-model:value="dynamicTagsValue" />
                </n-form-item>
                <n-form-item label="開課日期：" path="courseDate">
                    <n-date-picker v-model:value="courseData.courseDate" type="date" />
                </n-form-item>
                <n-form-item label="報名截止：" path="closeDate">
                    <n-date-picker v-model:value="courseData.closeDate" type="date" />
                </n-form-item>
                <n-form-item label="場地選擇：" path="hasRented">
                    <n-radio-group v-model:value="hasRented" name="hasRentedOrNot">
                        <n-radio-button :value="true">
                            租借教室
                        </n-radio-button>
                        <n-radio-button :value="false">
                            已有場地
                        </n-radio-button>
                    </n-radio-group>
                    <n-radio-group v-if="hasRented" name="checkClassroom">
                        <n-radio-button @click="checkClassroom" style="margin-left: 20px;">
                            查看教室
                        </n-radio-button>
                    </n-radio-group>
                    <n-input v-if="!hasRented" v-model:value="courseData.coursePlace" @keydown.enter.prevent />
                </n-form-item>
                <n-form-item path="coursePrice" label="價格：">
                    <n-input-number v-model:value="courseData.coursePrice" />
                </n-form-item>
                <n-form-item path="remainPlaces" label="人數：">
                    <n-input-number v-model:value="courseData.remainPlaces" />
                </n-form-item>
                <n-form-item label="課程狀態：" path="courseStatus">
                    <n-select v-model:value="courseData.courseStatus" placeholder="Select" :options="stateOptions" />
                </n-form-item>
            </n-form>
        </div>
    </div>
    <div style="display: flex;justify-content: center;align-items: center;">
        <n-button round type="primary" @click="submitChange" :disabled="updateDisabled ? false : true">
            送出
        </n-button>
        <n-button round type="error" @click="deleteCourse" :disabled="updateDisabled ? false : true">
            刪除
        </n-button>
    </div>
</template>
<style scoped>
.justifyContainer {
    height: 90%;
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

/* 圖片陳列 */
.picDisplayContainer {
    height: 600px;
    width: 50%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border: 2px double rgb(106, 106, 106);
    border-radius: 10px;
    margin-right: 15px;
}

.picDisplay {
    width: 90%;
    height: 90%;
    flex-grow: 3;
    overflow: hidden;
    background-color: aliceblue;
}

.picDisplay img {
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.allPicContainer {
    flex-grow: 1;
    width: 100%;
    max-height: 180px;
    overflow-y: hidden;
    overflow-x: auto;
    white-space: nowrap;
    background-color: rgb(255, 255, 255);
}

.imgDisplay {
    display: inline-flex;
    height: 100%;
    width: auto;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin-top: 5px;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 30px;
    cursor: pointer;
}

.selectedPic {
    background-color: rgb(222, 221, 221);
}

.imgDisplay:hover {
    background-color: rgb(222, 221, 221);
}

.picContainer {
    height: 120px;
    width: 120px;
}

.allPicContainer img {
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.deleteContain {
    position: relative;
}

.dlelBtnContainer {
    position: absolute;
    width: 16px;
    height: 16px;
    top: 0px;
    right: 0px;
    transform: translateX(22px) translateY(-100px);
    transition: all 0.2s;
}

.imgDisplay:hover .dlelBtnContainer {
    transform: translateX(22px) translateY(-52px);
}

/* 表單陳列 */

.courseDetailContainer {
    width: 40%;
}
</style>