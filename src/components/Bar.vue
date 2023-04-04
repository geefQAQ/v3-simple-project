<template>
  <div style="display: flex;">
    <div id="bar" class="bar-wrapper"></div>
    <div class="legend-wrapper">
      <div v-for="(legend, index) in dataWidthTotal" :key="index">
        <div class="legend-circle">{{ `${legend.name} : ${legend.value}` }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent, TitleComponent, GraphicComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { onMounted, onBeforeUnmount, ref } from 'vue';

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

// TODO: 封装
echarts.use([
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  GraphicComponent,
  PieChart,
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
  const bar = document.getElementById('bar');
  myChart = echarts.init(bar);
  handleResize();
  // TODO: 可以加debounce，手机端先不加
  window.addEventListener('resize', handleResize);
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
})
const data = ref(props.data);
const dataWidthTotal = [{value: 10000, name: '总人数'}, ...data.value]
let option = {
  title:{
    text:"今日出勤率\n80%",
    x: 'center',
    y: 'center',
    textStyle:{
      fontSize: 16,
      align: 'center'
    }
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['70%', '95%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: '请假' },
        { value: 735, name: '缺勤' },
        { value: 580, name: '迟到' },
        { value: 484, name: '正常' },
      ]
    }
  ]
};
</script>

<style lang="scss" scoped>
.legend-circle {
  position: relative;
  padding-left: 20px;
  margin-left: 20px;
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: lightcoral;
  }
}

.bar-wrapper {
  flex: 1;
  height: 200px;
}

.legend-wrapper {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 40px 0;
}
</style>