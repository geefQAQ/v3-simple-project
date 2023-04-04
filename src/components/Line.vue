<template>
  <div id="line" style="width: 100%; height: 240px;"></div>
</template>

<script setup>
import * as echarts from 'echarts/core';
import { TitleComponent, GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { onMounted, onBeforeUnmount } from 'vue';

echarts.use([
  TitleComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
  LabelLayout
]);

let myChart = null;
const handleResize = () => {
  myChart && myChart.clear();
  option && myChart.setOption(option);
  myChart.resize();
}
onMounted(() => {
  const line = document.getElementById('line');
  myChart = echarts.init(line);
  handleResize();
  // TODO: 可以加debounce，手机端先不加
  window.addEventListener('resize', handleResize);
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
})

const option = {
  xAxis: {
    type: 'category',
    data: ['A', 'B', 'C']
  },
  yAxis: {
    type: 'value'
  },
  grid: {
    // x: '5%',
    // y: '5%',
    // width: '80%',
    // height: '80%',
    top:'5%',
    left:'10%',
    right:'2%',
    bottom:'10%',
  },
  series: [
    {
      data: [120, 200, 150],
      type: 'line'
    }
  ]
};
</script>