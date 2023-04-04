<template>
  <div class="group-header">
    <div class="group-left">
      <div class="group-line" :style="{backgroundColor: props.lineColor}"></div>
      <span class="group-title" :style="{color: props.color}">{{ props.title }}</span>
    </div>
    <div class="group-right">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '默认标题'
  },
  lineColor: {
    type: String,
    default: '#5a6fc0',
  },
  color: {
    type: String,
    default: '#5a6fc0',
  }
})
</script>

<style lang="scss" scoped>
.group-header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 40px;
  height: 40px;
  background: #fff;
  &:deep(.van-button--default) {
    border: none;
  }
}
.group-left, .group-right {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.group-line {
  height: 14px;
  width: 3px;
  border-radius: 3px;
}
.group-title {
  font-weight: bold;
  padding-left: 12px;
}
</style>