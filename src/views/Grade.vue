<template>
  <van-nav-bar
    :title="title"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <van-button type="primary" @click="goClass">跳转到班级</van-button>
</template>

<script setup>
  import { useRouter, useRoute } from 'vue-router';
  const router = useRouter();
  const route = useRoute();
  const { title } = route.query ?? ''
  const onClickLeft = () => {
    router.back();
  }

  const goClass = () => {
    router.push({name: 'class', params: { classId: '0101' }, query: { title: 'classTitle' }})
  }
</script>