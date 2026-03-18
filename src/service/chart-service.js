import * as echarts from 'echarts/core'
import { GridComponent, TooltipComponent, VisualMapComponent } from 'echarts/components'
import { HeatmapChart, LineChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([GridComponent, TooltipComponent, VisualMapComponent, LineChart, HeatmapChart, CanvasRenderer])

export function createADayMeteoChartOptions(meteoDataList) {
  return {
    xAxis: {
      type: 'category',
      data: Array.from({ length: 24 }, (_, index) => `${String(index).padStart(2, '0')}:00`),
    },
    yAxis: {
      type: 'value',
    },
    series: meteoDataList.map((data) => ({
      data: Array.isArray(data.data) ? data.data : [],
      type: 'line',
      smooth: true,
      symbol: 'none',
      name: data.name,
    })),
    grid: {
      left: '4%',
      right: '0%',
      top: '10%',
      bottom: '7%',
    },
    tooltip: {
      trigger: 'axis',
      extraCssText: 'border-radius: 15px; width: 120px; height: 80px; padding: 20px;',
      formatter(params) {
        const detail = params
          .map((item) => {
            return `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${item.color}"></span><span style="font-size:12px;">${item.seriesName}: ${item.value}</span>`
          })
          .join('<br>')

        return `<span style="font-size: 16px; font-weight: bolder;">${params[0]?.name ?? ''}</span><br/><span style="font-size: 5px; color: #b2b2b2">Detail</span><br/>${detail}`
      },
    },
  }
}

export function createCorrelationChartOptions(data, labels) {
  const seriesData = []

  for (let rowIndex = 0; rowIndex < data.length; rowIndex += 1) {
    for (let columnIndex = 0; columnIndex < data[rowIndex].length; columnIndex += 1) {
      seriesData.push({
        name: `${labels[rowIndex]} - ${labels[columnIndex]}`,
        value: [rowIndex, columnIndex, data[rowIndex][columnIndex]],
      })
    }
  }

  return {
    xAxis: {
      type: 'category',
      data: labels,
    },
    yAxis: {
      type: 'category',
      data: labels,
    },
    visualMap: {
      min: -1,
      max: 1,
      calculable: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
    },
    series: [
      {
        type: 'heatmap',
        data: seriesData,
        label: {
          show: true,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }
}

export { echarts }
