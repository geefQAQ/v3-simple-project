<template>
  <GroupHeader :title="props.title" />
  <div style="display: flex">
    <!-- :style="{width: `${barWidth}px`, height: `${barHeight}px`}" -->
    <div id="barId" ref="bar" style="height: 200px; width: 50%"></div>
    <div class="legend-wrapper">
      <div class="circle-wrapper" v-for="(legend, index) in props.data" :key="index">
        <div class="legend-circle" :style="{backgroundColor: legend.color}"></div>
        {{ `${legend.name} : ${legend.value}` }}
      </div>
    </div>
  </div>
  <van-divider
    dashed
    :style="{ borderColor: '#5470c6', marginBottom: 0 }"
  ></van-divider>
</template>

<script setup>
import * as echarts from 'echarts/core';
import { TitleComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { onMounted, onBeforeUnmount, nextTick, ref, watch, toRaw} from 'vue';
import GroupHeader from '@/components/GroupHeader.vue';

// TODO: 封装
echarts.use([
  TitleComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  data: {
    type: Array,
    default: () => []
  }
})

const option = {
  color: [],
  title:{
    text: `今日出勤率\n - `,
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
      data:[
        { name: '全部', value: 145 },
        { name: '请假', value: 123 },
        { name: '迟到', value: 120 },
        { name: '缺勤', value: 100 }
      ]
    }
  ]
};
let myChart = null;
let chartIns = null;
let barEle = null;
const bar = ref(null);

// watch(() => props.data, (val) => {
//   const value = toRaw(val);
//   const color = value.filter(item => item.name !== '全部').map(item => item.color);
//   const data = value.map(item => {
//     return {
//       name: item.name,
//       value: item.value
//     }
//   }).filter(item => item.name !== '全部');
//   option.series[0].data = data;
//   option.color = color;
//   option.title.text = `今日出勤率\n80%`;
//   chartIns && chartIns.clear();
//   chartIns.setOption(option);
// })


const barWidth = ref(100);
const barHeight = ref(190);

const changeOption = () => {
  const value = toRaw(props.data);
  const color = value.filter(item => item.name !== '全部').map(item => item.color);
  const data = value.map(item => {
    return {
      name: item.name,
      value: item.value
    }
  }).filter(item => item.name !== '全部');
  option.series[0].data = data;
  option.color = color;
  option.title.text = `今日出勤率\n80%`;
}

const initChart = () => {
  // chartIns && chartIns.dispose();
  barEle = document.getElementById('barId');
  // const exist  = echarts.getInstanceByDom(bar.value)
  // if(exist) {
  //   echarts.dispose(exist);
  // }
  // chartIns = chartIns || echarts.init(barEle);
  chartIns = chartIns || echarts.init(bar.value);

  console.log(`output->barEle`,barEle)
  console.log(`output->bar.value`,bar.value, barEle === bar.value)
  // chartIns = chartIns || echarts.init(barEle);
  chartIns.clear();
  changeOption();
  // chartIns.clear();
  chartIns.setOption(option);
}

watch(() => props.data, () => {
  console.log(`output->watch`)
  initChart()
})

onMounted(() => {
  // const chartIns = echarts.getInstanceByDom(barEle)
  console.log(`output->mounted`)
  nextTick(() => {
    initChart()
    // myChart = echarts.init(barEle);
    // myChart.setOption(option);
  })
})


</script>

<style lang="scss" scoped>
.legend-circle {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: lightcoral;
}

.circle-wrapper {
  padding-left: 20px;
  margin-left: 40px;
  position: relative;
}

.bar-wrapper {
  flex: 1;
  height: 200px;
  // width: 100%;
}

.legend-wrapper {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 40px 0;
}
</style>