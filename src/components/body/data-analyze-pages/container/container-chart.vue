<template>
  <div ref="chartRef" class="correlation-chart"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { createCorrelationChartOptions, echarts } from '@/service/chart-service'

const props = defineProps({
  elements: {
    type: Array,
    default: () => [],
  },
  correlationList: {
    type: Array,
    default: () => [],
  },
})

const chartRef = ref(null)
let chartInstance = null

function resizeChart() {
  chartInstance?.resize()
}

function renderChart() {
  if (!chartInstance || props.elements.length === 0 || props.correlationList.length === 0) {
    return
  }

  chartInstance.setOption(createCorrelationChartOptions(props.correlationList, props.elements), true)
}

onMounted(() => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    window.addEventListener('resize', resizeChart)
    renderChart()
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeChart)
  chartInstance?.dispose()
  chartInstance = null
})

watch(
  () => [props.elements, props.correlationList],
  renderChart,
  {
    deep: true,
  },
)
</script>

<style scoped>
.correlation-chart {
  width: 100%;
  height: 100vh;
}
</style>
