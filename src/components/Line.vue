<template>
  <GroupHeader :title="props.title" />
  <div id="line" style="width: 100%; height: 240px;"></div>
  <van-divider
    dashed
    :style="{ borderColor: '#5470c6', marginBottom: 0 }"
  ></van-divider>
</template>

<script setup>
import * as echarts from 'echarts/core';
import { TitleComponent, GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { onMounted, onBeforeUnmount, watch, toRaw } from 'vue';
import GroupHeader from '@/components/GroupHeader.vue';

echarts.use([
  TitleComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
  LabelLayout
]);

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  data: {
    type: Object,
    default: () => {}
  }
})

let myChart = null;

watch(() => props.data, (newValue) => {
  const { xAxisData, data } = toRaw(newValue);
  option.xAxis.data = xAxisData;
  option.series[0].data = data;
  myChart && myChart.clear();
  myChart.setOption(option);
})

onMounted(() => {
  const lineEle = document.getElementById('line');
  console.log(`output->mounted`)
  myChart = echarts.init(lineEle);
  option && myChart.setOption(option);
})

onBeforeUnmount(() => {
  console.log(`output->beforeUnmount`)
  myChart.dispose();
})

const option = {
  xAxis: {
    type: 'category',
    axisTick: {
      show: false
    },
    data: []
  },
  yAxis: {
    type: 'value'
  },
  grid: {
    top:'5%',
    left:'10%',
    right:'2%',
    bottom:'10%',
  },
  series: [
    {
      type: 'line',
      smooth: true,
      emphasis: {
        scale: false
      },
      data: []
    }
  ]
};
</script>