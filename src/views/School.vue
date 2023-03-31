<template>
  <van-nav-bar
    :title="title"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <van-button type="primary" @click="goGrade">跳转到年级</van-button>
</template>

<script setup>
  import { useRouter, useRoute } from 'vue-router';
  const router = useRouter();
  const route = useRoute();
  const { title } = route.query;
  const onClickLeft = () => {
    router.back();
  }

  const goGrade = () => {
    router.push({ name: 'grade', params: { gradeId: '01' }, query: { title: 'gradeTitle' } })
  }
</script>