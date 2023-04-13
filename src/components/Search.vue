<template>
  <div class="cell-wrapper">
    <van-cell
      title="查询日期"
      is-link
      readonly
      border
      arrow-direction="right"
      icon="notes-o"
      :value="state.displayDate"
      @click="state.showDatePicker = true"
    />
  </div>
  <van-popup
    v-model:show="state.showDatePicker"
    @closed="state.showDatePicker = false"
    position="bottom"
    teleport="body"
    round
  >
    <van-datetime-picker
      v-model="state.currentDate"
      type="date"
      title="请选择查询日期"
      :min-date="state.minDate"
      :max-date="state.now"
      @confirm="handleConfirmDate"
      @cancel="state.showDatePicker = false"
    />
  </van-popup>
  <div class="cell-wrapper">
    <van-cell
      title="考勤时段"
      is-link
      arrow-direction="right"
      icon="clock-o"
      :value="state.currentRange"
      @click="state.showPicker = true"
    />
  </div>
  <van-popup
    v-model:show="state.showPicker"
    @closed="state.showPicker = false"
    position="bottom"
    round
    teleport="body"
  >
    <van-picker
      title="请选择考勤时段"
      :columns="RANGE_COLUMNS"
      @confirm="handleConfirmPicker"
      @cancel="state.showPicker = false"
    />
  </van-popup>
</template>

<script setup>
import { reactive } from 'vue';
import dayjs from "dayjs";

const RANGE_COLUMNS = [
  '上午上学',
  '上午放学',
  '下午上学',
  '下午放学',
  '晚修上学',
  '晚修放学',
];
const DAYS = {
  0: '周日',
  1: '周一',
  2: '周二',
  3: '周三',
  4: '周四',
  5: '周五',
  6: '周六',
}

const emit = defineEmits([
  'confirm-date',
  'confirm-range'
])

// TODO: utils
const getDateWithDay = (date) => {
  const dateTime = dayjs(date).format("YYYY-MM-DD");
  const day = DAYS[dayjs(date).day()];
  return `${dateTime} ${day}`;
}

const state = reactive({
  currentDate: new Date(),
  currentRange: RANGE_COLUMNS[0],
  displayDate: getDateWithDay(new Date()),
  minDate: new Date(2020, 0, 1),
  showDatePicker: false,
  showPicker: false,
})

const handleConfirmDate = (value) => {
  state.showDatePicker = false;
  state.currentDate = value;
  state.displayDate = getDateWithDay(value)
  emit('confirm-date', {
    ...state
  })
}

const handleConfirmPicker = (value) => {
  state.currentRange = value;
  state.showPicker = false;
  emit('confirm-range', {
    ...state
  })
}
</script>

<style lang="scss" scoped>
.cell-wrapper {
  width: 100%;
  border-radius: 10px;
  border: 1px solid #eee;
  margin-bottom: 10px;
  :deep(.van-cell) {
    border-radius: 10px;
  };
  :deep(.van-cell__value) {
    color: var(--van-cell-text-color);
  }
}
</style>