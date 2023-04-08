<template>
  <div>
    <!-- 导航 -->
    <van-nav-bar title="全部学校" safe-area-inset-top />
    <!-- 考勤概况 -->
    <Card>
      <Search
        @confirm-date="handleConfirmDate"
        @confirm-range="handleConfirmRange"
      />
      <Bar title="今日出勤情况" :data="state.barData" />
      <Line title="本周出勤情况" :data="state.lineData" />
      <Overview title="统计" :data="state.overviewData" />
    </Card>
    <!-- 表格 -->
    <GroupHeader style="padding: 0 10px">
      <van-button
        icon="replay"
        round size="mini"
        type="primary"
        @click="handleTabRendered"
      >刷新表格</van-button>
    </GroupHeader>
    <van-tabs
      v-model:active="state.activeTab"
      animated
      lazy-render
      @rendered="handleTabRendered"
      @click-tab="scrollToBottom"
    >
      <van-tab v-for="tab in state.tabs" :title="tab.name" :name="tab.id">
        <BasicTable
          :data="state.tableData[state.activeTab]"
          :columns="TABLE_COLUMNS"
          :loading="state.tableLoading[state.activeTab]"
          @click-cell="handleClickCell"
        />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import { Toast } from 'vant';
import {
  getAllDistricts,
  getSchoolsByDistrictId,
  getAttendanceByToday,
} from '@/api';
import { scrollToBottom } from '@/utils'
import { TABLE_COLUMNS, COLORS } from '@/utils/constants';
import Bar from '@/components/Bar.vue';
import Line from '@/components/Line.vue';
import Search from '@/components/Search.vue';
import BasicTable from '@/components/BasicTable.vue';
import GroupHeader from '@/components/GroupHeader.vue';
import Card from '@/components/Card.vue';
import Overview from '@/components/Overview.vue';

const router = useRouter();

const state = reactive({
  activeTab: '0',
  tabs: [],
  tableData: {},
  tableLoading: {},
  barData: [],
  lineData: {
    xAxisData: [],
    data: []
  },
  overviewData: [
    { name: '正常', num: 1174, numberColor: COLORS.holiday},
    { name: '发烧', num: 1, numberColor: COLORS.late},
    { name: '其他症状', num: 1, numberColor: COLORS.absent},
    { name: '未检测', num: 1, numberColor: COLORS.normal}
  ]
})

const calcTotal = (res) => {
  let holidayTotal = 0;
  let lateTotal = 0;
  let absentTotal = 0;
  let accessTotal = 0;
  let total = 0;
  res?.data.forEach(item => {
    holidayTotal += item['Holiday'];
    lateTotal += item['Late'];
    accessTotal += item['Absent'];
    total += item['Total']
  })

  return  [
    { name: '全部', value: total, color: COLORS.all },
    { name: '请假', value: holidayTotal, color: COLORS.holiday },
    { name: '迟到', value: lateTotal, color: COLORS.late },
    { name: '缺勤', value: absentTotal, color: COLORS.absent} ,
    { name: '正常', value: accessTotal, color: COLORS.normal },
  ]
}

getAllDistricts().then(res => {
  Toast.loading({
    duration: 0,
    message: '加载中...',
    forbidClick: true,
  });
  setTimeout(() => {
    state.tabs = res.data;
    state.activeTab = state.tabs[0].id;
    Toast.clear();
  }, 200)
});

getAttendanceByToday().then(res => {
  Toast.loading({
    duration: 0,
    message: '加载中...',
    forbidClick: true,
  });
  setTimeout(() => {
    state.barData = calcTotal(res);
    state.lineData = {
      xAxisData: ['04/01', '04/02', '04/03'],
      data: [150, 200, 300]
    };
    Toast.clear();
  }, 1000)
})

const handleTabRendered = () => {
  state.tableLoading[state.activeTab] = true;
  getSchoolsByDistrictId(state.activeTab).then(res => {
    setTimeout(() => {
      const { data } = res;
      state.tableData[state.activeTab] = data;
      state.tableLoading[state.activeTab] = false;
      if(state.activeTab !== '0') {
        scrollToBottom()
      }
    }, 500)
  });
};

const handleClickCell = (row) => {
  const { SchoolName: schoolName, SchoolCode: schoolId } = row;
  router.push({ name: 'school', params: { schoolId }, query: { title: schoolName } })
}
const handleConfirmRange = (value) => {
  // TODO: api
}
const handleConfirmDate = (value) => {
  // TODO: api
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
</style>
