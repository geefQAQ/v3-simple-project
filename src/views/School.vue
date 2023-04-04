<template>
  <div>
    <van-nav-bar
      :title="state.title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <Search
      @confirm-date="handleConfirmDate"
      @confirm-range="handleConfirmRange"
    >
      <template v-slot:chart>
        <Bar :data="barData"/>
      </template>
    </Search>
    <!-- 表格 -->
    <GroupHeader>
      <van-button icon="replay" @click="handleRefreshTable">刷新数据</van-button>
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
import Bar from '@/components/Bar.vue';
import Search from '@/components/Search.vue';
import BasicTable from '@/components/BasicTable.vue';
import GroupHeader from '@/components/GroupHeader.vue';
import { getGradesBySchoolId } from '@/api';

const router = useRouter();
const route = useRoute();

const state = reactive({
  tableData: [],
  tableLoading: false,
  title: '默认标题'
})
const init = () => {
  state.tableLoading = true;
  const { schoolId } = route.params;
  state.title = route.query.title;
  getGradesBySchoolId(schoolId).then(res => {
    setTimeout(() => {
      state.tableData = res.data;
    }, 500)
  }).finally(() => {
    state.tableLoading = false;
  })
}
init()

const TABLE_COLUMNS = [
  { field: 'SchoolName', title: '学校名称'},
  { field: 'Total', title: '应到'},
  { field: 'Actually', title: '实到(正常/迟到)', width: '30%'},
  { field: 'Absent', title: '请假/缺勤'},
];


const barData = ref([])


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