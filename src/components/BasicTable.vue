<template>
  <vxe-table
    size="small"
    stripe
    :loading="props.loading"
    align="center"
    :data="props.data"
    @cell-click="handleCellClick"
  >
    <vxe-column
      v-for="(col, index) in props.columns"
      :key="index"
      :field="col.field"
      :title="col.title"
      :width="col.width"
    />
  </vxe-table>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  data: {
    type: Array,
    default: []
  },
  columns: {
    type: Array,
    default: [],
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits([
  'click-cell'
])

const handleCellClick = ({ row }) => {
  emit('click-cell', row);
}
</script>