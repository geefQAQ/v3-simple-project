<template>
  <van-collapse
    :modelValue="modelValue"
    @update:modelValue="handleChangeCollapse"
    :border="false"
  >
    <van-collapse-item
      class="collapse-wrapper"
      v-for="(value, key) in props.data"
      :title="`${STATUS_OBJ[key]} ${value.length} 人`"
      :name="key"
    >
      <template #icon>
        <div class="icon-wrapper" :style="{backgroundColor: COLORS_OBJ[key]}">
          <van-icon name="friends" color="#fff" class="collapse-icon" />
        </div>
      </template>
      <template #default>
        <van-row wrap justify="start" gutter="5">
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
              :color="COLORS_OBJ[key]"
              :text-color="COLORS_OBJ[key]"
              @click="handleShowStudent(student, key)"
              style="margin-bottom: 12px; width: 100%; text-align: center;"
              >{{ student.StudentName }}
            </van-tag>
          </van-col>
        </van-row>
      </template>
    </van-collapse-item>
  </van-collapse>
  <van-popup
    v-model:show="state.showPopup"
    :style="{ width: '80%' }"
    round
    teleport="body"
  >
    <van-cell :title="`${belong} ${state.currentStudent}`">
      <template #icon>
        <div class="icon-wrapper" :style="{backgroundColor: COLORS_OBJ[state.currentStatus]}">
          <van-icon name="friends" color="#fff" class="collapse-icon" />
        </div>
      </template>
    </van-cell>
  </van-popup>
</template>

<script setup>
import { COLORS_OBJ, STATUS_OBJ } from '@/utils/constants';
import { reactive } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  },
  modelValue: {
    type: Array,
    default: () => []
  },
  belong: {
    type: String,
    default: ''
  }
});

const emit = defineEmits([
  'update:modelValue'
]);

const state = reactive({
  showPopup: false,
  currentStatus: '',
  currentStudent: '',
})


const handleShowStudent = (student, status) => {
  state.showPopup = true;
  state.currentStatus = status;
  state.currentStudent = student.StudentName;
}
const handleChangeCollapse = (e) => {
  emit('update:modelValue', e);
}

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