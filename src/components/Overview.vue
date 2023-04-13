<template>
  <GroupHeader :title="props.title" />
  <van-row justify="space-between">
    <van-col v-for="item in props.data" span="5" style="text-align: center;">
      <div :style="{color: item.numberColor}" class="checkup-num">{{ item.num }}</div>
      <div>{{ item.name }}</div>
    </van-col>
  </van-row>
  <van-divider
    v-if="showDivider"
    dashed
    :style="{ borderColor: '#5470c6', marginBottom: 0 }"
  ></van-divider>
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
  },
  showDivider: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.checkup-num {
  font-size: var(--van-font-size-lg);
  font-weight: var(--van-font-weight-bold);
}
</style>