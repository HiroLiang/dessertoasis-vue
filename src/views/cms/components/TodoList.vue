<script setup>
import { ref } from "vue";
import { NButton } from 'naive-ui'

const emit = defineEmits(['get-count'])

const todo = ref('');
const todoList = ref([]);

const addTodo = () => {
    if (todo.value != '') {
        todoList.value.push({
            title: todo.value,
            complete: false,
        });
        todo.value = '';
        let count = 0
        for (let i = 0; i < todoList.value.length; i++) {
            if (todoList.value[i].complete == false) {
                count++
            }
        }
        console.log(count);
        emit('get-count', count)
    }
}

const completeTodo = (index) => {
    todoList.value[index].complete = true;
    let count = 0
    for (let i = 0; i < todoList.value.length; i++) {
        if (todoList.value[i].complete == false) {
            count++
        }
    }
    console.log(count);
    emit('get-count', count)
}

function restart() {
    todo.value = '';
    todoList.value = [];
    let count = 0
    for (let i = 0; i < todoList.value.length; i++) {
        if (todoList.value[i].complete == false) {
            count++
        }
    }
    console.log(count);
    emit('get-count', count)
}
</script>
<template>
    <div class="todoListContainer">
        <div class="listShowContainer">
            <div style="width: 100%;border-bottom:1px solid rgb(130, 117, 117)  ;">
                <h2 style="font-size: 22px;color: rgb(110, 124, 135);">待辦事項</h2>
            </div>
            <div style="width: 100%;display: flex;justify-content: left;">
                <ul style="width: 100%;">
                    <li v-for="(todo, index) in todoList" :key="index"
                        style="display: flex;justify-content: space-between;align-items: center;width: 85%;">
                        <div>
                            {{ todo.complete ? '完成' : '待處理' }} -
                            {{ todo.title }}
                        </div>
                        <div>
                            <n-button quaternary round type="error" @click="completeTodo(index)">完成</n-button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div
            style="border-top: 1px solid rgb(130, 117, 117) ;width: 100%;display: flex;justify-content: center;align-items: center;flex-grow: 1;">
            <div>
                <input type="text" v-model="todo">
                <n-button ghost type="primary" @click="addTodo()">送出</n-button>
                <n-button ghost type="error" @click="restart()">清空</n-button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.todoListContainer {
    height: 100%;
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.listShowContainer {
    width: 100%;
    display: flex;
    flex-grow: 8;
}

.listShowContainer ul {
    list-style-type: none;
}
</style>