<script setup>
import { RouterView } from 'vue-router';
import { onMounted, nextTick } from 'vue';
onMounted(() => {
  const loadingEle = document.querySelector('#slack');
  nextTick(() => {
    loadingEle && loadingEle.remove();
  })
})
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
  <!-- TODO: 前进刷新 后退不刷新 -->
  <!-- <router-view v-slot="{ Component, route }">
    <transition name="fade">
      <keep-alive>
        <component :is="Component" :key="route.path" />
      </keep-alive>
    </transition>
  </router-view> -->
</template>

<style lang="scss" scoped>
.fade-enter-active{
  transition: opacity 0.2s ease;
}
//把离开时的开始状态设置为display:none
.fade-leave-from{
  display: none;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>