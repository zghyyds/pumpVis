<template>
  <div ref="chart" class="echart" :style="{ width: width, height: height }"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as echarts from 'echarts'

// 定义组件 props 接收宽度、高度和图表的配置项
const props = defineProps({
  width: {
    type: String,
    default: '600px'
  },
  height: {
    type: String,
    default: '400px'
  },
  options: {
    type: Object,
    required: true
  }
})

const chart = ref(null)
let echartInstance = null

// 在组件挂载时初始化图表
onMounted(() => {
  echartInstance = echarts.init(chart.value)
  echartInstance.setOption(props.options)

  // 窗口大小变化时，自动调整图表
  window.addEventListener('resize', resizeChart)
})

onBeforeUnmount(() => {
  // 组件销毁前移除监听器
  window.removeEventListener('resize', resizeChart)
  if (echartInstance) {
    echartInstance.dispose()
  }
})

// 图表的响应式调整
function resizeChart() {
  if (echartInstance) {
    echartInstance.resize()
  }
}

// 监听 options 变化，重新渲染图表
watch(() => props.options, (newOptions) => {
  if (echartInstance) {
    echartInstance.setOption(newOptions,true)
  }
}, { deep: true })
</script>

<style scoped>
.echart {
  width: 100%;
  height: 100%;
}
</style>