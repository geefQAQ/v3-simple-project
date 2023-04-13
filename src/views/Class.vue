<template>
  <div>
    <van-nav-bar
      :title="state.title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      right-text="返回首页"
      safe-area-inset-top
    />
    <Card style="padding-bottom: 0">
      <Search
        @confirm-date="handleConfirmDate"
        @confirm-range="handleConfirmRange"
      />
    </Card>
    <Card style="padding-top: 0; padding-bottom: 0">
      <Collapse
        v-model="state.activeCollapse"
        :data="state.collapseData"
        :belong="state.belong"
      />
    </Card>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { reactive } from 'vue';
import { getStudentsByClassId } from '@/api';
import Search from '@/components/Search.vue';
import Card from '@/components/Card.vue';
import Collapse from '@/components/Collapse.vue'

const router = useRouter();
const route = useRoute();

const state = reactive({
  title: '',
  activeCollapse: ['normal', 'late', 'holiday', 'absent'],
  belong: '',
  collapseData: {
    normal: [],
    late: [],
    holiday: [],
    absent: [],
  }
})

state.title = route.query.title;

// const { classId } = route.params;
getStudentsByClassId(route?.params?.classId, {loading: true, delay: true}).then(res => {
  // state.allStudents = res.data;
  console.log(`output->res`,res)

  const { List: studentList, ClassName: className, GradeName: gradeName } = res.data;
  state.collapseData.normal = studentList.filter(i => i.IsNormal);
  state.collapseData.late = studentList.filter(i => i.IsLate);
  state.collapseData.holiday = studentList.filter(i => i.IsHoliday);
  state.collapseData.absent = studentList.filter(i => i.IsAbsent);
  state.belong = `${gradeName} ${className}`;
  console.log(`output->belong1`,state.belong)
})


const onClickLeft = () => {
  router.back();
}

const onClickRight = () => {
  router.replace({
    name: 'home'
  })
}


const handleConfirmDate = () => {

}
const handleConfirmRange= () => {
}

</script>

<style lang="scss" scoped>

</style>