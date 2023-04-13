<template>
  <!-- :loading="loading" -->
  <vxe-table
    size="mini"
    stripe
    align="center"
    :data="data"
    @cell-click="handleCellClick"
  >
    <vxe-column
      v-for="(col, index) in simpleColumns"
      :key="index"
      :field="col.field"
      :title="col.title"
      :width="col.width"
    />
    <vxe-column
      v-for="(col, index) in customColumns"
      :key="index"
      :title="col.title"
      :width="col.width"
    >
    <template v-if="col.field === 'IsCalled'" #default="{ row }">
      <van-icon
        size="16"
        :name="row.IsCalled ? 'success' : 'cross'"
        :color="row.IsCalled ? COLORS_OBJ.normal : COLORS_OBJ.absent"
      />
    </template>
    </vxe-column>
  </vxe-table>
</template>

<script setup>
import { computed } from 'vue';
import { COLORS_OBJ } from '@/utils/constants';
const props = defineProps({
  data: {
    type: Array,
    default: []
  },
  columns: {
    type: Array,
    default: [],
  },
  // loading: {
  //   type: Boolean,
  //   default: false
  // }
});
const simpleColumns = computed(() => {
  return props.columns.filter(i => !i.custom);
})
const customColumns = computed(() => {
  return props.columns.filter(i => i.custom);
})

const emit = defineEmits([
  'click-cell'
])

const handleCellClick = ({ row }) => {
  emit('click-cell', row);
}
</script>