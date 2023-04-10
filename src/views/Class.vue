<template>
  <div>
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      right-text="返回首页"
      safe-area-inset-top
    />
    <Card>
      <Search
        @confirm-date="handleConfirmDate"
        @confirm-range="handleConfirmRange"
      />
    </Card>
    <Card style="padding-top: 0;">
      <Collapse
        v-model="activeCollapse"
        :data="state.collapseData"
      />
    </Card>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, reactive, computed } from 'vue';
import { getStudentsByClassId } from '@/api';
import Search from '@/components/Search.vue';
import Card from '@/components/Card.vue';
import Collapse from '@/components/Collapse.vue'

const router = useRouter();
const route = useRoute();

const activeCollapse = ref(['holiday']);


// const collapseData = []
// const allStudents = ref([]);
const state = reactive({
  allStudents: [],
  collapseData: {
    absent: [],
    holiday: [],
    late: [],
    normal: [],
  }
})

// 一个for循环 + watch 是不是效率更高？
state.collapseData.absent = computed(() => {
  return state.allStudents.filter(i => i.IsAbsent === '1');
})
state.collapseData.holiday = computed(() => {
  return state.allStudents.filter(i => i.IsHoliday === '1');
})
state.collapseData.late = computed(() => {
  return state.allStudents.filter(i => i.IsLate === '1');
})
state.collapseData.normal = computed(() => {
  return state.allStudents.filter(i => i.IsNormal === '1');
})

// const { classId } = route.params;
getStudentsByClassId(route?.params?.classId, {loading: true, delay: true}).then(res => {
  state.allStudents = res.data;
})

const { title } = route.query ?? '';
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