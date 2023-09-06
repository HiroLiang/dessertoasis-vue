<script setup>
import NavBar from '@/components/NavBar.vue'
import HeaderShow from '@/components/HeaderShow.vue';
import FooterVue from '../components/Footer.vue';

import { useLoadingBar } from 'naive-ui'
const loadingBar = useLoadingBar()
const loadStart = () => {
  loadingBar.start()
}
const loadFinish = () => {
  loadingBar.finish()
}
const loadError = () => {
  loadingBar.error()
}
</script>

<template>
  <NavBar />
  <HeaderShow />
  <button @click="loadStart">start</button>
  <button @click="loadFinish">finish</button>
  <button @click="loadError">error</button>
  <FooterVue />
</template>
