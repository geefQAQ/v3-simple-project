<template>
  <div class="card">
    <!-- TODO： cell popup picker封装 -->
    <van-cell
      title="查询日期"
      is-link
      readonly
      arrow-direction="down"
      icon="notes-o"
      :value="displayDate"
      @click="showDatePicker = true"
    />
    <van-popup
      v-model:show="showDatePicker"
      @closed="showDatePicker = false"
      position="bottom"
      teleport="body"
      round
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="请选择查询日期"
        :min-date="minDate"
        :max-date="now"
        @confirm="handleConfirmDate"
        @cancel="showDatePicker = false"
      />
    </van-popup>
    <van-cell
      title="考勤时段"
      is-link
      arrow-direction="down"
      icon="clock-o"
      :value="currentRange"
      @click="showPicker = true"
    />
    <van-popup
      v-model:show="showPicker"
      @closed="showPicker = false"
      position="bottom"
      round
      teleport="body"
    >
      <van-picker
        title="请选择考勤时段"
        :columns="RANGE_COLUMNS"
        @confirm="handleConfirmPicker"
        @cancel="showPicker = false"
      />
    </van-popup>
    <slot name="chart"></slot>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import dayjs from "dayjs";

const RANGE_COLUMNS = [
  '上午上学',
  '上午放学',
  '下午上学',
  '下午放学',
  '晚修上学',
  '晚修放学',
];
const currentRange = ref(RANGE_COLUMNS[0]);

const emit = defineEmits([
  'confirm-date',
  'confirm-range'
])

// const state = reactive({
//   currentDate,
//   displayDate,
//   minDate,
//   showDatePicker,
//   showPicker
// })

const now = new Date();
const currentDate = ref(new Date());
const displayDate = ref(dayjs(new Date()).format("YYYY-MM-DD"));
const minDate = new Date(2020, 0, 1);
const showDatePicker = ref(false);
const showPicker = ref(false);

const handleConfirmDate = (value) => {
  showDatePicker.value = false;
  currentDate.value = value;
  displayDate.value = dayjs(value).format("YYYY-MM-DD");
  emit('confirm-date', {
    currentDate,
    displayDate
  })
}

const handleConfirmPicker = (value) => {
  currentRange.value = value;
  showPicker.value = false;
  emit('confirm-range', {
    currentRange
  })
}

</script>

<style lang="scss" scoped>
.card {
  margin: 12px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 12px #ebedf0;
  overflow: hidden;
}
</style>