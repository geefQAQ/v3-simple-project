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
        @click="handleRefreshTable"
      >刷新数据</van-button>
    </GroupHeader>
    <BasicTable
      :data="state.tableData"
      :columns="TABLE_COLUMNS"
      :loading="state.tableLoading"
      @click-cell="handleClickCell"
    />
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, reactive } from 'vue';
import { TABLE_COLUMNS, COLORS } from '@/utils/constants';
import Card from '@/components/Card.vue';
import Bar from '@/components/Bar.vue';
import Line from '@/components/Line.vue';
import Overview from '@/components/Overview.vue';
import Search from '@/components/Search.vue';
import BasicTable from '@/components/BasicTable.vue';
import GroupHeader from '@/components/GroupHeader.vue';
import { getClassesByGradeId, getAttendanceByToday } from '@/api';

const router = useRouter();
const route = useRoute();

const state = reactive({
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
  ],
  tableData: [],
  title: ''
})
const init = () => {
  state.tableLoading = true;
  const { gradeId } = route.params;
  state.title = route.query.title;
  getClassesByGradeId(gradeId).then(res => {
    setTimeout(() => {
      state.tableData = res.data;
    }, 500)
  }).finally(() => {
    state.tableLoading = false;
  })
}
init()

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

getAttendanceByToday().then(res => {
  setTimeout(() => {
    state.barData = calcTotal(res);
    state.lineData = {
      xAxisData: ['04/01', '04/02', '04/03'],
      data: [150, 200, 300]
    };
  }, 500)
})


const barData = ref([])


const onClickLeft = () => {
  router.back();
}
const handleClickCell = (row) => {
  console.log(`output->row`,row)
  const { ClassId: classId, ClassName: className } = row;
  router.push({ name: 'class', params: { classId }, query: { title: className } })
}

const handleRefreshTable = () => {

}

const handleConfirmDate = () => {}
const handleConfirmRange = () => {}
</script>