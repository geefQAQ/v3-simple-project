<template>
  <GroupHeader :title="props.title" />
  <van-row justify="space-between" style="padding-bottom: 20px;">
    <van-col v-for="item in props.data" span="5" style="text-align: center;">
      <div :style="{color: item.numberColor}" class="checkup-num">{{ item.num }}</div>
      <div>{{ item.name }}</div>
    </van-col>
  </van-row>
</template>

<script setup>
import GroupHeader from '@/components/GroupHeader.vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  data: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
.checkup-num {
  font-size: var(--van-font-size-lg);
  font-weight: var(--van-font-weight-bold);
}
</style>