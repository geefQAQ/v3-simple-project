<template>
  <van-collapse
    :modelValue="modelValue"
    @update:modelValue="handleChangeCollapse"
    :border="false"
  >
    <van-collapse-item
      class="collapse-wrapper"
      v-for="(value, key) in props.data"
      :title="`${TITLE_MAP[key]} ${value.length} 人`"
      :name="key"
    >
      <template #icon>
        <div class="icon-wrapper" :style="{backgroundColor: COLORS[key]}">
          <van-icon name="friends" color="#fff" class="collapse-icon" />
        </div>
      </template>
      <template #default>
        <van-row wrap justify="start" gutter="5">
          <!--  -->
          <van-col
            v-for="(student, index) in value"
            span="6"
            :key="index"
          >
            <van-tag
              type="primary"
              plain
              round
              size="medium"
              :color="COLORS[key]"
              :text-color="COLORS[key]"
              @click="showPopup = true"
              style="margin-bottom: 12px; width: 100%; text-align: center;"
              >{{ student.StudentName }}
            </van-tag>
          </van-col>
        </van-row>
        <!-- <van-space wrap :size="16" style="margin-bottom: 0;">
          <van-tag
            v-for="(student, index) in value"
            :key="index"
            type="primary"
            plain
            round
            size="large"
            :color="COLORS[key]"
            :text-color="COLORS[key]"
            @click="showPopup = true"
            >{{ student.StudentName }}</van-tag>
        </van-space> -->
      </template>
    </van-collapse-item>
  </van-collapse>
  <van-popup
    v-model:show="showPopup"
    :style="{ height: '50%', width: '80%' }"
    round
    teleport="body"
  >
    'test'
  </van-popup>
</template>

<script setup>
import { COLORS } from '@/utils/constants';
import { ref } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  },
  modelValue: {
    type: Array,
    default: () => ['holiday']
  }
});

const emit = defineEmits([
  'update:modelValue'
]);

const showPopup = ref(false);

const handleChangeCollapse = (e) => {
  emit('update:modelValue', e);
}
const data = {
  holiday: [{
    name: '小明'
  }],
  late: [{
    name: '小红'
  }],
  absent: [{
    name: '小戴'
  }],
  normal: [{
    name: '小芳'
  }],
}
const TITLE_MAP = {
  holiday: '请假',
  late: '迟到',
  absent: '缺勤',
  normal: '正常',
}

// const activeNames = props.modelValue;
// const activeNames = ref(['holiday'])
// 1
// {
//   holiday: [],
//   late: [],
//   normal: [],
//   absent: [],
// }
// 2
// [{
//   name: 'holiday',
//   color: '',
//   value: []
// }, {
//   name: 'late',
//   value: []
// }]
// data = [{
// 
// }]
</script>

<style lang="scss" scoped>
.icon-wrapper {
  height: 24px;
  width: 24px;
  border-radius: 50%;
  color: #fff;
  text-align: center;
  margin-right: 8px;
}

.collapse-icon {
  font-size: 16px;
  line-height: 24px;
}

.collapse-wrapper {
  :deep(.van-collapse-item__content) {
    padding-bottom: 0;
  }
  :deep(.van-tag) {
    display: block;
  }
}
</style>