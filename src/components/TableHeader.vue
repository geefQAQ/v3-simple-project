<template>
  <div class="table-header">
    <span class="table-title">统计详情</span>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.table-header {
  position: relative;
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  height: 40px;
  background: #fff;
  &:before {
    content: '';
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    height: 18px;
    width: 3px;
    border-radius: 3px;
    background-color: blue;
  }
  &:deep(.van-button--default) {
    border: none;
  }
  .table-title {
    padding-left: 23px;
  }
}
</style>