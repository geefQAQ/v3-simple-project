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
      <Bar title="今日出勤统计" :data="state.attendanceByToday" show-divider />
      <Line title="近七天出勤率" :data="state.attendanceRateByRecent7Days" />
    </Card>
    <Card>
      <Overview title="今日请假统计" :data="state.holidayByToday" show-divider />
      <Line title="近七天请假统计" :data="state.holidayByRecent7Days" />
    </Card>
    <!-- 表格 -->
    <GroupHeader title="街道统计" style="padding: 0 10px">
      <van-button
        icon="replay"
        round size="mini"
        type="primary"
        @click="handleTabRendered"
      >刷新</van-button>
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
          :columns="SCHOOL_TABLE_COLUMNS"
          @click-cell="handleClickCell"
          />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import {
  getAllDistricts,
  getSchoolsByDistrictId,
  getAttendanceByToday,
  getAttendanceByRecent7Days,
  getHolidayByToday,
  getHolidayByRecent7Days
} from '@/api';
import {
  scrollToBottom
} from '@/utils'
import { SCHOOL_TABLE_COLUMNS, COLORS_OBJ } from '@/utils/constants';
import { getToken, setToken } from '@/utils/storage'
import Bar from '@/components/Bar.vue';
import Line from '@/components/Line.vue';
import Search from '@/components/Search.vue';
import BasicTable from '@/components/BasicTable.vue';
import GroupHeader from '@/components/GroupHeader.vue';
import Card from '@/components/Card.vue';
import Overview from '@/components/Overview.vue';

const token = getToken('token')
console.log(`output->token`,token)

const router = useRouter();

const state = reactive({
  activeTab: '0',
  tabs: [],
  tableData: {},
  attendanceByToday: {
    rate: '-',
    data: []
  },
  attendanceRateByRecent7Days: {
    yAxisData: {
      unit: '%'
    },
    xAxisData: [],
    data: [],
  },
  holidayByToday: [],
  holidayByRecent7Days: {
    yAxisData: {
      unit: '人'
    },
    xAxisData: [],
    data: []
  }
})

// TODO: 封装use
const calcTotal = (data) => {
  const {
    Late: late,
    Absent: absent,
    Holiday: holiday,
    Actually: actually,
    Total: total,
    Rate: rate,
  } = data

  return {
    rate,
    data: [
      { name: '全部', value: total, color: COLORS_OBJ.all },
      { name: '请假', value: holiday, color: COLORS_OBJ.holiday },
      { name: '迟到', value: late, color: COLORS_OBJ.late },
      { name: '缺勤', value: absent, color: COLORS_OBJ.absent },
      { name: '正常', value: actually, color: COLORS_OBJ.normal },
    ]
  }
}

const fetchData = (getToday = true) => {

  getAttendanceByToday().then(res => {
    state.attendanceByToday = calcTotal(res?.data);
  })

  getHolidayByToday().then(res => {
    const {
      HolidayTotal: holidayTotal,
      HolidayPrivateAffair: holidayPrivateAffair,
      HolidaySick: holidaySick,
      HolidayOther: holidayOther
    } = res?.data
    state.holidayByToday = [
      { name: '全部', num: holidayTotal, numberColor: COLORS_OBJ.holiday },
      { name: '事假', num: holidayPrivateAffair, numberColor: COLORS_OBJ.late },
      { name: '病假', num: holidaySick, numberColor: COLORS_OBJ.absent },
      { name: '其他', num: holidayOther, numberColor: COLORS_OBJ.normal }
    ]
  })

  // 维度为日时不刷新
  if(!getToday) {
    getAttendanceByRecent7Days().then(res => {
      const { Recent7Days: xAxisData, Data: data } = res?.data;
      state.attendanceRateByRecent7Days.xAxisData = xAxisData;
      state.attendanceRateByRecent7Days.data = data;
    })

    getHolidayByRecent7Days().then(res => {
      const { Recent7Days: xAxisData, Data: data } = res?.data;
      state.holidayByRecent7Days.xAxisData = xAxisData;
      state.holidayByRecent7Days.data = data;
    })

    getAllDistricts().then(res => {
      state.tabs = res.data;
      state.activeTab = state.tabs[0].id;
    });
  }
}
fetchData(false);

const handleTabRendered = () => {
  getSchoolsByDistrictId(state.activeTab).then(res => {
    const { data } = res;
    state.tableData[state.activeTab] = data;
  }).then(() => {
    setTimeout(() => {
      if (state.activeTab !== state.tabs[0].id) {
        scrollToBottom()
      }
    }, 200)
  });
};


const handleClickCell = (row) => {
  const { SchoolName: schoolName, SchoolCode: schoolId } = row;
  router.push({
    name: 'school',
    params: { schoolId },
    query: { title: schoolName }
  })
}
const handleConfirmRange = (value) => {
  // TODO: api
  fetchData()
}
const handleConfirmDate = (value) => {
  // TODO: api
  fetchData()
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
