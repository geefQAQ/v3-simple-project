<template>
  <div id="chart" style="width: 90vw;height: 300px;"></div>
</template>

<script setup>
import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent, TitleComponent, GraphicComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { onMounted } from 'vue';

echarts.use([
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  GraphicComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);
onMounted(() => {
  const myChart = echarts.init(document.getElementById('chart'));
  option && myChart.setOption(option);
})
const data = [
  { icon: 'circle', value: 1048, name: '请假' },
  { icon: 'circle', value: 735, name: '缺勤' },
  { icon: 'circle', value: 580, name: '迟到' },
  { icon: 'circle', value: 484, name: '正常' },
];
let option = {
  title:{
    text:"80%",
    left:"30%",
    top:"50%",
    textStyle:{
      color:"#27D9C8",
      fontSize:16,
      align:"center"
    }
  },
  legend: {
    top: '30%',
    orient: 'vertical',
    right: 'left',
    selectedMode: false,
    data: data,
    formatter:function(name){
      const idx = data.findIndex(item => item.name === name);
      const value = data[idx]?.value;
      return `${name}: ${value}`;
    },
    textStyle:{
      fontSize: 14,
    }
  },
  graphic:{
    type:"text",
    left:"25%",
    top:"45%",
    style:{
      text:"运动达标率",
      textAlign:"center",
      fill:"#333",
      fontSize:14,
      fontWeight:700
    }
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      center: ['35%', '50%'],
      radius: ['40%', '70%'],
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