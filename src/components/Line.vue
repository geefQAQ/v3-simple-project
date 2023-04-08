<template>
  <GroupHeader :title="props.title" />
  <div ref="wrapperEle">
    <div ref="lineEle" :style="{width: `${state.chartWidth}px`, height: `${state.chartHeight}px`}"></div>
  </div>
  <van-divider
    dashed
    :style="{ borderColor: '#5470c6', marginBottom: 0 }"
  ></van-divider>
</template>

<script setup>
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { onMounted, onBeforeUnmount, reactive, shallowRef,computed, watch, ref, toRaw, nextTick } from 'vue';
import GroupHeader from '@/components/GroupHeader.vue';
import { SCREEN_WIDTH } from '@/utils/constants';

echarts.use([
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

const lineEle = ref();
const wrapperEle = ref();
// FIXED: vue3代理产生的问题 Cannot read properties of undefined (reading 'type')
const chartIns = shallowRef();
const state = reactive({
  lineEle,
  wrapperEle,
  chartIns,
  chartWidth: SCREEN_WIDTH - 24,
  chartHeight: computed(() => state.chartWidth * 0.6)
})

const updateChartOption = () => {
  const { xAxisData, data } = toRaw(props.data);
  option.xAxis.data = xAxisData;
  option.series[0].data = data;
}

const initChart = () => {
  state.chartIns && state.chartIns.clear();
  nextTick(() => {
    state.chartWidth = state.wrapperEle.clientWidth;
    state.chartIns = state.chartIns || echarts.init(state.lineEle);
    updateChartOption();
    // 自适应宽高
    state.chartIns.resize();
    state.chartIns.setOption(option);
  })
}

watch(() => props.data, () => {
  initChart()
})

onMounted(() => {
  // TODO: 真机上滚动会触发resize事件
  // window.addEventListener('resize', initChart)
  initChart()
})

onBeforeUnmount(() => {
  state.chartIns.dispose();
  // window.removeEventListener('resize', initChart)
})


</script>