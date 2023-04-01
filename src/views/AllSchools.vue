<template>
  <!-- nav -->
  <van-nav-bar
    title="全部学校"
  />

  <!-- 考勤概况 -->
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
        :columns="rangeColumns"
        @confirm="handleConfirmPicker"
        @cancel="showPicker = false"
      />
    </van-popup>
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
    <vxe-column field="SchoolName" title="学校名称"></vxe-column>
    <vxe-column field="Total" title="应到"></vxe-column>
    <vxe-column field="Actually" title="实到(正常/迟到)" width="30%"></vxe-column>
    <vxe-column field="Absent" title="请假/缺勤"></vxe-column>
  </vxe-table>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { Toast } from 'vant';
import dayjs from "dayjs";
import Bar from '@/components/Bar.vue';
import { getTestApi } from '@/api'
const router = useRouter();

// table-data
const tableData = ref([]);
const getTableData = () => {
  getTestApi().then(res => {
    const { data } = res;
    tableData.value = data;
  });
}
getTableData();

// picker
const now = new Date();
const currentDate = ref(new Date());
const displayDate = ref(dayjs(new Date()).format("YYYY-MM-DD"));
const minDate = new Date(2020, 0, 1);
const showDatePicker = ref(false);
const showPicker = ref(false);
const rangeColumns = [
  '上午上学',
  '上午放学',
  '下午上学',
  '下午放学',
  '晚修上学',
  '晚修放学',
];
const currentRange = ref(rangeColumns[0]);
const handleConfirmPicker = (value) => {
  currentRange.value = value;
  showPicker.value = false;
}
const handleConfirmDate = (value) => {
  showDatePicker.value = false;
  currentDate.value = value;
  displayDate.value = dayjs(value).format("YYYY-MM-DD");

  // TODO: api
  getTableData();
}

// table
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

const handleCellClick = ({ row }) => {
  const { SchoolName: schoolName, SchoolCode: schoolId } = row;
  router.push({ name: 'school', params: { schoolId }, query: { title: schoolName } })
}

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

.card {
  margin: 12px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 12px #ebedf0;
  overflow: hidden;
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


</style>
