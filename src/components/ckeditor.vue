<template>
    <div>
        <div ref="editorRef"></div>
        <!-- <button @click="saveContent">保存内容</button> -->
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const editorRef = ref(null);
let editorInstance = null;

onMounted(() => {
    ClassicEditor.create(editorRef.value)
        .then(editor => {
            editorInstance = editor;
            console.log('Editor was initialized', editor);

            // 添加事件监听器以侦听编辑器内容更改
            editorInstance.model.document.on('change:data', () => {
                const content = editorInstance.getData();
                const wrappedContent = `<div>${content}</div>`;
                console.log('Editor content changed:', wrappedContent);
            });
        })
        .catch(error => {
            console.error(error);
        });
});
</script>
