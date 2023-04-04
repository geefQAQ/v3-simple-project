<template>
  <div>
    <!-- 导航 -->
    <van-nav-bar title="全部学校" />
    <!-- 考勤概况 -->
    <Card>
      <Search
        @confirm-date="handleConfirmDate"
        @confirm-range="handleConfirmRange"
      />
      <GroupHeader title="今日出勤情况" />
      <Bar :data="barData"/>
      <van-divider
        dashed
        :style="{ borderColor: '#5470c6', marginBottom: 0 }"
      ></van-divider>
      <GroupHeader title="本周出勤情况" />
      <Line />
      <van-divider
        dashed
        :style="{ borderColor: '#5470c6', marginBottom: 0 }"
      >
      </van-divider>
      <GroupHeader title="统计" />
      <van-row justify="space-between" style="padding-bottom: 20px;">
        <van-col v-for="item in checkupData" span="5" style="text-align: center;">
          <div :style="{color: item.numberColor}" class="checkup-num">{{ item.num }}</div>
          <div>{{ item.name }}</div>
        </van-col>
      </van-row>
    </Card>

    <!-- 表格 -->
    <GroupHeader style="padding: 0 10px">
      <van-button icon="replay" round size="mini" type="primary" @click="handleTabRendered">刷新表格</van-button>
    </GroupHeader>
    <van-tabs
      v-model:active="state.activeTab"
      animated
      lazy-render
      @rendered="handleTabRendered"
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
import { ref, reactive } from 'vue';
import { Toast } from 'vant';
import {
  getAllDistricts,
  getSchoolsByDistrictId,
  getAttendanceByToday,
} from '@/api';
import Bar from '@/components/Bar.vue';
import Line from '@/components/Line.vue';
import Search from '@/components/Search.vue';
import BasicTable from '@/components/BasicTable.vue';
import GroupHeader from '@/components/GroupHeader.vue';
import Card from '@/components/Card.vue';

const router = useRouter();

const TABLE_COLUMNS = [
  { field: 'SchoolName', title: '学校名称'},
  { field: 'Total', title: '应到'},
  { field: 'Actually', title: '实到(正常/迟到)', width: '30%'},
  { field: 'Absent', title: '请假/缺勤'},
]

const barData = [
  { icon: 'circle', value: 1048, name: '请假' },
  { icon: 'circle', value: 735, name: '缺勤' },
  { icon: 'circle', value: 580, name: '迟到' },
  { icon: 'circle', value: 484, name: '正常' },
]


const state = reactive({
  activeTab: '0',
  tabs: [],
  tableData: {},
  tableLoading: {},
  barData: [],
  legendData: [],
})

const calcTotal = (res) => {
  let barData = [];
  let legendData = [];
  let holidayTotal = 0;
  let lateTotal = 0;
  let absentTotal = 0;
  let accessTotal = 0;
  let total = 0;
  res?.data.forEach(item => {
    console.log(`output->item`,item)
    holidayTotal += item['Holiday'];
    lateTotal += item['Late'];
    accessTotal += item['Absent'];
    total += item['Total']
  })

  barData = [
    {name: '请假', value: holidayTotal},
    {name: '迟到', value: lateTotal},
    {name: '缺勤', value: absentTotal},
    {name: '正常', value: accessTotal},
  ]

  const totalObj = {
    name: '全部', value: total
  }
  legendData = [
    totalObj, ...barData
  ]

  return {
    barData,
    legendData,
  }
}

getAllDistricts().then(res => {
  state.tabs = res.data;
  state.activeTab = state.tabs[0].id;
});

getAttendanceByToday().then(res => {
  // [
  //   {holiday: 1, late: 2, access: 15},
  //   {holiday: 2, late: 3, access: 20}
  // ]
  // =>
  // [
  //   { name: '请假', value: 3 },
  //   { name: '迟到', value: 5 },
  //   { name: '实到', value: 35 },
  // ]
  // state.barData = calcTotal(res)
})

const handleTabRendered = () => {
  state.tableLoading[state.activeTab] = true;
  getSchoolsByDistrictId(state.activeTab).then(res => {
    setTimeout(() => {
      const { data } = res;
      state.tableData[state.activeTab] = data;
      state.tableLoading[state.activeTab] = false
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

// overview
const checkupData = ref([
  { name: '正常', num: 1174, numberColor: '#91cc75'},
  { name: '发烧', num: 1, numberColor: '#ee6666'},
  { name: '其他症状', num: 1, numberColor: '#fac858'},
  { name: '未检测', num: 1, numberColor: '#5470c6'}
])

// table

const doSearch = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
}
</script>

<style lang="scss" scoped>
// .table-wrapper {
//   display: flex;
//   flex-direction: column;
// }
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

.checkup-num {
  font-size: var(--van-font-size-lg);
  font-weight: var(--van-font-weight-bold);
}
</style>
