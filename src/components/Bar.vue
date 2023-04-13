<template>
  <GroupHeader :title="title" />
  <div ref="wrapperEle" style="display: flex">
    <div ref="barEle" :style="{width: `${state.chartWidth}px`, height: `${state.chartHeight}px`}"></div>
    <div class="legend-wrapper">
      <div class="circle-wrapper" v-for="(legend, index) in data.data" :key="index">
        <div class="legend-circle" :style="{backgroundColor: legend.color}"></div>
        {{ `${legend.name} : ${legend.value}` }}
      </div>
    </div>
  </div>
  <van-divider
    v-if="showDivider"
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
import { onMounted, nextTick, ref, reactive, computed, watch, shallowRef, toRaw} from 'vue';
import GroupHeader from '@/components/GroupHeader.vue';
import { SCREEN_WIDTH } from '@/utils/constants';

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
    type: Object,
    default: () => {}
  },
  showDivider: {
    type: Boolean,
    default: false
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
      name: '今日出勤表',
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
      data:[]
    }
  ]
};
const barEle = ref();
const wrapperEle = ref();
const chartIns = shallowRef();
const state = reactive({
  barEle,
  wrapperEle,
  chartIns,
  chartWidth: (SCREEN_WIDTH - 24) / 2,
  chartHeight: computed(() => {
    return state.chartWidth * 1.2
  }),
})

const updateChartOption = () => {
  const { rate, data } = toRaw(props.data);
  const color = data.filter(item => item.name !== '全部').map(item => item.color);
  const displayData = data.map(item => {
    return {
      name: item.name,
      value: item.value
    }
  }).filter(item => item.name !== '全部');
  option.series[0].data = displayData;
  option.color = color;
  option.title.text = `今日出勤率\n${rate}`;
}

const initChart = () => {
  state.chartIns && state.chartIns.clear();
  nextTick(() => {
    const wrapperWidth = state.wrapperEle.clientWidth;
    state.chartWidth = wrapperWidth / 2;
    state.chartIns = state.chartIns || echarts.init(state.barEle);
    // 自适应宽高
    state.chartIns.resize();
    updateChartOption();
    state.chartIns.setOption(option);
  })
}

watch(() => props.data, () => {
  initChart()
})

onMounted(() => {
  initChart()
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
}

.circle-wrapper {
  padding-left: 20px;
  margin-left: 40px;
  position: relative;
}

.legend-wrapper {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 40px 0;
}
</style>