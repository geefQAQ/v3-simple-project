<template>
  <div>
    <van-nav-bar
      :title="state.title"
      left-arrow
      @click-left="onClickLeft"
      safe-area-inset-top
    />
    <Card>
      <Search
        @confirm-date="handleConfirmDate"
        @confirm-range="handleConfirmRange"
      />
      <Bar title="今日出勤统计" :data="state.attendanceByToday" show-divider />
      <Line title="近七天出勤率" :data="state.attendanceByRecent7Days" />
    </Card>

    <Card>
      <Overview title="今日请假统计" :data="state.holidayByToday" show-divider />
      <Line title="近七天请假统计" :data="state.holidayByRecent7Days" />
    </Card>
    <!-- 表格 -->
    <GroupHeader title="年级统计" style="padding: 0 10px">
      <van-button
        icon="replay"
        round size="mini"
        type="primary"
        @click="handleRefreshTable"
      >刷新</van-button>
    </GroupHeader>
    <BasicTable
      :data="state.tableData"
      :columns="GRADE_TABLE_COLUMNS"
      :loading="state.tableLoading"
      @click-cell="handleClickCell"
    />
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, reactive } from 'vue';
import {
  getGradesBySchoolId,
  getHolidayByToday,
  getAttendanceByToday,
  getAttendanceByRecent7Days,
  getHolidayByRecent7Days
} from '@/api';
import { GRADE_TABLE_COLUMNS, COLORS_OBJ } from '@/utils/constants'
import Card from '@/components/Card.vue';
import Bar from '@/components/Bar.vue';
import Line from '@/components/Line.vue';
import Overview from '@/components/Overview.vue';
import Search from '@/components/Search.vue';
import BasicTable from '@/components/BasicTable.vue';
import GroupHeader from '@/components/GroupHeader.vue';

const router = useRouter();
const route = useRoute();

const state = reactive({
  title: '',
  attendanceByToday: {
    rate: '-',
    data: []
  },
  attendanceByRecent7Days: {
    xAxisData: [],
    data: []
  },
  holidayByToday: [],
  holidayByRecent7Days: {
    xAxisData: [],
    data: []
  },
  tableData: [],
});

state.title = route?.query?.title;

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

const requestOption = {loading: true, delay: true}

getAttendanceByToday(requestOption).then(res => {
    state.attendanceByToday = calcTotal(res?.data);
  })

getHolidayByToday(requestOption).then(res => {
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

getAttendanceByRecent7Days(requestOption).then(res => {
  const { Recent7Days: xAxisData, Data: data } = res?.data;
  state.attendanceByRecent7Days = {
    xAxisData,
    data
  };
})

getHolidayByRecent7Days(requestOption).then(res => {
  const { Recent7Days: xAxisData, Data: data } = res?.data;
  state.holidayByRecent7Days = {
    xAxisData,
    data
  };
})

getGradesBySchoolId(requestOption).then(res => {
  console.log(`output->res`,res)
  const { List: list } = res?.data;
  state.tableData = list;
})

const onClickLeft = () => {
  router.back();
}
const handleClickCell = (row) => {
  const { GradeId: gradeId, GradeName: gradeName } = row;
  router.push({ name: 'grade', params: { gradeId }, query: { title: gradeName } })
}

const handleRefreshTable = () => {

}

const handleConfirmDate = () => {}
const handleConfirmRange = () => {}

</script>