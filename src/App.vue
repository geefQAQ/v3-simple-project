<script setup>
import { RouterView } from 'vue-router';
import { onMounted, nextTick } from 'vue';
onMounted(() => {
  nextTick(() => {
    document.querySelector('#slack').remove();
  })
})
</script>

<template>
  <RouterView />
</template>