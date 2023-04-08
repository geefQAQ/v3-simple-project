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
  
    <Search
      @confirm-date="handleConfirmDate"
      @confirm-range="handleConfirmRange"
    >
      <template v-slot:chart>
        <Bar :data="barData"/>
      </template>
    </Search>
  
    <div class="card">
      <van-collapse v-model="activeNames">
        <van-collapse-item
          v-for="(value, key) in state.listType"
          :title="`${CLASS_OBJ[key].chnName} ${value.length} 人`"
          :name="key"
        >
          <template #icon>
            <div class="icon-wrapper" :class="CLASS_OBJ[key].className">
              <van-icon name="friends" color="#fff" class="collapse-icon"/>
            </div>
          </template>
          <template #default>
            <van-space wrap size="20">
              <!-- <van-button
                v-for="(student, index) in value"
                :key="index"
                round plain type="primary">
                {{ student.StudentName }}
              </van-button> -->
              <van-tag
                v-for="(student, index) in value"
                :key="index"
                type="primary"
                plain
                round
                size="large"
                @click="showPopup = true"
              >{{ student.StudentName }}</van-tag>
            </van-space>
          </template>
        </van-collapse-item>
      </van-collapse>
  
    </div>
    <van-popup
      v-model:show="showPopup"
      :style="{ height: '50%', width: '80%' }"
      round
    >
      'test'
    </van-popup>
  </div>

</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, reactive, computed } from 'vue';
import Bar from '@/components/Bar.vue';
import Search from '@/components/Search.vue';
import { getStudentsByClassId } from '@/api';

const router = useRouter();
const route = useRoute();

const studentList = ref([]);
// const CLASS_OBJ = [
//   {
//     className: '',
//     chnName: '',

//   }
// ]
const CLASS_OBJ = {
  'absentList': {
    className: 'is-absent',
    chnName: '缺勤'
  },
  'holidayList': {
    className: 'is-holiday',
    chnName: '请假'
  },
  'lateList': {
    className: 'is-late',
    chnName: '迟到'
  },
  'normalList': {
    className: 'is-normal',
    chnName: '正常'
  }
}
const state = reactive({
  allStudentList: [],
  listType: {
    absentList: [],
    holidayList: [],
    lateList: [],
    normalList: [],
  }
})

state.listType.absentList = computed(() => {
  return state.allStudentList.filter(i => i.IsAbsent === '1');
})
state.listType.holidayList = computed(() => {
  return state.allStudentList.filter(i => i.IsHoliday === '1');
})
state.listType.lateList = computed(() => {
  return state.allStudentList.filter(i => i.IsLate === '1');
})
state.listType.normalList = computed(() => {
  return state.allStudentList.filter(i => i.IsNormal === '1');
})
const init = () => {
  const { classId } = route.params;
  getStudentsByClassId(classId).then(res => {
    console.log(`output->res`,res)
    state.allStudentList = res.data;
    // setTimeout(() => {
    // }, 500)
  }).finally(() => {
    // state.tableLoading = false;
  })
};
init();

const { title } = route.query ?? '';
const activeNames = ref(['1']);
const show = ref(false);
// console.log(`output->route`,route.query)
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
const barData = ref([])

const showPopup = ref(false);
</script>

<style lang="scss" scoped>
.card {
  margin: 12px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 12px #ebedf0;
  overflow: hidden;

  &:deep(.van-tag--large) {
    padding:4px 16px;
    margin: 8px 8px;
  }
}

.icon-wrapper {
  height: 24px;
  width: 24px;
  border-radius: 50%;
  color: #fff;
  text-align: center;
  margin-right: 8px;
}

.is-absent {
  background: rgba(222, 110, 107);
}
.is-late {
  background: rgba(250, 221,116);
}
.is-holiday {
  background: rgba(91, 111, 192);
}
.is-normal {
  background: rgba(158, 202, 127);
}
.collapse-icon {
  font-size: 16px;
  line-height: 24px;
}
</style>