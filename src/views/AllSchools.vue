<template>
  <!-- 导航 -->
  <van-nav-bar
    title="全部学校"
  />

  <!-- 考勤概况 -->
  <Search
    @confirm-date="handleConfirmDate"
    @confirm-range="handleConfirmRange"
  >
    <template v-slot:chart>
      <Bar :data="barData"/>
    </template>
  </Search>

  <!-- 表格 -->
  <TableHeader>
    <van-button icon="replay" @click="handleTabRendered">刷新数据</van-button>
  </TableHeader>
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
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, reactive } from 'vue';
import { Toast } from 'vant';
import { getAllDistricts, getSchoolsByDistrictId } from '@/api';
import Bar from '@/components/Bar.vue';
import Search from '@/components/Search.vue';
import BasicTable from '@/components/BasicTable.vue';
import TableHeader from '@/components/TableHeader.vue';

const router = useRouter();

const TABLE_COLUMNS = [
  { field: 'SchoolName', title: '学校名称'},
  { field: 'Total', title: '应到'},
  { field: 'Actually', title: '实到(正常/迟到)', width: '30%'},
  { field: 'Absent', title: '请假/缺勤'},
]

const barData = ref([])

const state = reactive({
  activeTab: '0',
  tabs: [],
  tableData: {},
  tableLoading: {},
})


getAllDistricts().then(res => {
  state.tabs = res.data;
  state.activeTab = state.tabs[0].id;
});

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

// picker
// const now = new Date();
// const currentDate = ref(new Date());
// const displayDate = ref(dayjs(new Date()).format("YYYY-MM-DD"));
// const minDate = new Date(2020, 0, 1);
// const showDatePicker = ref(false);
// const showPicker = ref(false);
// const rangeColumns = [
//   '上午上学',
//   '上午放学',
//   '下午上学',
//   '下午放学',
//   '晚修上学',
//   '晚修放学',
// ];
// const currentRange = ref(rangeColumns[0]);
const handleConfirmRange = (value) => {
  // TODO: api
}
const handleConfirmDate = (value) => {
  // TODO: api
}

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
</style>
