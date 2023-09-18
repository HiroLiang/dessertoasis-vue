<script setup>
import { ref } from 'vue';
import { NInput } from 'naive-ui'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const emit = defineEmits(['get-selected-catcher'])

const props = defineProps({
    friends: {}
})

const memberNameInput = ref('')

const memberSearchLoading = ref(false)

const getSelectedCatcher = (id, name) => {
    emit('get-selected-catcher', id, name)
}


</script>
<template>
    <div class="memberListContainer">
        <div style="display: flex;justify-content: center;align-items: center;">
            <NInput v-model:value="memberNameInput" type="text" placeholder="查詢使用者" :loading="memberSearchLoading" />
            <div style="width: 42px;cursor: pointer;padding-left: 10px;padding-right: 10px;">
                <font-awesome-icon :icon="['far', 'paper-plane']" />
            </div>
        </div>
        <div v-for="friend in friends" :key="friend.member.id" class="member"
            @click="getSelectedCatcher(friend.member.id, friend.member.fullName)">
            <div class="profilePicCOntainer">
                <img src="/images/navbar/user-interface.png" alt="">
            </div>
            <div>
                <h2>{{ friend.member.fullName }}</h2>
                <p>{{ friend.lastMessage.chatMessage }}</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
h2 {
    font-size: 18px;
}

p {
    padding-left: 20px;
    opacity: 0.8;
    white-space: nowrap;
    overflow: hidden;
}

.memberListContainer {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.member {
    width: 100%;
    height: 70px;
    display: flex;
    cursor: pointer;
    overflow: hidden;
    flex-wrap: nowrap;
}

.member:hover {
    background-color: rgb(222, 222, 222);
}

.profilePicCOntainer {
    height: 70px;
    width: 70px;
    padding: 20px;
}

.profilePicCOntainer img {
    width: 100%;
    height: 100%;
    -webkit-user-drag: none;
    object-fit: cover;
}
</style>