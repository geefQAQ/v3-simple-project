<template>
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
  <TableHeader>
    <van-button icon="replay" @click="handleRefreshTable">刷新数据</van-button>
  </TableHeader>
  <BasicTable
    :data="state.tableData"
    :columns="TABLE_COLUMNS"
    :loading="state.tableLoading"
    @click-cell="handleClickCell"
  />
</template>

<script setup>
  import { useRouter, useRoute } from 'vue-router';
import { ref, reactive } from 'vue';
import Bar from '@/components/Bar.vue';
import Search from '@/components/Search.vue';
import BasicTable from '@/components/BasicTable.vue';
import TableHeader from '@/components/TableHeader.vue';
import { getClassesByGradeId } from '@/api';

const router = useRouter();
const route = useRoute();

const state = reactive({
  tableData: [],
  tableLoading: false,
  title: '默认标题'
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

const TABLE_COLUMNS = [
  { field: 'ClassName', title: '班级名称'},
  { field: 'Total', title: '应到'},
  { field: 'Actually', title: '实到(正常/迟到)', width: '30%'},
  { field: 'Absent', title: '请假/缺勤'},
];


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