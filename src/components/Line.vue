<template>
  <GroupHeader :title="title" />
  <div ref="wrapperEle">
    <div ref="lineEle" :style="{width: `${state.chartWidth}px`, height: `${state.chartHeight}px`}"></div>
  </div>
  <van-divider
    v-if="showDivider"
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
import { onMounted, reactive, shallowRef,computed, watch, ref, toRaw, nextTick } from 'vue';
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
  },
  showDivider: {
    type: Boolean,
    default: false
  }
});

const option = {
  xAxis: {
    type: 'category',
    axisTick: {
      show: false
    },
    data: []
  },
  yAxis: {
    type: 'value',
    show: true,
  },
  grid: {
    top:'15%',
    left:'8%',
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
  chartHeight: computed(() => state.chartWidth * 0.7)
})

const updateChartOption = () => {
  const { xAxisData, data, yAxisData } = toRaw(props.data);
  option.xAxis.data = xAxisData;
  const unit = yAxisData?.unit;
  if(unit) {
    option.yAxis.name = `单位(${unit})`;
    option.yAxis.nameTextStyle = {
      nameLocation: "start",
      padding: [4, 0, 4, 0]
    }
  }
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
}, { deep: true })

onMounted(() => {
  initChart()
})

</script>