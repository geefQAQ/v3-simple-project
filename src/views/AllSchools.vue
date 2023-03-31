<template>
  <!-- nav -->
  <van-nav-bar
    title="全部学校"
  />

  <!-- 考勤概况 -->
  <div class="card">
    <van-cell
      title="查询日期"
      is-link
      arrow-direction="down"
      icon="notes-o"
      :value="currentDate"
      @click="showDateTime = true"
    />
    <van-cell
      title="考勤时段"
      is-link
      arrow-direction="down"
      icon="clock-o"
      :value="currentRange"
      @click="showPicker = true"
    />
    <Bar />
  </div>

  <div class="table-header">
    <span class="table-title">统计详情</span>
    <van-button icon="replay" @click="handleRefreshTable">刷新数据</van-button>
  </div>
  <vxe-table
    size="small"
    stripe
    :loading="tableLoading"
    align="center"
    :data="tableData"
    @cell-click="handleCellClick"
  >
    <vxe-column field="grade" title="年级"></vxe-column>
    <vxe-column field="shouldIn" title="应到"></vxe-column>
    <vxe-column field="arrive" title="实到(正常/迟到)"></vxe-column>
    <vxe-column field="absence" title="请假/缺勤"></vxe-column>
    <vxe-column field="rollCall" title="点名情况"></vxe-column>
  </vxe-table>

  <van-popup
    v-model:show="showDateTime"
    @closed="showDateTime = false"
    position="bottom"
    round
  >
    <van-datetime-picker
      v-model="now"
      type="date"
      title="查询日期"
      :min-date="minDate"
      :max-date="maxDate"
    />
  </van-popup>

  <van-popup
    v-model:show="showPicker"
    @closed="showPicker = false"
    position="bottom"
    round
  >
    <van-picker
      title="考勤时段"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      @change="onChange"
    />
  </van-popup>

  <!-- search dialog -->
  <van-dialog
    v-model:show="showSearchDialog"
    title="查询"
    show-cancel-button
    confirm-button-text="查询"
    @confirm="doSearch"
  >
    <van-cell
      title="查询日期"
      is-link
      arrow-direction="down"
      :value="currentDate"
      @click="showDateTime = true"
    />
    <van-cell
      title="考勤时段"
      is-link
      arrow-direction="down"
      :value="currentRange"
      @click="showPicker = true"
    />
  </van-dialog>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { Toast } from 'vant';
import dayjs from "dayjs";
import Bar from '@/components/Bar.vue';
import { getTestApi } from '@/api'
const router = useRouter();

getTestApi().then(data => {
  console.log('data', data)
});

// const currentRate = ref(0);
// const rate = ref(90);
// const gradientColor = {
//   '0%': '#3fecff',
//   '100%': '#6149f6',
// };
// datetime
const now = new Date();
const currentDate = computed(() => {
  return dayjs(now).format("YYYY-MM-DD")
})

const minDate = new Date(2020, 0, 1);
const maxDate = new Date(2025, 10, 1);

const showDateTime = ref(false);

// picker
const showPicker = ref(false);
const columns = [
  '上午上学',
  '上午放学',
  '下午上学',
  '下午放学',
  '晚修上学',
  '晚修放学',
];
const currentRange = columns[0];
const onConfirm = () => {

}
const onCancel = () => {

}
const onChange = () => {

}



// table
const tableData = ref([
  {
    id: "1",
    grade: "学校A",
    shouldIn: "28",
    arrive: "0(0/0)",
    absence: '0/28',
    rollCall: '0/3'
  },
  {
    id: "2",
    grade: "学校B",
    shouldIn: "28",
    arrive: "0(0/0)",
    absence: '0/28',
    rollCall: '0/3'
  },
  {
    id: "3",
    grade: "学校C",
    shouldIn: "28",
    arrive: "0(0/0)",
    absence: '0/28',
    rollCall: '0/3'
  },
]);
const tableLoading = ref(false);
const handleRefreshTable = () => {
  tableLoading.value = true;
  const copy = Object.assign(tableData.value, {});
  tableData.value = [];
  setTimeout(() => {
    tableData.value = copy;
    tableLoading.value = false;
  }, 2000)
}

const handleCellClick = (cell) => {
  const { row } = cell;
  const schoolId = row?.id;
  router.push({ name: 'school', params: { schoolId }, query: { title: 'testtitle' } })
}

// search dialog
const showSearchDialog = ref(false);
// const onClickRight = () => {
//   showSearchDialog.value = true;
// }
const doSearch = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
}
</script>



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
    height: 20px;
    width: 6px;
    border-radius: 3px;
    background-color: blue;
  }
  &:deep(.van-button--default) {
    border: none;
  }
}
.table-title {
  padding-left: 30px;
}

// .table-body > tr:nth-child(odd){
//   background: #eee;
// }

.nav-right-wrapper {
  display: flex;
  align-items: center;
}

.nav-right-text {
  font-size: 14px;
  color: var(--van-nav-bar-icon-color);
  padding-left: 2px;
}

.attendance-overview {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 8px 12px #ebedf0;
}

.attendance-circle {
  margin-top: 20px;
  height: 120px;
}

.attendance-card {
  box-shadow: 0 8px 12px #ebedf0;
  width: 100%;
}

.label-text :deep(.van-cell__title) {
  font-size: var(--van-font-size-md);
}

.circle-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;
}

.attendance-stat {
  margin-top: 20px;
  align-self: normal;
  text-align: center;
}

.card {
  margin: 12px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 12px #ebedf0;
  overflow: hidden;
}
</style>
