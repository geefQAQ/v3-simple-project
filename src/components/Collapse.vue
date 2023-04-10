<template>
  <van-collapse v-model="activeNames" :border="false">
    <van-collapse-item
      v-for="(value, key) in data"
      :title="`${TITLE_MAP[key]} ${value.length} 人`"
      :name="key"
    >
      <template #icon>
        <div class="icon-wrapper" :style="{backgroundColor: COLORS[key]}">
          <van-icon name="friends" color="#fff" class="collapse-icon"/>
        </div>
      </template>
      <template #default>
        <van-space wrap size="20">
          <van-tag
            v-for="(student, index) in value"
            :key="index"
            type="primary"
            plain
            round
            size="large"
            >{{ student.StudentName }}</van-tag>
            <!-- @click="showPopup = true" -->
        </van-space>
      </template>
    </van-collapse-item>
  </van-collapse>
  <!-- <van-popup
    v-model:show="showPopup"
    :style="{ height: '50%', width: '80%' }"
    round
    teleport="body"
  >
    'test'
  </van-popup> -->
</template>

<script setup>
import { COLORS } from '@/utils/constants';

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})
const data = {
  holiday: [],
  late: [],
  normal: [],
  absent: [],
}
const TITLE_MAP = {
  holiday: '请假',
  late: '迟到',
  absent: '缺勤',
  normal: '正常',
}
// 1
// {
//   holiday: [],
//   late: [],
//   normal: [],
//   absent: [],
// }
// 2
// [{
//   name: 'holiday',
//   color: '',
//   value: []
// }, {
//   name: 'late',
//   value: []
// }]
// data = [{
// 
// }]
</script>

<style lang="scss" scoped>
.icon-wrapper {
  height: 24px;
  width: 24px;
  border-radius: 50%;
  color: #fff;
  text-align: center;
  margin-right: 8px;
}
</style>